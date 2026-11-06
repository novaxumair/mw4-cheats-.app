export const SITE_DOMAIN = 'mw4cheat.app';
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const PRODUCT_BASE = '/products/mw4-cheats/';
export const TITLE_PREFIX = 'MW4 Cheat';
export const SUPPORT_EMAIL = `support@${SITE_DOMAIN}`;

/** Path to static files in /public when `astro.base` is not `/` (e.g. GitHub Pages folder). Always ends with `/`. */
const ASSET_BASE = import.meta.env.BASE_URL;

/**
 * Prefix root-absolute public paths so they work when the site is served under a subpath (`base` in astro.config).
 * External URLs and paths already under `base` are returned unchanged (safe to call twice).
 */
export function siteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const base = ASSET_BASE.replace(/\/$/, '');
  if (!base) return normalized;
  if (normalized === base || normalized.startsWith(`${base}/`)) return normalized;
  return `${base}${normalized}`;
}

export const NAV_LOGO_SRC = siteAssetUrl('/images/brand/mw4-logo.png');
