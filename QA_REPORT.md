# QA report — MW4 Cheat (mw4cheats.app)

**Build:** Run `npm install` then `npm run build` (Node **≥ 22.12** per `package.json`). Build runs `optimize-images`, Astro build, sitemap finalize, and IndexNow hook.

This checklist validates the implementation against the MW4 site plan.

## 1. Files changed (scope)

- Domain: `src/config/site.ts`, `astro.config.mjs`, `scripts/serve.mjs`, `public/robots.txt`, `scripts/redirects.mjs`, `scripts/indexnow.mjs`, `scripts/finalize-sitemap.mjs`
- Checkout: `src/config/checkout-redirects.mjs`, `src/config/checkout.ts`, `src/data/productPricing.ts`
- Products & i18n: `src/data/products.ts`, `src/i18n/en.ts`, `src/i18n/types.ts`
- Routes: `src/pages/products/mw4-cheats/*` (hub, `[slug]`, utilities)
- Blog: `src/data/blog/posts.ts`, `src/pages/blog/[slug].astro`
- FAQ & forum data: `src/data/faq.ts`, `src/data/forum.ts`, `src/pages/forum/*.astro`
- SEO & schema: `src/config/pageSeo.ts`, `src/config/seo.ts`, `src/utils/schema.ts`
- Docs: `docs/search-console.md`, `docs/seo-research-mw4.md`, `.seo-baseline/fields.txt`

## 2. Pages built

- `/`, `/products/mw4-cheats/`, `/products/mw4-cheats/[slug]/`, `/products/mw4-cheats/utilities/`, `/blog/`, `/blog/[slug]/`, `/faq/`, `/forum/`, `/forum/[slug]/`, legal/support/about/404 as applicable.

## 3. Blog coverage

- **35** posts in `src/data/blog/posts.ts` (meets ~30+ requirement); cover images under `public/images/mw4/` (shared asset pool).

## 4. Primary keywords (sample)

- Home: mw4 cheats pc  
- Hub: mw4 cheat products  
- Suite: mw4 private cheat  
- See full table in `docs/seo-research-mw4.md`.

## 5. Competitors (research)

- Documented in `docs/seo-research-mw4.md` (commercial sites, Reddit, video).

## 6. Content gaps / opportunities

- Expand video/transcript companions for high-impression YouTube queries.  
- Monitor Search Console for overlapping queries between `/` and `/products/mw4-cheats/` and tune `pageSeo.ts`.

## 7. Technical SEO

- Canonicals via `canonicalUrl` in `src/config/seo.ts` — always `https://mw4cheats.app` (including Pages preview builds).
- `PAGE_SEO` overrides in `src/config/pageSeo.ts`.  
- Sitemap: `@astrojs/sitemap` + `scripts/finalize-sitemap.mjs`.  
- `robots.txt` host: mw4cheats.app.

## 8. Core Web Vitals (notes)

- LCP: hero/gameplay WebP preloaded on homepage (`src/pages/index.astro`).  
- Re-run Lighthouse after deploy; images pass through `scripts/optimize-images.mjs` on build.

## 9. Sitemap

- Generated at `/sitemap-index.xml` / `/sitemap-0.xml` (Astro defaults + finalize script).

## 10. Canonicals & trailing slash

- Site uses trailing-slash URLs in helpers; verify production server (`scripts/serve.mjs`) matches.

## 11. hreflang

- Single locale **en**; `BaseLayout` emits `en` + `x-default` alternates with absolute `https://mw4cheats.app` URLs.

## 12. Structured data

- Organization / WebSite / breadcrumbs / FAQ / articles via `src/utils/schema.ts`; product pages use product-related JSON-LD where implemented. No fabricated `aggregateRating`.

## 13. Broken links (spot-check)

- Internal nav: Header, Footer, product cards, blog sidebars.  
- Forum `sourcePath` → existing blog slugs.

## 14. Mobile & nav

- Header: image logo + Try Now → `/go/mw4/`; test hamburger and CTA.

## 15. CTA & `/go/` verification

| Internal path | Expected external target |
| ------------- | ----------------------- |
| `/go/mw4/` | `https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fmw4` |
| `/go/hwid-spoofer/` | `https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fhwid-spoofer` |
| `/go/ugc/` | `https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fugc` |
| `/go/skin-changer/` | `https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fskin-changer` |

Legacy: `/go/game-accounts/` → `/go/ugc/`. Product slugs map via `checkoutForSlug` in `src/config/checkout.ts`.

## 16. Branding

- Visible name: **MW4 Cheat** (`t.site.name`).  
- Navbar: `NAV_LOGO_SRC` from `src/config/site.ts` (local `public/images/brand/` asset).  
- No third-party store name beside logo.

## 17. Banned / legacy strings (grep)

- On-site copy should not promote unrelated games or old template brands; run `rg -i "dota|dotacheats|fortnite|valheim|halloween" src` before release.

## 18. Opportunities & backlink roadmap

- See `docs/seo-research-mw4.md` (Reddit, YouTube, editorial guest posts, honest-risk positioning).

---

**Sign-off:** After `npm run build` succeeds with zero errors, spot-check the four `/go/*` URLs in devtools (302/307 to affiliate), open one blog post (FAQ JSON-LD), and confirm `robots.txt` and sitemap URLs use `https://mw4cheats.app`.
