/**
 * On Cloudflare Pages preview, `CF_PAGES_URL` is the deployment origin (e.g. *.pages.dev).
 * Rewrite canonical, hreflang, and og:url from mw4cheats.app to that origin so crawls self-reference.
 * Production builds omit this env — script is a no-op.
 */
import fs from 'node:fs';
import path from 'node:path';

const raw = process.env.CF_PAGES_URL?.trim();
if (!raw) {
  console.log('patch-html-canonical-pages-preview: skipped (CF_PAGES_URL unset).');
  process.exit(0);
}

let deployOrigin;
try {
  deployOrigin = new URL(raw).origin;
} catch {
  console.warn('patch-html-canonical-pages-preview: invalid CF_PAGES_URL — skipping.');
  process.exit(0);
}

const APEX = 'https://mw4cheats.app';
if (deployOrigin === APEX) {
  console.log('patch-html-canonical-pages-preview: skipped (same as apex).');
  process.exit(0);
}

const dist = path.join(process.cwd(), 'dist');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (name.endsWith('.html')) files.push(p);
  }
  return files;
}

let count = 0;
for (const file of walk(dist)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = html.replace(
    new RegExp(`<link rel="canonical" href="${escapeRegExp(APEX)}`, 'g'),
    `<link rel="canonical" href="${deployOrigin}`,
  );
  html = html.replace(
    new RegExp(`(<link rel="alternate" hreflang="[^"]+" href=")${escapeRegExp(APEX)}`, 'g'),
    `$1${deployOrigin}`,
  );
  html = html.replace(
    new RegExp(`<meta property="og:url" content="${escapeRegExp(APEX)}`, 'g'),
    `<meta property="og:url" content="${deployOrigin}`,
  );
  html = html.replace(
    new RegExp(`<meta name="twitter:url" content="${escapeRegExp(APEX)}`, 'g'),
    `<meta name="twitter:url" content="${deployOrigin}`,
  );
  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log(`patch-html-canonical-pages-preview: updated ${count} HTML file(s) → ${deployOrigin}`);
