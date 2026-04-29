# Deploying vishnusudhan.com to Cloudflare Pages

A step-by-step guide. Follow it once, top to bottom. ~20 minutes the first time.

You'll end up with:
- `vishnusudhan.com` registered at Cloudflare Registrar
- Site live on Cloudflare Pages, deployed from GitHub
- HTTPS enforced, security headers active, A+ on securityheaders.com
- Bot Fight Mode + WAF on
- DNSSEC + Registrar Lock enabled

You'll need: a credit card (~$10/yr for the domain), a GitHub account, this repo pushed to GitHub.

---

## Part 1 — Domain (Cloudflare Registrar)

1. Sign up at [cloudflare.com](https://cloudflare.com).
2. From the dashboard sidebar, choose **Domain Registration → Register Domains**.
3. Search `vishnusudhan.com`. Add to cart, pay (~$10/yr at cost — Cloudflare doesn't markup).
4. Once registered, open the domain. Under **DNS → Settings**, enable **DNSSEC**. Cloudflare will show DS records — they're auto-applied at the Registrar tier, so no manual step.
5. Under **Domain Registration → Manage Domains**, click your domain, scroll to **Transfer** and confirm **Registrar Lock = ON** (default).

---

## Part 2 — Pages deployment

1. **Push this repo to GitHub.** From inside the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial production build"
   git branch -M main
   gh repo create vishnusudhan-com --private --source=. --push
   ```
   (Or push manually if you don't use `gh`.)

2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.

3. Authorize GitHub, select the `vishnusudhan-com` repo.

4. **Build settings:**
   - **Framework preset:** Astro
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
   - **Environment variables:**
     - `NODE_VERSION` = `20`
     - `PNPM_VERSION` = `9`

5. Click **Save and Deploy**. First build takes ~2 minutes. You'll get a `*.pages.dev` preview URL.

6. Once green, go to the project's **Custom domains** tab. Add:
   - `vishnusudhan.com`
   - `www.vishnusudhan.com`

   Cloudflare creates the CNAME records automatically because the domain is in your account. Wait ~1 minute for the SSL cert to provision (status changes from "Pending" to "Active").

7. Set the apex (`vishnusudhan.com`) as the canonical and `www` as a redirect — Cloudflare Pages does this automatically when both are added.

---

## Part 3 — Hardening

Open the zone for `vishnusudhan.com` in Cloudflare (not the Pages project — the DNS zone). Then:

1. **Security → Bots → Bot Fight Mode:** ON.
2. **Security → WAF → Security Level:** High.
3. **Security → Settings → Browser Integrity Check:** ON.
4. **SSL/TLS → Edge Certificates:**
   - Always Use HTTPS: ON
   - Automatic HTTPS Rewrites: ON
   - Minimum TLS Version: 1.2
5. **Speed → Optimization:**
   - Auto Minify: HTML, CSS, JS all ON
   - Brotli: ON (default)
6. **Caching → Configuration → Browser Cache TTL:** Respect Existing Headers (the site ships its own via `public/_headers`).

---

## Part 4 — Verification

1. Open the site in incognito on phone + desktop. The first paint should already be themed (dark by default), the photo should load grayscale and color-fade on hover, the APAC chart trajectories should draw in.
2. Click the theme toggle → site flips to light mode → reload → still light. (Theme persists in `localStorage` under `vs-theme`.)
3. Click the **Email** row in the Connect section → email is revealed AND auto-copied to clipboard.
4. Open DevTools → **Network** tab → reload. Confirm: every request goes to `vishnusudhan.com`. No `fonts.googleapis.com`, no Google Analytics, no third party.
5. Run [securityheaders.com](https://securityheaders.com/?q=https%3A%2F%2Fvishnusudhan.com) → expect **A+**.
6. Run [pagespeed.web.dev](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fvishnusudhan.com) → expect Performance ≥ 95 mobile, ≥ 98 desktop, Accessibility / Best Practices / SEO all 100.
7. Open `https://vishnusudhan.com/photo.jpg` directly. View image properties — there should be no EXIF, GPS, or camera metadata.

---

## Routine updates

Editing copy or making any change:

```bash
# edit src/components/*.astro
pnpm build           # local sanity check
git add . && git commit -m "..." && git push
```

Cloudflare Pages picks up the push and redeploys in ~2 minutes. The `_headers` file is part of `public/` and ships on every deploy.

---

## Rollback

In the Pages project → **Deployments**, click any past deployment → **Rollback to this deployment**. No git revert needed.

---

## What NOT to add

The whole site is intentionally lean. Resist the urge to add:
- Google Analytics or any tracker — the only "analytics" is Cloudflare's built-in zone-level traffic graph.
- Cookie banners — the site sets no cookies.
- Contact forms — the email reveal is the contact path.
- A CMS — copy lives in components, edited in code.
- Any `<script src="https://...">` from a CDN — the CSP forbids it and so does the brief.
