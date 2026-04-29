import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { statSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const out = resolve(root, 'public/og-image.png');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0e0d0c"/>
      <stop offset="1" stop-color="#161310"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <text x="980" y="540" font-family="Georgia, 'Times New Roman', serif" font-size="520" font-style="italic" fill="#EF4444" fill-opacity="0.04" text-anchor="end" letter-spacing="-22">VS</text>

  <g font-family="'JetBrains Mono', 'Menlo', monospace">
    <rect x="80" y="80" width="32" height="1" fill="#EF4444"/>
    <text x="124" y="86" font-size="14" fill="#EF4444" letter-spacing="3" text-transform="uppercase">BUSINESS DEVELOPMENT &#183; DIGITRALY</text>
  </g>

  <text x="80" y="280" font-family="Georgia, 'Times New Roman', serif" font-size="128" font-weight="400" fill="#fbf7f2" letter-spacing="-5">Vishnu</text>
  <text x="160" y="400" font-family="Georgia, 'Times New Roman', serif" font-size="128" font-weight="400" fill="#fbf7f2" letter-spacing="-5"><tspan fill="#EF4444" font-style="italic">&#8212;</tspan> Sudhan.</text>

  <text x="80" y="490" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-style="italic" fill="#fbf7f2" fill-opacity="0.65">Building digital transformation pipelines for</text>
  <text x="80" y="535" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-style="italic" fill="#fbf7f2" fill-opacity="0.65">APAC&#8217;s regulated industries.</text>

  <line x1="80" y1="580" x2="1120" y2="580" stroke="#fbf7f2" stroke-opacity="0.16" stroke-width="1"/>
  <text x="80" y="608" font-family="'JetBrains Mono', 'Menlo', monospace" font-size="14" fill="#fbf7f2" fill-opacity="0.4" letter-spacing="2">vishnusudhan.com &#183; CHENNAI</text>
  <text x="1120" y="608" font-family="Georgia, 'Times New Roman', serif" font-size="18" font-style="italic" fill="#EF4444" text-anchor="end">APAC &#183; 5 markets</text>
</svg>
`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, palette: false })
  .toFile(out);

const size = (statSync(out).size / 1024).toFixed(1);
console.log(`og-image.png generated: 1200x630, ${size} KB`);
