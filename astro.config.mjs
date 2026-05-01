import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
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
      cssMinify: 'lightningcss',
      minify: 'esbuild'
    }
  }
});
