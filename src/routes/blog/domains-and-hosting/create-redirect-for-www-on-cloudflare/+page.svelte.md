# How to create a redirect for `www` on Cloudflare

When you host a site on Cloudflare it is a good idea to create a redirect from `www` to your main domain.

If you don't have a `www` redirect in the Cloudflare DNS records, then you will see this alert: Add an A, AAAA, or CNAME record for www so that www.mysite.com will resolve.

Step 1: Create a CNAME record

1. In the Cloudflare dashboard select your website >> DNS >> Records.
2. Click the "Add record" button and add the following record:

| Type | Name | Content | Proxy status | TTL |
| ---- | ---- | ------- | ------------ | --- |
| `CNAME` | `www` | `mysite.pages.dev` | `Proxied` | `Auto` |

<br>

Step 2: Create a redirect page rul

1. Click "Rules" >> "Page Rules" in the side nav.
2. Click the "Create Page Rule" button.
3. On the "Create a Page Rule for mysite.com":
    3.1. In the "URL" field: `www.mysite.com`
    3.2. Pick a Setting: `Forward URL`
    3.3. Enter destination URL: `mysite.com`
    3.4. Click the `Save and Deploy Page Rule` button.

Source: https://community.cloudflare.com/t/redirect-example-com-to-www-example-com/78348
