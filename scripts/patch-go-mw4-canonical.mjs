/**
 * After `astro build`, align self-referencing URLs in `dist/go/mw4/index.html` with
 * `PUBLIC_SITE_ORIGIN` (workers preview). Does not rewrite `og:image` (stays on mw4cheat.app CDN).
 */
import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_SITE_ORIGIN, normalizeSiteOrigin } from './normalize-site-origin.mjs';

const origin = normalizeSiteOrigin(process.env.PUBLIC_SITE_ORIGIN || process.env.SITE_ORIGIN);

if (origin === DEFAULT_SITE_ORIGIN) {
  console.log('patch-go-mw4-canonical: skipped (apex build).');
  process.exit(0);
}

const file = path.join(process.cwd(), 'dist', 'go', 'mw4', 'index.html');
if (!fs.existsSync(file)) {
  console.warn('patch-go-mw4-canonical: dist/go/mw4/index.html missing — skipping.');
  process.exit(0);
}

const pageUrl = `${origin}/go/mw4/`;
const escapedOrigin = origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let raw = fs.readFileSync(file, 'utf8');
const before = raw;

raw = raw.replace(/href="https:\/\/mw4cheat\.app\/go\/mw4\/"/g, `href="${pageUrl}"`);
raw = raw.replace(/content="https:\/\/mw4cheat\.app\/go\/mw4\/"/g, `content="${pageUrl}"`);
raw = raw.replace(new RegExp(`"url":\\s*"${escapedOrigin}/go/mw4/"`, 'g'), `"url": "${pageUrl}"`);
raw = raw.replace(/"url":\s*"https:\/\/mw4cheat\.app\/go\/mw4\/"/g, `"url": "${pageUrl}"`);

if (raw === before) {
  console.log('patch-go-mw4-canonical: no URL fields updated.');
} else {
  fs.writeFileSync(file, raw, 'utf8');
  console.log(`patch-go-mw4-canonical: ${file} canonical/og:url/json → ${pageUrl}`);
}
