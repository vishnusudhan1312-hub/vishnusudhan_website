import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Live URL — production custom domain.
  site: 'https://vishnusudhan.com',

  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  prefetch: false,

  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  },

  devToolbar: { enabled: false },

  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 1.0,
      lastmod: new Date()
    })
  ],

  vite: {
    build: {
      sourcemap: false,
      target: 'es2022',
      cssMinify: 'esbuild',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          assetFileNames: (info) => {
            const raw = info.names?.[0] ?? info.name ?? 'asset';
            const safe = raw.replace(/@_@astro/g, '').replace(/[^a-zA-Z0-9._-]/g, '-');
            const base = safe.replace(/\.[^.]+$/, '') || 'asset';
            return `_assets/${base}-[hash][extname]`;
          },
          chunkFileNames: '_assets/chunk-[hash].js',
          entryFileNames: '_assets/[name]-[hash].js'
        }
      }
    }
  },

  adapter: cloudflare()
});