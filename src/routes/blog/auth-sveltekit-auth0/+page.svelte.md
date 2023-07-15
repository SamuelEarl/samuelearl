# Authentication for SvelteKit with Auth0

TODO: Update the code examples and content to reflect the fact that I created a `export const auth0Client = writable();` store instead of the `auth0Client` option that was used in the original tutorials.

Authentication (along with any security issue) in web development can be very terrifying to implement. It doesn't matter how much I read about authentication, I feel like I am always missing something and I wonder if my apps are secure enough. The basic concepts of authentication are not too difficult to wrap your mind around and implement, but when you start to consider the full suite of features that are necessary to get authentication working properly (e.g. confirmation emails, forgot password flows, multi-factor authentication), then authentication can become very daunting very quickly. Well, rather than agonize over the security of my web apps, I prefer to let a trusted company, with much more experience than me when it comes to web security, handle all of that for me.

I like services like Auth0 because they provide a generous free version of their product so you can try it out without paying anything. Also, if you are creating a commercial app you can grow a little and generate some revenue before you have to pay for their service.

* I am following this video tutorial: https://www.learnwithjason.dev/add-a-login-to-your-svelte-site-with-auth0. (That page has the full transcript at the bottom.) That video tutorial is a little old, but it implements Auth0 into a SvelteKit app. I am borrowing ideas from it and trying to update it. 
* The video tutorial above follows this article tutorial, which is for a plain Svelte.js app: https://auth0.com/blog/authenticating-svelte-apps/. 
* I might also using some concepts from this article: https://blog.logrocket.com/authentication-svelte-using-cookies/.

