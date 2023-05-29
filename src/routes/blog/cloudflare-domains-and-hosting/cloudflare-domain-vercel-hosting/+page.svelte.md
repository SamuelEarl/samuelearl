# How to use a Cloudflare domain with Vercel hosting

I like using Cloudflare as much as possible in large part because they keep their costs down and they also have really great products. I now register all my new domain names with Cloudflare, but I might use other hosting providers, depending on my app needs.

I recently transferred a domain name from another domain registrar to Cloudflare and I ran into an issue after the transfer was complete. The website that I using with the transferred domain is hosted on Vercel. It has a subdomain that I could not access after the transfer.

I found out that Cloudflare's SSL certificates only cover a single level of subdomains. For example:

* `example.com` Will work
* `www.example.com` Will work
* `staging.example.com` Will work
* `www.staging.example.com` Will NOT work
* `staging.www.example.com` Will NOT work

Notice that the examples that will NOT work use multiple subdomains.

In my Vercel dashboard I had configured a subdomain with a permanent redirect from `app.mysite.com` to `www.app.mysite.com`, which caused this error:

```
This site can't provide a secure connection
www.app.mysite.com uses an unsupported protocol.
ERR_SSL_VERSION_OR_CIPHER_MISMATCH
```

All I had to do was remove the redirect and just setup the `app.mysite.com` subdomain with `No Redirect` in my Vercel dashboard under the Domains section and everything worked again.

Once my subdomain was setup in Vercel, then I was be able to follow the instructions here to get Vercel hosting to work with a Cloudflare domain: [How do I use a Cloudflare domain with Vercel?](https://vercel.com/guides/using-cloudflare-with-vercel). If you do this, then your subdomains should also work without adding any specific DNS records for your single-level subdomains.

NOTE: Vercel recommends to use IP address `76.76.21.21` with your `A` records, but when my domain name was transferred, Cloudflare had already configured the DNS records using these IPs for various records: `76.76.21.22`, `76.76.21.164`, `76.76.21.241`, `76.76.21.61`. If you paste any of those into a web browser they will take you to Vercel's site, so you don't have to use only `76.76.21.21`.


## Some tips for configuring Vercel domains

I would create a redirect from `www` to the non-`www` domain.

https://vercel.com/guides/using-cloudflare-with-vercel

---

## Sources

* [Fixing ERR SSL VERSION OR CIPHER MISMATCH in Google Chrome](https://community.cloudflare.com/t/community-tip-fixing-err-ssl-version-or-cipher-mismatch-in-google-chrome/42162)
