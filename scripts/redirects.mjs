/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/mw4-cheats/'],
  ['/cheats/', '/products/mw4-cheats/'],
  ['/cheats/lite', '/products/mw4-cheats/'],
  ['/cheats/lite/', '/products/mw4-cheats/'],
  ['/cheats/pro', '/products/mw4-cheats/'],
  ['/cheats/pro/', '/products/mw4-cheats/'],
  ['/cheats/elite', '/products/mw4-cheats/'],
  ['/cheats/elite/', '/products/mw4-cheats/'],
  ['/cheats/compare', '/blog/mw4-cheat-feature-comparison/'],
  ['/cheats/compare/', '/blog/mw4-cheat-feature-comparison/'],
  ['/products/mw4-cheats/utilities', '/products/mw4-cheats/'],
  ['/products/mw4-cheats/utilities/', '/products/mw4-cheats/'],
  ['/products/mw4-cheats', '/products/mw4-cheats/'],
  ['/go/game-accounts', '/go/ugc/'],
  ['/go/game-accounts/', '/go/ugc/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
