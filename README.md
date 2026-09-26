# vishnusudhan.com

Single-page personal site, designed as a conversation: visitor questions on the right, Vishnu's answers on the left.

Static Astro build, deployed to Cloudflare (Worker `vs`, static assets only). No CMS, no trackers, no cookies, no form backend.

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 7, static output |
| Motion | CSS for the hero and bubble reveals; GSAP + ScrollTrigger for scroll-scrubbed moments; Lenis for smooth scroll |
| Fonts | Instrument Serif, Inter Variable, JetBrains Mono Variable, self-hosted via Fontsource |
| Hosting | Cloudflare Workers static assets, deployed on push to `main` |
| Package manager | pnpm 10 (Node 22.12+; `.nvmrc` pins 24) |

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # outputs dist/
pnpm audit      # production dependency audit
```

`pnpm preview` builds and runs `wrangler dev`, which applies `public/_headers` locally. On some Windows machines the Cloudflare runtime needs the latest Microsoft Visual C++ Redistributable.

## Where things live

- `src/data/content.ts`: every word of site copy, and the FAQ answers built from it. Edit copy here only.
- `src/pages/index.astro`: the order of the conversation.
- `src/components/`: one component per bubble type and attachment.
- `src/styles/tokens.css`: colours, type, spacing and motion tokens (light and dark).
- `src/scripts/site.ts`: theme, clock, typing reveals, carousel, flip cards, message box. No GSAP dependency.
- `src/scripts/motion.ts`: GSAP/Lenis layer. Loaded only when the visitor allows motion, once the page is idle.
- `public/_headers`: security headers and caching.
- `public/theme-init.js`: sets the theme before first paint (external file so the CSP needs no inline script).

## Rules the code keeps

- All copy is in the HTML at build time. JavaScript only animates it; the page reads fully with JS off.
- `prefers-reduced-motion` shows everything in its final state.
- CSP is strict: `script-src 'self'`, `style-src 'self'`, no inline scripts or styles, Trusted Types enforced. Don't add inline `<script>`/`<style>` or `style=""` attributes; `astro.config.mjs` sets `inlineStylesheets: 'never'` for this reason.
- The message box only builds a `mailto:` link. Nothing is sent to or stored by the site.
- New dependency versions must be at least 3 days old (`minimumReleaseAge` in `pnpm-workspace.yaml`).