IMPORTANT NOTE: Refer to this page ([Auth0 Single Page App SDK](https://auth0.com/docs/libraries/auth0-single-page-app-sdk)) for details and ideas on how to implement authentication for things like calling an API or using the `loginWithPopup` vs `loginWithRedirect` API.

## Create an Auth0 application

Create an Auth0 account (or login to your existing account). When you create a new account you will be guided through the creation of a new tenant. In Auth0 a tenant is a grouping of applications. An "application" is a single auth service that you configure in Auth0 and that can be used in a web or mobile app.

Once you have a tenant created, do the following in the Auth0 Dashboard:

1. Create a new application. On the "Getting Started" page click "Create Application".
2. Give your application a name.
3. Choose an application type: Single-Page App
4. Select the technology: JavaScript
5. In the "Application Settings," set the Allowed Callback URLs, Allowed Web Origins, Allowed Logout URLs to http://localhost:5173 (or whatever URL your app is running on). Make sure to save your changes at the bottom of the page.

NOTE: Eventually you will need to add both your local development URLs and any live URLs for production or staging environments. The URLs need to be comma separated. For example:
    
```
Allowed Callback URLs

http://localhost:5173,
https://my-app.com
```

## Setup authentication in your app

In Your App:
1. Install the Auth0 SDK: `npm install @auth0/auth0-spa-js`
2. Create a `/src/stores/auth.ts` file and enter this code:

```ts
// /src/stores/auth.ts

import { writable, derived } from "svelte/store";
import { createAuth0Client } from "@auth0/auth0-spa-js";

export const isAuthenticated = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const error = writable();

export const authConfig = {
  domain: "<my-tenant>.us.auth0.com",
  clientId: "BgwtVNRdPxINPeUVf3L5FkdsAqUkah38",
};

// Create an auth service. Since there is not an Auth0 SDK for Svelte or SvelteKit, these functions (createClient(), login(), logout()) will expose the functions and information that we need for an auth service.

// Initialize the Auth0 client.
export async function createClient() {
  const auth0Client = await createAuth0Client({
    domain: authConfig.domain,
    clientId: authConfig.clientId,
  });

  return auth0Client;
}

export async function login(auth0) {
  popupOpen.set(true);
  try {
    await auth0.loginWithPopup();

    // Set the `user` store to equal the value returned from the Auth0 `getUser()` function.
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
  return auth0.logout();
}
```

* `isAuthenticated`: Defines the authenticated state of the user, `true` when a user is authenticated, `false` by default.
* `user`: Holds the details of an authenticated user returned by Auth0 after successful authentication.
* `popupOpen`: The sign-in process will be initiated using Auth0's popup authentication modal. This is to monitor the visible state of the popup modal.
* `error`: Holds the error information if the authentication process fails.
* `authConfig.domain`: In Auth0, go to your application and click on Settings. Copy and paste the "Domain" URL.
* `authConfig.clientId`: In Auth0, go to your application and click on Settings. Copy and paste the "Client ID" string.

TIPS: 
* The `authConfig.domain` and `authConfig.clientId` are intended to be exposed in client-side code, so they are not private or sensitive pieces of data. That means that you can check them into GitHub. 
* You can create environment variables and reference those for the `authConfig.domain` and `authConfig.clientId` values.

<br>

Import the auth code into your `+layout.svelte` file, configure the Auth0 client, and setup the `login` and `logout` services:

```html
<!-- +layout.svelte -->

<script lang="ts">
	import { onMount } from "svelte";
	import { isAuthenticated, user, createClient, login, logout } from "/src/stores/auth";

  let auth0Client;
  
  onMount(async () => {
    // Initialize the Auth0 client.
    auth0Client = await createClient();
    // Set `isAuthenticated` to the corresponding value.
    isAuthenticated.set(await auth0Client.isAuthenticated());
    // Set the `user` store to the authenticated user's object.
    user.set(await auth0Client.getUser());
  });
</script>

<header>
  {#if !$isAuthenticated}
    <button on:click={() => login(auth0Client)}>Login</button>
  {:else}
    <button on:click={() => logout(auth0Client)}>Login</button>
  {/if}
</header>

<slot />
```

NOTES:
* When the page loads, the `onMount` Svelte lifecycle method is called with a callback that creates a new Auth0 client and sets the authentication state. This will ensure that all the auth stores will be set when the app first loads.
* You can configure the `onMount` hook and call the `login()` and `logout()` functions from inside the `+layout.svelte` file (like I did above) or you can configure and call those functions from another component that is a child of `+layout.svelte` AND that gets mounted with `+layout.svelte`. This will ensure that your auth service is always present in your app, even if the user refreshes the page. For example, you might want to configure `onMount` and call the `login()` and `logout()` functions from inside a `<Header>` or `<Navigation>` component that is imported into `+layout.svelte`.


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

## If you are using the loginWithRedirect() API

In your `auth.ts` file, replace this:

```js
await auth0.loginWithPopup();
```

with this:

```js
await auth0.loginWithRedirect({
  authorizationParams: {
    redirect_uri: window.location.origin
  }
});
```

If you want to redirect users to a page other than the one where they clicked your login button, then you will need to include that path at the end of the `redirect_uri`, like this:

```js
await auth0.loginWithRedirect({
  authorizationParams: {
    redirect_uri: window.location.origin + "/landing-page"
  }
});
```

Make sure you include that `redirect_uri` in your Allowed URLs in the Auth0 dashboard. For example:

```
Allowed Callback URLs

http://localhost:5173,
http://localhost:5173/landing-page,
https://my-app.com,
https://my-app.com/landing-page
```

In your `onMount` hook in your `+layout.svelte` file, update it to look like this:

```js
onMount(async () => {
  await createClient();
  isAuthenticated.set(await $auth0Client.isAuthenticated());
  user.set(await $auth0Client.getUser());

  // This part is needed if you are using the loginWithRedirect() API. See this tutorial: https://auth0.com/docs/quickstart/spa/vanillajs/01-login
  // Check for the code and state parameters.
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await $auth0Client.handleRedirectCallback();
    
    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
});
```


## Making authenticated calls to your backend API

See:
* https://auth0.com/docs/libraries/auth0-single-page-app-sdk#call-an-api
* https://auth0.com/docs/glossary?term=access-token
* https://auth0.com/docs/glossary?term=refresh-token

Explain the purpose of refresh tokens and access tokens. Look at my notes in my "Identity & Access Management - How to implement auth and things to consider" doc.


## Additional Resources

* [Auth0 Quickstarts](https://auth0.com/docs/quickstarts)
* Auth0's YouTube channel has moved to the [Okta YouTube channel](https://www.youtube.com/oktadev)
