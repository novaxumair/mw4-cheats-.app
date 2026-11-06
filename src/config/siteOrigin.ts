/** Default production origin when `PUBLIC_SITE_ORIGIN` is unset. */
export const DEFAULT_SITE_ORIGIN = 'https://mw4cheat.app';

/**
 * Canonical https origin for this build (Pages preview/workers vs production apex).
 * Set `PUBLIC_SITE_ORIGIN=https://mw4-cheat--app.novaxumair.workers.dev` in Preview only.
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
