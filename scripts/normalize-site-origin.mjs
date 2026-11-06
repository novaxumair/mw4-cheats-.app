/**
 * Primary site origin (no path). Used by finalize-sitemap and indexnow postbuild scripts.
 */

export const DEFAULT_SITE_ORIGIN = 'https://mw4cheat.app';

/**
 * @param {string | undefined} input
 * @returns {string}
 */
export function normalizeSiteOrigin(input) {
  const trimmed = (input ?? '').trim();
  const withScheme =
    trimmed === ''
      ? DEFAULT_SITE_ORIGIN
      : /^https?:\/\//i.test(trimmed)
        ? trimmed
        : `https://${trimmed.replace(/^\/+/, '')}`;

  let url;
  try {
    url = new URL(withScheme);
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }

  if (url.protocol !== 'https:') {
    return DEFAULT_SITE_ORIGIN;
  }

  if (url.pathname !== '/' && url.pathname !== '') {
    return DEFAULT_SITE_ORIGIN;
  }

  return url.origin;
}
