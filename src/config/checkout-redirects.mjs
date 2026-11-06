/** Checkout destinations keyed by internal product id (no affiliate codes in filenames). */
export const CHECKOUT_URLS = {
  mw4: 'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fmw4',
  skinChanger: 'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fskin-changer',
  hwidSpoofer: 'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fhwid-spoofer',
  gameAccounts: 'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fugc',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/mw4', CHECKOUT_URLS.mw4],
  ['/go/mw4/', CHECKOUT_URLS.mw4],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  /** UGC tool — single canonical path (same destination as legacy `/go/game-accounts/`). */
  ['/go/ugc', CHECKOUT_URLS.gameAccounts],
  ['/go/ugc/', CHECKOUT_URLS.gameAccounts],
]);

export function resolveCheckoutPathRedirect(pathname) {
  /** Legacy — same destination as `/go/ugc/`; not generated as a static `/go/` page. */
  if (pathname === '/go/game-accounts' || pathname === '/go/game-accounts/') {
    return CHECKOUT_URLS.gameAccounts;
  }

  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
