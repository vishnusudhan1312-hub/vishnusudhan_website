import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dest = resolve(root, 'public/fonts');
mkdirSync(dest, { recursive: true });

const fonts = [
  {
    from: 'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2',
    to: 'instrument-serif-regular.woff2'
  },
  {
    from: 'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2',
    to: 'instrument-serif-italic.woff2'
  },
  {
    from: 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
    to: 'inter-variable.woff2'
  },
  {
    from: 'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
    to: 'jetbrains-mono-variable.woff2'
  }
];

for (const font of fonts) {
  const src = resolve(root, font.from);
  const dst = resolve(dest, font.to);
  copyFileSync(src, dst);
  const size = (statSync(dst).size / 1024).toFixed(1);
  console.log(`copied ${font.to}  (${size} KB)`);
}
