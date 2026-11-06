import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_SITE_ORIGIN } from './normalize-site-origin.mjs';

const root = process.cwd();

let SITE_ORIGIN = DEFAULT_SITE_ORIGIN;
const cfPages = process.env.CF_PAGES_URL?.trim();
if (cfPages) {
  try {
    const u = new URL(cfPages);
    if (u.protocol === 'https:') SITE_ORIGIN = u.origin;
  } catch {
    /* keep DEFAULT_SITE_ORIGIN */
  }
}

const dist = path.join(root, 'dist');
const source = path.join(dist, 'sitemap-0.xml');

if (!fs.existsSync(source)) {
  console.error('finalize-sitemap: dist/sitemap-0.xml not found — run astro build first.');
  process.exit(1);
}

const raw = fs.readFileSync(source, 'utf8');
const urlCount = (raw.match(/<url>/g) ?? []).length;

if (urlCount === 0) {
  console.error('finalize-sitemap: sitemap-0.xml contains no URLs.');
  process.exit(1);
}

function formatUrlset(xml) {
  return xml
    .replace(/^<\?xml[^?]*\?>/, '<?xml version="1.0" encoding="UTF-8"?>\n')
    .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
    .replace(/<\/urlset>/, '\n</urlset>\n')
    .replace(/<url>/g, '  <url>\n')
    .replace(/<\/url>/g, '\n  </url>\n')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<\/loc>/g, '</loc>\n')
    .replace(/<lastmod>/g, '    <lastmod>')
    .replace(/<\/lastmod>/g, '</lastmod>\n')
    .replace(/<changefreq>/g, '    <changefreq>')
    .replace(/<\/changefreq>/g, '</changefreq>\n')
    .replace(/<priority>/g, '    <priority>')
    .replace(/<\/priority>/g, '</priority>\n');
}

let formatted = formatUrlset(raw);
if (SITE_ORIGIN !== DEFAULT_SITE_ORIGIN) {
  formatted = formatted.split(DEFAULT_SITE_ORIGIN).join(SITE_ORIGIN);
}
fs.writeFileSync(path.join(dist, 'sitemap.xml'), formatted, 'utf8');

const expectedHost = new URL(SITE_ORIGIN).hostname.toLowerCase();
const locPattern = /<loc>([^<]+)<\/loc>/g;
let m;
while ((m = locPattern.exec(formatted)) !== null) {
  let locUrl;
  try {
    locUrl = new URL(m[1].trim());
  } catch {
    console.error(`finalize-sitemap: invalid <loc> URL: ${m[1]}`);
    process.exit(1);
  }
  if (locUrl.hostname.toLowerCase() !== expectedHost) {
    console.error(
      `finalize-sitemap: <loc> host ${locUrl.hostname} does not match SITE_ORIGIN host ${expectedHost}`,
    );
    process.exit(1);
  }
  if (locUrl.protocol !== 'https:') {
    console.error(`finalize-sitemap: <loc> must use https — got ${locUrl.href}`);
    process.exit(1);
  }
}

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_ORIGIN}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(dist, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), formatted, 'utf8');

console.log(`Sitemap finalized: ${urlCount} URLs → dist/sitemap.xml (${expectedHost})`);
