# IAM with SvelteKit and Auth0

TODOS:
* When a user logs in, Auth0 returns three items (which can be used in your application to set up and manage authentication):
    * access_token: to learn more, see the Access Token documentation
    * id_token: to learn more, see the ID Token documentation
    * expires_in: the number of seconds before the Access Token expires
* Figure out what to do with the `error` store.

* I am following this video tutorial: https://www.learnwithjason.dev/add-a-login-to-your-svelte-site-with-auth0. (That page has the full transcript at the bottom.) That video tutorial is a little old, but it implements Auth0 into a SvelteKit app. I am borrowing ideas from it and trying to update it. 
* The video tutorial above follows this article tutorial, which is for a plain Svelte.js app: https://auth0.com/blog/authenticating-svelte-apps/. 
* I might also using some concepts from this article: https://blog.logrocket.com/authentication-svelte-using-cookies/.

IMPORTANT NOTE: Refer to this page ([Auth0 Single Page App SDK](https://auth0.com/docs/libraries/auth0-single-page-app-sdk)) for details and ideas on how to implement authentication for things like calling an API or using the `loginWithPopup` vs `loginWithRedirect` API.

---

Identity &amp; Access Management (IAM) can be terrifying to implement in a web app. It doesn't matter how much I read about IAM, I feel like I am always missing something and I wonder if my apps have been properly secured. The basic concepts of IAM are not too difficult to wrap your mind around and implement, but when you start to consider the full suite of features that are necessary to get IAM working properly (e.g. confirmation emails, forgot password flows, multi-factor authentication), then IAM can become very daunting very quickly. Well, rather than agonize over the security of my web apps, I prefer to let a trusted company, with much more experience than me when it comes to web security, handle all of that for me.

I like services like [Auth0](https://auth0.com/) because they provide a generous free version of their product so you can try it out without paying anything. Also, if you are creating a commercial app you can grow a little and generate some revenue before you have to pay for their service.

This is how to implement IAM in a SvelteKit app with Auth0:

## Create an Auth0 application

Create an Auth0 account (or login to your existing account). When you create a new account you will be guided through the creation of a new tenant. In Auth0 a tenant is a grouping of applications. An "application" is a single auth service that you configure in Auth0 and that can be used in a web or mobile app.

Once you have a tenant created, do the following in the Auth0 Dashboard:

1. Create a new application. On the "Getting Started" page click "Create Application".
2. Give your application a name.
3. Choose an application type: Single-Page App
4. Select the technology: JavaScript
5. In the "Application Settings," set the "Allowed Callback URLs", "Allowed Web Origins", and "Allowed Logout URLs" to `http://localhost:5173`` (or whatever URL your app is running on). Make sure to save your changes at the bottom of the page.

<aside>

  ### Aside: What are these URLs used for?

  As a quick reference, this is what each of those sections is used for:

  **Allowed Callback URLs**
  
  A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. The callback URL for your app must be added to the Allowed Callback URLs field in your Application Settings. If this field is not set, users will be unable to log in to the application and will get an error. (See [Configure Callback URLs](https://auth0.com/docs/quickstart/spa/vanillajs/01-login#configure-callback-urls))

  **Allowed Logout URLs**

  A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the returnTo query parameter. The logout URL for your app must be added to the Allowed Logout URLs field in your Application Settings. If this field is not set, users will be unable to log out from the application and will get an error. (See [Configure Logout URLs](https://auth0.com/docs/quickstart/spa/vanillajs/01-login#configure-logout-urls))

  **Allowed Web Origins**

  You need to add the URL for your app to the Allowed Web Origins field in your Application Settings. If you don't register your application URL here, the application will be unable to silently refresh the authentication tokens and your users will be logged out the next time they visit the application, or refresh the page. (See [Configure Allowed Web Origins](https://auth0.com/docs/quickstart/spa/vanillajs/01-login#configure-allowed-web-origins))

  **Important Note**
  
  You will need to add both your local development URLs and any live URLs for production or staging environments and the URLs need to be comma separated. For example, the `Allowed Callback URLs` section would look like this:

  ```
  http://localhost:5173,
  https://my-app.com
  ```
</aside>

## Setup authentication in your app

Now back in text editor, do the following:

### Step 1: Install the Auth0 SDK

```js
npm install @auth0/auth0-spa-js
```

### Step 2: Set environment variables

Create a `.env` file in your project root directory and enter these environment variables:

```sh
# /.env

# Auth0
PUBLIC_AUTH0_DOMAIN = "<my-tenant>.us.auth0.com"
PUBLIC_AUTH0_CLIENT_ID = "longrandomstring"
```

You can get the values for those env vars in the Auth0 Dashboard. Go to your application and click the `Settings` tab.

* `PUBLIC_AUTH0_DOMAIN`: Copy and paste the "Domain" URL.
* `PUBLIC_AUTH0_CLIENT_ID`: Copy and paste the "Client ID" string.

### Step 3: Create an auth service

Since there is not an Auth0 SDK for Svelte or SvelteKit, you can create functions (`initAuth0Client()`, `login()`, `logout()`) that will expose the data that we need for an auth service.

Create a `/src/stores/auth.ts` file and enter this code:

```ts
import { writable } from "svelte/store";
import { createAuth0Client } from "@auth0/auth0-spa-js";
import { PUBLIC_AUTH0_DOMAIN, PUBLIC_AUTH0_CLIENT_ID } from "$env/static/public";

export const isAuthenticated = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const error = writable();
export const auth0Client = writable();

// Initialize the Auth0 client.
export async function initAuth0Client() {
  try {
    auth0Client.set(await createAuth0Client({
      domain: PUBLIC_AUTH0_DOMAIN,
      clientId: PUBLIC_AUTH0_CLIENT_ID,
    }));
  }
  catch(err) {
    console.error("initAuth0Client:", err);
  }
}

export async function login(auth0) {
  popupOpen.set(true);
  try {
    await auth0.loginWithPopup();

    // Set the `user` store to equal the user profile that
    // is returned from the Auth0 `getUser()` function.
    user.set(await auth0.getUser());
    isAuthenticated.set(true);
  } 
  catch (err) {
    console.error("login", err);
  } 
  finally {
    popupOpen.set(false);
  }
}

export function logout(auth0) {
  try {
    auth0.logout();
  }
  catch(err) {
    console.error("logout:", err);
  }
}
```

This is an explanation of the stores:

* `isAuthenticated`: Defines the authenticated state of the user, `true` when a user is authenticated, `false` by default.
* `user`: Holds the details of an authenticated user returned by Auth0 after successful authentication.
* `popupOpen`: The sign-in process will be initiated using Auth0's popup authentication modal. This is to monitor the visible state of the popup modal.
* `error`: Holds the error information if the authentication process fails.
* `auth0Client`: Holds the Auth0 client instance.


Tips for the env vars:

* The `PUBLIC_AUTH0_DOMAIN` and `PUBLIC_AUTH0_CLIENT_ID` are intended to be exposed in client-side code, so they are not private or sensitive pieces of data. That means that you can check them into GitHub. 
* Make sure that you also create environment variables for your production environment (i.e. in your web host platform) otherwise you will get errors. If you do not want to deal with env vars, then you can copy and paste the `<my-tenant>.us.auth0.com` and `longrandomstring` values directly into the `createAuth0Client()` function.

### Step 4: Initial your auth service

Open your `+layout.svelte` file, import the auth service code, initialize the Auth0 client, and setup the `login` and `logout` services:

```html
<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { isAuthenticated, user, initAuth0Client, auth0Client, logout } from "/src/stores/auth";

  $: currentPath = $page.url.pathname;
  
  // If the user's credentials have not already been retrieved, then retrieve them here. This would come into play if the user refreshes the browser or comes back to the app after navigating away from it.
  // This should only fetch the user's credentials when the app is first loaded in the browser as opposed to fetching the user's credentials at every navigation.
  onMount(async () => {
    try {
      // Initialize the Auth0 client.
      await initAuth0Client();
      // Set `isAuthenticated` to the value of `$auth0Client.isAuthenticated()`.
      isAuthenticated.set(await $auth0Client.isAuthenticated());
      // Set the `user` store to the authenticated user's object.
      user.set(await auth0Client.getUser());

      protectAuthRoutes($isAuthenticated, currentPath);
    }
    catch(err) {
      console.error("Auth0 Client Initialization", err);
    }
  });

  // This function will get called when the app first mounts. If a user enters a URL in the address bar and presses enter, then the app will get remounted and this function will get called.
  // NOTE: beforeNavigate() and afterNavigate() run before components are mounted, so $isAuthenticated is null when those functions run and the if statements get skipped over. So I am using this function to redirect users when necessary.
  async function protectAuthRoutes(isAuthenticated, currentPath) {
    // If the user is not authenticated and if the user tries to access a page other than the homepage, which is also the login page, (i.e. if the user tries to access a page that requires authentication), then set the toast message (for user feedback) and redirect them to the homepage. (See Fanny Pack UI for the Toast component.)
    if (!isAuthenticated && currentPath !== "/") {
      ToastContent.set({ type: "error", msg: "Your session has expired. Please log in." });
      await goto("/");
    }
    // If the user is authenticated and they try to visit the homepage/login page, then redirect them to the `/landing-page` route.
    if (isAuthenticated && currentPath === "/") {
      await goto("/landing-page");
    }
  }
</script>

<header>
  {#if !$isAuthenticated}
    <button on:click={() => login($auth0Client)}>Login</button>
  {:else}
    <button on:click={() => logout($auth0Client)}>Login</button>
  {/if}
</header>

<slot />
```

NOTES:
* When the page loads, the `onMount` Svelte lifecycle method is called with a callback that creates a new Auth0 client and sets the authentication state. This will ensure that all the auth stores will be set when the app first loads.
* You can import the `login` and `logout` functions and the `auth0Client` store into any component(s) you want and call the `login` and `logout` functions as I have shown in the example above.


## Use the authentication service in other components

If you need to check the status of user authentication or get the user's information inside a component, then simply import those stores into the necessary components and subscribe to them in your template.

```
<script lang="ts">
	import { isAuthenticated, user } from "/src/stores/auth";
</script>

{#if $isAuthenticated}
  <div>Logged In User: {JSON.stringify($user)}</div>
{/if}
```

## If you want to use the `loginWithRedirect` API

The examples above use the `loginWithPopup` API. If you want to use the `loginWithRedirect` API, then do the following:

### Step 1: Update login config

Update the login config in your `auth.ts` file by replacing this:

```js
export async function login(auth0) {
  popupOpen.set(true);
  try {
    await auth0.loginWithPopup();

    user.set(await auth0.getUser());
    isAuthenticated.set(true);
  } 
  catch (err) {
    console.error("login", err);
  } 
  finally {
    popupOpen.set(false);
  }
}
```

with this:

```js
export async function login(auth0) {
  try {
    await auth0.loginWithRedirect({
      authorizationParams: {
        // Redirect users to the homepage when they login.
        redirect_uri: window.location.origin
      }
    });

    user.set(await auth0.getUser());
    isAuthenticated.set(true);
  } 
  catch (err) {
    console.error("login", err);
  }
}
```

This code will redirect the user back to the homepage. You can obtain the homepage location with the `window.location.origin` property. If you want to redirect users to a page other than the homepage, then you will need to include that path after the `window.location.origin` property, like this:

```js
await auth0.loginWithRedirect({
  authorizationParams: {
    redirect_uri: window.location.origin + "/landing-page"
  }
});
```

Make sure you include that `redirect_uri` in your `Allowed Callback URLs` in the Auth0 dashboard. For example your `Allowed Callback URLs` would look like this:

```
http://localhost:5173/landing-page,
https://my-app.com/landing-page
```

### Step 2: Update logout config

Update the logout flow in your `auth.ts` file by replacing this:

```js
export function logout(auth0) {
  try {
    auth0.logout();
  }
  catch(err) {
    console.error("logout:", err);
  }
}
```

with this:

```js
export function logout(auth0) {
  try {
    auth0.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }
  catch(err) {
    console.error("logout:", err);
  }
}
```

This code will redirect the user back to the homepage after they logout. The location of the homepage is obtained with the `window.location.origin` property.

Make sure to include your logout URLs in the `Allowed Logout URLs` section of your Auth0 dashboard. For example your `Allowed Logout URLs` would look like this:

```
http://localhost:5173,
https://my-app.com,
```

### Step 3: Update your auth service's initialization code

Open your `+layout.svelte` file and update your `onMount` hook to look like this:

```js
// If the user's credentials have not already been retrieved, then retrieve them here. This would come into play if the user refreshes the browser or comes back to the app after navigating away from it.
// This should only fetch the user's credentials when the app is first loaded in the browser as opposed to fetching the user's credentials at every navigation.
onMount(async () => {
  try {
    // Initialize the Auth0 client.
    await initAuth0Client();

    // When you call `loginWithRedirect()`, you will be taken to Auth0's Universal Login Page where the authentication process will be handled. You will then be redirected back to your app and the URL will including a `code` and `state` (or `error`) query parameter.
    // Check the URL for the `code` and `state` parameters.
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      // Calling `handleRedirectCallback()` will process the user's logged in state. Only after calling `handleRedirectCallback()` can you then call `isAuthenticated()` and `getUser()` and get the necessary data.
      await $auth0Client.handleRedirectCallback();
      
      // After the user is redirected back to your app and the user's logged in state has been processed with `handleRedirectCallback()`, use `replaceState()` to replace the current entry in the browser history with an entry for the "/login" route. This will also clear the query string in the URL so the code in this `if` block doesn't get executed again unnecessarily. If this code were to get executed again, after already processing the user's logged in state the first time, the `handleRedirectCallback()` method would cause an "Invalid state" error.
      window.history.replaceState({}, "", "/login");
    }

    // Set `isAuthenticated` to the value of `$auth0Client.isAuthenticated()`.
    isAuthenticated.set(await $auth0Client.isAuthenticated());
    // Set the `user` store to the authenticated user's object.
    user.set(await $auth0Client.getUser());

    protectAuthRoutes($isAuthenticated, currentPath);
  }
  catch(err) {
    console.error("Auth0 Client Initialization", err);
  }
});
```

NOTES:

* The configs for the `loginWithRedirect` API are taken from this tutorial: [Auth0 Quickstarts - Single-Page App - JavaScript: Login](https://auth0.com/docs/quickstart/spa/vanillajs/01-login).
* For more information about the `loginWithRedirect` configs, see [When following the SPA example using LoginWIthRedirect does not properly login the user while LoginWithPopup does](https://github.com/auth0/auth0-spa-js/issues/996).

Keep in mind that you should wrap all calls to the Auth0 SDK instance in a `try/catch` block. This is the advice from the [Auth0 Quickstarts - Single-Page App - JavaScript: Login](https://auth0.com/docs/quickstart/spa/vanillajs/01-login) article:

_Note that calls to the SDK instance can throw an exception if the authentication fails, if there is no user currently authenticated, or if the access token needs to be refreshed and that request fails. You will need to put a try/catch block around them to correctly handle any errors. These error checks are not shown on the article but they are available on the final sample app that you can download._

---

TODO: CONTINUE HERE:

## Configure Social Providers

Start here: https://auth0.com/docs/quickstart/spa/vanillajs/01-login#restoring-login-state-with-social-providers


## Making authenticated calls to your backend API

```js
// Get the access token from the Auth0 client
const token = await auth0Client.getTokenSilently();
```

See:
* [JavaScript: Calling an API](https://auth0.com/docs/quickstart/spa/vanillajs/02-calling-an-api)
* https://auth0.com/docs/libraries/auth0-single-page-app-sdk#call-an-api
* https://auth0.com/docs/glossary?term=access-token
* https://auth0.com/docs/glossary?term=refresh-token

Explain the purpose of refresh tokens and access tokens. Look at my notes in my "Identity & Access Management - How to implement auth and things to consider" doc.


## Additional Resources

* [Auth0 Quickstarts](https://auth0.com/docs/quickstarts)
* Auth0's YouTube channel has moved to the [Okta YouTube channel](https://www.youtube.com/oktadev)


## Sources

* [Add a Login to Your Svelte Site With Auth0](https://www.learnwithjason.dev/add-a-login-to-your-svelte-site-with-auth0)
* [Authenticating Svelte Applications](https://auth0.com/blog/authenticating-svelte-apps/)
* [Auth0 Quickstarts - Single-Page App - JavaScript: Login](https://auth0.com/docs/quickstart/spa/vanillajs/01-login)
* [Auth0 Quickstarts - Single-Page App - JavaScript: Calling an API](https://auth0.com/docs/quickstart/spa/vanillajs/02-calling-an-api)
* [Auth0 Identity Providers](https://auth0.com/docs/authenticate/identity-providers)
* [When following the SPA example using LoginWIthRedirect does not properly login the user while LoginWithPopup does](https://github.com/auth0/auth0-spa-js/issues/996)
