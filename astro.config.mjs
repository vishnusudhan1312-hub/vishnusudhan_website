import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vishnusudhan.com',
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },

  build: {
    // Everything external so the CSP can stay at style-src 'self' / script-src 'self'.
    inlineStylesheets: 'never',
    assets: '_assets'
  },

  integrations: [sitemap()],

  vite: {
    build: {
      sourcemap: false,
      target: 'es2022',
      assetsInlineLimit: 0
    }
  }
});
