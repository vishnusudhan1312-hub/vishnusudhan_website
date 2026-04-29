import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const photo = resolve(root, 'public/photo.jpg');

const meta = await sharp(photo).metadata();
const flagged = [];
if (meta.exif) flagged.push(`EXIF (${meta.exif.length} bytes)`);
if (meta.icc) flagged.push(`ICC (${meta.icc.length} bytes)`);
if (meta.iptc) flagged.push(`IPTC (${meta.iptc.length} bytes)`);
if (meta.xmp) flagged.push(`XMP (${meta.xmp.length} bytes)`);

console.log(`photo.jpg: ${meta.width}x${meta.height}, format ${meta.format}, ${meta.size || 'n/a'} bytes`);
if (flagged.length === 0) {
  console.log('✓ No EXIF/ICC/IPTC/XMP metadata');
} else {
  console.log(`! Found metadata: ${flagged.join(', ')}`);
  process.exit(1);
}
