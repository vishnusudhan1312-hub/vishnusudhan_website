# Deploying vishnusudhan.com

The site deploys itself. Cloudflare watches this GitHub repo; every push to `main` builds and publishes it to the Worker named `vs`, which serves vishnusudhan.com. If a build fails, the previous version stays live.

## How a change goes live

1. Edit, then check locally with `pnpm dev`.
2. Commit and push to `main`.
3. Wait 1–3 minutes, then open https://vishnusudhan.com in a private window.

Build progress and logs: Cloudflare dashboard → **Workers & Pages** → **vs** → **Deployments**.

## Cloudflare build settings (one-time check)

Dashboard → **Workers & Pages** → **vs** → **Settings** → **Build**:

| Setting | Value |
|---|---|
| Git repository | `vishnusudhan1312-hub/vishnusudhan_website` |
| Production branch | `main` |
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` (blank) |

Optional build variable (**Settings → Variables and secrets**, build section): `NODE_VERSION` = `24`. The repo's `.nvmrc` already asks for 24.

The Worker name in `wrangler.jsonc` must stay `vs` to match the dashboard. Custom domains and routes are managed in the dashboard (**Settings → Domains & Routes**), not in the repo, so deploys leave them alone.

## Cloudflare settings that affect this site

- **JavaScript Detections** (Security → Bots). Cloudflare injects a small inline bot-detection script into every page. The site's security policy blocks inline scripts, so it can't run and leaves an error in the browser console. Turn JavaScript Detections off if the toggle is available. Bot Fight Mode can stay on.
- **Email Address Obfuscation** (Scrape Shield). If it's on, Cloudflare rewrites email links in the HTML using a script. Check that the email chip still opens a mail draft on the live site; if it doesn't, turn this off.
- **Email Routing**. `hello@vishnusudhan.com` forwards to your inbox. Keep it on; the site's email chip and message box both write to that address.

## Verify after a deploy

- https://securityheaders.com/?q=vishnusudhan.com → expect A or A+.
- https://pagespeed.web.dev/?url=https://vishnusudhan.com → check mobile and desktop.
- Toggle dark/light, reload: the choice should stick.
- Type in the message box and press Enter: your email app should open a draft to hello@vishnusudhan.com.

## Rolling back

Dashboard → **Workers & Pages** → **vs** → **Deployments** → pick the previous deployment → **Rollback**. Or revert the commit on GitHub and push.
