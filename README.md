# vishnusudhan.com

Production site for Vishnu Sudhan. Static, hand-built, no runtime dependencies.

## Stack

- **Astro 4.x** static output
- **Vanilla CSS** + **vanilla JS** (no UI libraries, no frameworks)
- **Self-hosted WOFF2 fonts** — Instrument Serif, Inter Variable, JetBrains Mono Variable
- **pnpm** + **Node 20.x LTS**
- Deployed on **Cloudflare Pages**

## Local development

```bash
nvm use            # Node 20.x
pnpm install
pnpm fonts         # copy WOFF2 from @fontsource into public/fonts (one-time after install)
pnpm dev           # http://localhost:4321
```

## Production build

```bash
pnpm build         # outputs to dist/
pnpm preview       # serve dist/ at http://localhost:4321
```

## Layout

```
src/
  layouts/Base.astro          <head>, meta, font preload, theme bootstrap
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
scripts/                      build-time helpers (font copy, photo optimize, og generator, EXIF check)
```

## Maintenance scripts

- `pnpm fonts` — re-extract WOFF2 from `@fontsource*` into `public/fonts/`. Run after upgrading font packages.
- `node scripts/optimize-photo.mjs` — resize + strip metadata from `public/photo.jpg`. Run if the source headshot is replaced. Reads from and writes to `public/photo.jpg`, so back up the original first.
- `node scripts/generate-og.mjs` — regenerate `public/og-image.png`.
- `node scripts/verify-exif.mjs` — confirms `public/photo.jpg` carries no EXIF/ICC/IPTC/XMP metadata.
- `pnpm audit --prod` — must report zero vulnerabilities.

## Editing content

All copy lives directly inside the components in `src/components/`. There is no CMS and no content layer. To change a section, edit the `.astro` file and rebuild.

## Theme

The site defaults to dark and persists the user's choice in `localStorage` under `vs-theme`. The `data-theme` attribute is set on `<html>` before stylesheet evaluation by `public/scripts/theme-init.js` (loaded blocking in `<head>`) to prevent FOUC.

## Performance budget

HTML + CSS + JS combined target: **< 80 KB gzipped** (excluding fonts and the photo).
Current measured size on a clean build: see `pnpm build` output.

## Deployment

See [DEPLOY.md](./DEPLOY.md).
