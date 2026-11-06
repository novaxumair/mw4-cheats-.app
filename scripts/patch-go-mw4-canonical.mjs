/**
 * After `astro build`, `public/go/mw4/index.html` is copied to dist with production URLs.
 * When `PUBLIC_SITE_ORIGIN` targets a preview host, rewrite canonical/schema/body URLs in dist.
 */
import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_SITE_ORIGIN, normalizeSiteOrigin } from './normalize-site-origin.mjs';

const origin = normalizeSiteOrigin(process.env.PUBLIC_SITE_ORIGIN || process.env.SITE_ORIGIN);

if (origin === DEFAULT_SITE_ORIGIN) {
  console.log('patch-go-mw4-canonical: skipped (PUBLIC_SITE_ORIGIN is default production).');
  process.exit(0);
}

const file = path.join(process.cwd(), 'dist', 'go', 'mw4', 'index.html');
if (!fs.existsSync(file)) {
  console.warn('patch-go-mw4-canonical: dist/go/mw4/index.html missing — skipping.');
  process.exit(0);
}

let raw = fs.readFileSync(file, 'utf8');
const before = raw;
raw = raw.replaceAll('https://mw4cheat.app', origin);
if (raw === before) {
  console.log('patch-go-mw4-canonical: no mw4cheat.app URLs to replace.');
} else {
  fs.writeFileSync(file, raw, 'utf8');
  console.log(`patch-go-mw4-canonical: updated dist/go/mw4/index.html → ${origin}`);
}
