import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const logoPng = path.join(publicDir, 'images/brand/mw4-logo.png');

if (!fs.existsSync(logoPng)) {
  console.error(`generate-brand-icons: missing ${path.relative(root, logoPng)}`);
  process.exit(1);
}

/** Source art has alpha; keep transparency for nav + favicons. */
const base = sharp(logoPng).ensureAlpha();

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

await base
  .clone()
  .resize(180, 180, { fit: 'contain', background: transparent })
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));

await base
  .clone()
  .resize(32, 32, { fit: 'contain', background: transparent })
  .png()
  .toFile(path.join(publicDir, 'favicon-32.png'));

await base
  .clone()
  .resize(16, 16, { fit: 'contain', background: transparent })
  .png()
  .toFile(path.join(publicDir, 'favicon-16.png'));

/** Default tab icon (transparent PNG; browsers use this instead of legacy .ico). */
await base
  .clone()
  .resize(32, 32, { fit: 'contain', background: transparent })
  .png()
  .toFile(path.join(publicDir, 'favicon.png'));

console.log('Brand icons generated from images/brand/mw4-logo.png (transparent).');
