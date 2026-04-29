import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { statSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'public/photo.jpg');
const tmp = resolve(root, 'public/photo.tmp.jpg');

await sharp(src, { failOn: 'error' })
  .rotate()
  .resize({ width: 960, height: 1200, fit: 'cover', position: 'top' })
  .jpeg({ quality: 78, progressive: true, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(tmp);

const { renameSync } = await import('node:fs');
renameSync(tmp, src);

const size = (statSync(src).size / 1024).toFixed(1);
console.log(`photo.jpg optimized: ${size} KB`);
