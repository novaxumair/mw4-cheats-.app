/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Cheats – Read the guides, check status after | MW4 Cheat',
    description:
      'MW4 cheats for PC at mw4cheat.app: a private cheat with aimbot, ESP, and radar, plus an HWID spoofer, account tools, and a skin changer. See mw4cheat.app.',
  },
  '/products/mw4-cheats/': {
    title: 'MW4 Cheats for Sale | Cheat, Spoofer & Skins | MW4 Cheat',
    description:
      'Shop MW4 cheats on mw4cheat.app. The private cheat, HWID spoofer, account workspace, and skin changer each have their own page and checkout.',
  },
  '/products/mw4-cheats/utilities/': {
    title: 'MW4 Cheat Utilities | HWID, Accounts & Skins | MW4 Cheat',
    description:
      'Compare MW4 cheat utilities: HWID spoofer for a hardware ban, account tools for an appeal, and a skin changer for local camo preview only. See mw4cheat.app.',
  },
  '/blog/': {
    title: 'Guides – and what to do on patch day before you queue | MW4 Cheat',
    description:
      'MW4 cheat guides for PC: aimbot versus soft aim, ESP and radar, HWID bans, loader setup, and what to do on patch day before you queue. See mw4cheat.app.',
  },
  '/forum/': {
    title: 'Forum – Players answer each other on ESP | MW4 Cheat',
    description:
      'MW4 cheats forum on mw4cheat.app: players answer on ESP, aim, radar, bans, and patch day; moderators fix bad advice. Forum threads stay short and practical.',
  },
  '/faq/': {
    title: 'MW4 Cheats FAQ | PC Setup, Bans & Products | Cheat',
    description:
      'FAQ for MW4 cheats: Secure Boot, PC-only support, ban risk, the four products, loader status, and where checkout starts on mw4cheat.app. See mw4cheat.app.',
  },
  '/terms/': {
    title: 'Terms & Conditions | MW4 Cheats at mw4cheat.app | MW4 Cheat',
    description:
      'Terms for using mw4cheat.app, the MW4 cheats guides, and linked checkout. Read the purchase rules before you buy a cheat, spoofer, or utility.',
  },
  '/privacy/': {
    title: 'Privacy Policy | MW4 Cheats at mw4cheat.app | Cheat',
    description:
      'Privacy: How mw4cheat.app handles analytics, cookies, and messages you send about MW4 cheats, orders, and help tickets. No extra accounts are created here.',
  },
  '/about/': {
    title: 'Support – MW4 Cheat publishes PC guides and four products | MW4 Cheat',
    description:
      'Support: MW4 Cheat publishes PC guides and four products for Modern Warfare 4: a private cheat, HWID spoofer, account workspace, and skin changer.',
  },
  '/support/': {
    title: 'MW4 Cheats Support | Loader, Orders & Access | MW4 Cheat',
    description:
      'Support for MW4 cheats on mw4cheat.app: checkout problems, loader errors, and portal access. Include your order email and the exact error text.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
