/** Default production origin when `PUBLIC_SITE_ORIGIN` is unset or invalid. */
export const DEFAULT_SITE_ORIGIN = 'https://mw4cheat.app';

/**
 * Canonical https origin for the build (no path, no trailing slash).
 * Set `PUBLIC_SITE_ORIGIN` for preview (e.g. https://mw4-cheat--app.novaxumair.workers.dev).
 */
export function normalizeSiteOrigin(input: string | undefined): string {
  const trimmed = (input ?? '').trim();
  const withScheme =
    trimmed === ''
      ? DEFAULT_SITE_ORIGIN
      : /^https?:\/\//i.test(trimmed)
        ? trimmed
        : `https://${trimmed.replace(/^\/+/, '')}`;

  let url: URL;
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
