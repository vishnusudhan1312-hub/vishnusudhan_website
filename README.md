# vishnusudhan.com

Production site for Vishnu Sudhan. Static, hand-built, no runtime dependencies.

## Stack

- **Astro 6.x** static output
- **Vanilla CSS** + **vanilla JS** (no UI libraries, no frameworks)
- **Self-hosted WOFF2 fonts** — Instrument Serif, Inter Variable, JetBrains Mono Variable
- **lightningcss** for CSS minification, **esbuild** for JS minification
- **pnpm** + **Node 22.x LTS** (or newer)
- Deployed on **Cloudflare Pages**

## Local development

```bash
nvm use            # Node 22 (Maintenance LTS) or 24 (Active LTS)
pnpm install
pnpm fonts         # copy WOFF2 from @fontsource into public/fonts (one-time after install)
pnpm dev           # http://localhost:4321
```

## Production build

```bash
pnpm build         # outputs to dist/
pnpm preview       # serve dist/ at http://localhost:4321
pnpm verify        # confirm photo.jpg has no EXIF/ICC/IPTC/XMP
pnpm audit         # production security audit (must show 0 vulns)
```

## Layout

```
src/
  layouts/Base.astro          <head>, meta, font preload, JSON-LD Person, theme bootstrap
  pages/index.astro           composes the page
  components/                 one .astro file per section
  styles/                     tokens, reset, globals, motion (extracted from prototype)
public/
  scripts/                    theme-init.js (head, blocking) + main.js (body, deferred)
  fonts/                      WOFF2 files served as /fonts/*.woff2
  _headers                    Cloudflare Pages security headers + cache rules
  photo.jpg                   EXIF-stripped portrait (960x1200)
  og-image.png                1200x630 social preview
  favicon.svg                 'vs' italic crimson mark
  robots.txt                  with sitemap reference
scripts/                      build-time helpers (font copy, photo optimize, og generator, EXIF check)
```

## Maintenance scripts

- `pnpm fonts` — re-extract WOFF2 from `@fontsource*` into `public/fonts/`. Run after upgrading font packages.
- `node scripts/optimize-photo.mjs` — resize + strip metadata from `public/photo.jpg`. Run if the source headshot is replaced. Reads from and writes to `public/photo.jpg`, so back up the original first.
- `node scripts/generate-og.mjs` — regenerate `public/og-image.png`.
- `pnpm verify` — confirm `public/photo.jpg` carries no EXIF/ICC/IPTC/XMP metadata.
- `pnpm audit` — production-only vulnerability audit. Must report zero before commit.

## Editing content

All copy lives directly inside the components in `src/components/`. There is no CMS and no content layer. To change a section, edit the `.astro` file and rebuild.

## Theme

The site defaults to **the user's OS preference** on first visit (`prefers-color-scheme`), then persists their choice in `localStorage` under `vs-theme`. The `data-theme` attribute is set on `<html>` before stylesheet evaluation by `public/scripts/theme-init.js` (loaded blocking in `<head>`) to prevent FOUC.

## Accessibility

Targets **WCAG 2.2 AA** comprehensively, with **AAA contrast** for body and caption text in both themes. Specifically:

- Body text on `--bg`: 9:1+ in both dark and light (AAA pass for normal text)
- Caption / muted labels: 7.5:1+ in both themes (AAA pass)
- Brand accent on backgrounds: 5:1 in dark, 7.4:1 in light (AAA on light theme; AA on dark — design trade-off documented)
- Decorative `aria-hidden` text (e.g., the giant section numbers `01`, `02`) is exempt from contrast
- Abbreviations (MAS, APRA, RBI, CASA, CAAS, CMMI, APAC, SEO, UX, FMSEO) are wrapped in `<abbr title="…">` per SC 3.1.4
- All sections have headings (visible or `visually-hidden`) per SC 2.4.10
- Focus indicators: 2px solid accent outline, 4px offset
- `prefers-reduced-motion` disables all animations
- `prefers-color-scheme` respected on first paint
- Keyboard fully operable (skip link, native button/link semantics)

## SEO

- `<link rel="canonical">`, OG and Twitter card meta, profile-type OG
- JSON-LD `Person` structured data with employer, location, and topics
- `<link rel="me">` to LinkedIn for identity verification
- Auto-generated `sitemap-index.xml` via `@astrojs/sitemap`
- `robots.txt` references the sitemap

## Performance budget

HTML + CSS + JS + sitemaps combined target: **< 80 KB gzipped** (excluding fonts and the photo).
Current measured size on a clean build: **~14 KB gzipped**.

## Deployment

See [DEPLOY.md](./DEPLOY.md).
