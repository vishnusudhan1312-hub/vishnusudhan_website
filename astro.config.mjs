import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vishnusudhan.com',
  output: 'static',
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
  }
});
