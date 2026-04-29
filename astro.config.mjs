import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://vishnusudhan.com',
  output: "hybrid",
  trailingSlash: 'ignore',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  },

  devToolbar: { enabled: false },

  vite: {
    build: {
      sourcemap: false,
      cssMinify: true,
      minify: 'esbuild'
    }
  },

  adapter: cloudflare()
});