# How to use a Cloudflare domain with Vercel hosting

I like using Cloudflare in my web projects. This is in large part because they keep their costs down and they also have really great products. Whenever I register new domain names I will register them with Cloudflare, but I might use other web hosting providers, depending on the needs of my app.

I recently transferred a domain name from Namecheap to Cloudflare and I ran into an issue after the transfer was complete. The website that is associated with the domain name that I transferred is hosted on Vercel. That website has a subdomain that I could not access after the domain name was transferred to Cloudflare. When I tried visiting the subdomain in a browser, this was the error that I was shown:

<br>

```
This site can't provide a secure connection
www.app.mysite.com uses an unsupported protocol.
ERR_SSL_VERSION_OR_CIPHER_MISMATCH
```

<br>

This is what I found out while I was troubleshooting the issue:

<br>

Cloudflare's SSL certificates only cover single-level subdomains. For example:

* `example.com` Will work
* `www.example.com` Will work
* `staging.example.com` Will work
* `www.staging.example.com` Will NOT work
* `staging.www.example.com` Will NOT work

Notice that the examples that will NOT work have multi-level subdomains.

The issue was that in my Vercel dashboard I had configured a subdomain with a permanent redirect from `app.mysite.com` to `www.app.mysite.com`, which was causing the error that I saw in my browser.

All I had to do was go to the `Domains` section of my Vercel dashboard and remove the redirect from `app.mysite.com` to `www.app.mysite.com`. Then I simply setup the `app.mysite.com` subdomain with `No Redirect`. Once I did that, everything worked again.

Once my subdomain was setup correctly in Vercel, then I was be able to follow the instructions in the following link to get my Cloudflare domain name to work with Vercel hosting: [How do I use a Cloudflare domain with Vercel?](https://vercel.com/guides/using-cloudflare-with-vercel). 

When I did my domain name transfer, Cloudflare created the DNS records that I needed for my app. If you are not performing a domain name transfer, then you might have to create the following DNS records in Cloudflare to get your single-level subdomains to also point to Vercel:

| Type | Name | Content | Proxy status | TTL |
| ---- | ---- | ------- | ------------ | --- |
| `A` | `*` | `76.76.21.22` | `Proxied` | `Auto` |
| `A` | `www` | `76.76.21.61` | `Proxied` | `Auto` |

NOTE: In the article that I linked to above, Vercel recommends using IP address `76.76.21.21` with your `A` records. However, when my domain name was transferred, Cloudflare had already created the DNS records using these IPs for various records: `76.76.21.22`, `76.76.21.164`, `76.76.21.241`, `76.76.21.61`. If you paste any of IP addresses into a web browser, then they will take you to Vercel's site. So there are other IP addresses that you can use for Vercel.

---

## Sources

* [Fixing ERR SSL VERSION OR CIPHER MISMATCH in Google Chrome](https://community.cloudflare.com/t/community-tip-fixing-err-ssl-version-or-cipher-mismatch-in-google-chrome/42162)
