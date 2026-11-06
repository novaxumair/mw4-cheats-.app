# MW4 Cheat (mw4cheat.app)

Static Astro site. Production output: **`dist/`**.

## Build

Requires **Node ≥ 22.12** (see `package.json`).

```bash
npm ci
npm run build
```

Optional: set **`SITE_ORIGIN`** so sitemap validation and `sitemap-index.xml` match your deployment hostname (default: `https://mw4cheat.app`).

```bash
set SITE_ORIGIN=https://mw4cheat.app
npm run build
```

## Sitemaps and SEO

| File | Role |
|------|------|
| `public/robots.txt` | `Sitemap: https://mw4cheat.app/sitemap.xml` — **submit this URL** in Google Search Console |
| `dist/sitemap.xml` | Final urlset (after `scripts/finalize-sitemap.mjs` runs in `npm run build`) |
| `dist/sitemap-index.xml` | Points at the urlset above; useful if you prefer the index URL in tooling |

`/go/` is excluded from the sitemap (see `astro.config.mjs` + `src/config/sitemap.ts`) and disallowed in `robots.txt`.

## Cloudflare Pages

1. **Deploy command** (build must run first): **`npm run deploy`** — runs **`wrangler pages deploy dist`**. In the Cloudflare dashboard, set the deploy step to that instead of **`wrangler deploy`** (Workers), which will fail for this static site.
2. Connect the repo or run **`npm run deploy`** from the project root after **`npm run build`** (see `wrangler.toml` **`name`** — use the same value as your Pages project name in the dashboard, or pass **`--project-name`** if it differs).
3. **Custom domain**: point `mw4cheat.app` (and optional `www`) at Cloudflare; enable **Always Use HTTPS** and redirect **www → apex** (also covered by `public/_redirects`).
4. **Headers / redirects**: `public/_headers` and `public/_redirects` are copied into **`dist/`** at build time and applied by Cloudflare static hosting.

IndexNow runs only if **`INDEXNOW_KEY`** is set during build (`scripts/indexnow.mjs`).

## Local preview of `dist/`

```bash
npm run start
```

Uses `scripts/serve.mjs` (trailing-slash and checkout behavior); Cloudflare uses `_redirects` for the same path rules where applicable.
