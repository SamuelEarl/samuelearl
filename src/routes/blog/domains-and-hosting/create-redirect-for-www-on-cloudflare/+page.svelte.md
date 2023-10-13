# How to Create a Redirect for `www` on Cloudflare

When you host a site on Cloudflare it is a good idea to create a redirect from `www` to your main domain.

If you don't have a `www` redirect in the Cloudflare DNS records, then you will see this alert: 

```
Add an A, AAAA, or CNAME record for www so that www.mysite.com will resolve.
```

This is how you do that.


## Step 1: Create a CNAME record

1. In the Cloudflare dashboard select your website.
2. Then in the left side menu select DNS >> Records.
3. Click the "Add record" button and add the following record:

| Type | Name | Content | Proxy status | TTL |
| ---- | ---- | ------- | ------------ | --- |
| `CNAME` | `www` | `mysite.pages.dev` | `Proxied` | `Auto` |


## Step 2: Create a redirect page rul

1. In your Cloudflare dashboard select your website.
2. Then in the left side menu select "Rules" >> "Page Rules".
3. On the "Page Rules" page, click the "Create Page Rule" button.
4. On the "Create a Page Rule for mysite.com" page, enter/select the following:
    1. In the "URL" field enter: `www.mysite.com`
    2. Pick a Setting: `Forward URL`
    3. Enter destination URL: `mysite.com`
    4. Click the `Save and Deploy Page Rule` button.

That's it! You are done.

---

## Sources

* [Redirect example.com to www.example.com](https://community.cloudflare.com/t/redirect-example-com-to-www-example-com/78348)
