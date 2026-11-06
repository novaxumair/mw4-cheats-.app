import type { IconName } from '../components/icons/types';
import { blogPostPath, normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'combat'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const primaryCheat = link('MW4 Private Cheat', productPath('mw4-private-suite'));
const productsHub = link('MW4 products', ROUTES.products);
const hwid = link('HWID Spoofer', productPath('hwid-spoofer'));
const accounts = link('Game accounts workspace', productPath('game-accounts'));
const skin = link('Skin changer', productPath('skin-changer'));
const faqPage = link('full FAQ', ROUTES.faq);
const blog = link('blog guides', ROUTES.blog);
const supportPage = link('support', ROUTES.support);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if the MW4 loader is online?',
    a: a('Use the operator portal status area after checkout. Do not queue on patch night until the build shows compatible.'),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a('Checkout unlocks portal access and download steps from the partner flow. Follow the guide before opening Modern Warfare 4.'),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party MW4 tools?',
    a: a('Yes—violating publisher or anti-cheat rules can lead to account or hardware enforcement. You accept all risk.'),
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platform is supported?',
    a: a('Guides and products here target the Windows PC build. Consoles are out of scope.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move access to a new PC?',
    a: a('Depends on your license terms in the portal—open a ticket with your order email and both machine details.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are the four products listed?',
    a: `${productsHub} lists the private cheat, ${hwid}, ${accounts}, and ${skin} with separate checkout paths.`,
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is MW4 ESP?',
    a: `Player ESP draws boxes, plates, distance, and optional skeletons. It is an information overlay—${primaryCheat} covers the full visual stack.`,
    scopes: ['mw4-private-suite'],
  },
  {
    id: 'esp-vs-aim',
    topic: 'combat',
    icon: 'faqEspVsScripts',
    q: 'How is ESP different from aim assist?',
    a: `ESP shows positions; aim and trigger modules on ${primaryCheat} assist gunfire when enabled. You can tune visuals-only presets in the portal.`,
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Will OBS capture my overlay?',
    a: a('Use stream-proof or capture-safe modes from the portal and test with a local recording before broadcasting.'),
  },
  {
    id: 'undetected',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Do you guarantee undetected software?',
    a: a('No. Status is always point-in-time. If modules show maintenance or testing, stop and wait for confirmation.'),
  },
  {
    id: 'hwid-when',
    topic: 'products',
    icon: 'faqHwidWhen',
    q: 'When do I need the HWID Spoofer?',
    a: `Use ${hwid} when fresh installs fail on one PC but work elsewhere due to hardware enforcement—not for every account-only case; read ${accounts} for restriction workflows.`,
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'accounts-what',
    topic: 'products',
    icon: 'faqUgcWhat',
    q: 'What does the game accounts workspace do?',
    a: `${accounts} helps detect restriction types, organize appeals, and run supported workflows where authorized—outcomes still depend on the platform.`,
    scopes: ['game-accounts'],
  },
  {
    id: 'skin-changer',
    topic: 'products',
    icon: 'faqSkinChanger',
    q: 'Does the skin changer change my inventory server-side?',
    a: `${skin} focuses on local preview and presets. Other players may still see default items depending on mode and enforcement.`,
    scopes: ['skin-changer'],
  },
  {
    id: 'patch-night',
    topic: 'safety',
    icon: 'faqVacUpdate',
    q: 'What should I do on patch day?',
    a: a('Re-read portal status, reload configs, and avoid aggressive presets until compatibility is announced.'),
  },
  {
    id: 'compare-products',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'How do the four MW4 products differ?',
    a: `${primaryCheat} is the combat cheat. ${hwid} focuses on hardware identifiers. ${accounts} handles restriction workflows. ${skin} is cosmetic preview—read each page before checkout.`,
  },
  {
    id: 'buy-path',
    topic: 'plans',
    icon: 'faqBlogSetup',
    q: 'Where do “buy mw4 cheats” CTAs go?',
    a: `Try Now uses the same path as ${primaryCheat}—/go/mw4/. Other products link to their own checkout routes from their pages.`,
  },
  {
    id: 'keyword-clusters',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Why are some keywords only on the blog?',
    a: `We keep transactional phrases on ${productsHub} and informational clusters (for example “${link('dma cards vs software', '/blog/dma-cards-vs-software-cheats-mw4/')}”) on articles to avoid cannibalization.`,
  },
  {
    id: 'faq-more',
    topic: 'blog',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `This landing section highlights pre-purchase questions. Open the ${faqPage} for every topic or browse ${blog} for long-form guides.`,
  },
];

/** FAQs for product detail pages — scoped entries match the product slug; unscoped entries apply broadly. */
export function getProductFaqs(slug: string, _kind: 'tier' | 'utility'): SiteFaqItem[] {
  return siteFaqs
    .filter((f) => !f.scopes?.length || f.scopes.includes(slug))
    .slice(0, 12);
}

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'ban-risk', 'platforms', 'license-move', 'products-page'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Filter combat, ESP, safety, products, setup, and blog topics.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'combat',
  'esp',
  'safety',
  'products',
  'blog',
  'setup',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) {
      topics.push(topic);
    }
  }
  return topics;
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: [
    {
      id: 'blog-setup-private',
      topic: 'blog',
      icon: 'faqBlogSetup',
      q: 'Should I test in a private session first?',
      a: a('Yes. Load conservative presets, verify overlays, then move to public playlists.'),
    },
  ],
  Features: [
    {
      id: 'blog-features-compare',
      topic: 'blog',
      icon: 'faqBlogSetup',
      q: 'Where do modules compare side by side?',
      a: `${primaryCheat} lists full features; see the feature comparison article linked from product pages.`,
    },
  ],
  Safety: [
    {
      id: 'blog-safety-status',
      topic: 'blog',
      icon: 'faqBlogSecVac',
      q: 'Does this article guarantee safety?',
      a: a('No. Articles explain mechanics—portal status is always the authority before launch.'),
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetup',
      q: 'What if my loader errors?',
      a: a('Capture the exact message, Windows build, and MW4 client version—then contact support with your order email.'),
    },
  ],
  Troubleshooting: [
    {
      id: 'blog-trouble-conflict',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Could other software interfere?',
      a: a('Yes. Overlay, capture, and security tools can clash—follow the troubleshooting guide and disable extras while testing.'),
    },
  ],
  Updates: [
    {
      id: 'blog-updates-season',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Do presets survive seasonal updates?',
      a: a('Expect to rebuild or import new portal presets after balance or anti-cheat changes.'),
    },
  ],
};

function defaultBlogFaqs(slug: string): SiteFaqItem[] {
  const thisGuide = link('this guide', blogPostPath(slug));
  return [
    {
      id: 'blog-default-1',
      topic: 'blog',
      icon: 'faqBlogDefault1',
      q: 'Are blog guides official documentation?',
      a: `Articles explain workflows and link to ${primaryCheat} and ${productsHub}. Product pages define what checkout includes.`,
    },
    {
      id: 'blog-default-2',
      topic: 'blog',
      icon: 'faqBlogDefault2',
      q: 'Need help applying this guide?',
      a: `Contact ${supportPage} with your order email, Windows build, and a link to ${thisGuide}.`,
    },
    {
      id: 'blog-default-3',
      topic: 'blog',
      icon: 'faqBlogDefault3',
      q: 'Will these settings work after the next update?',
      a: a('Re-check portal status after every patch—reload configs instead of copying old sliders.'),
    },
  ];
}

export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('esp') || slug.includes('wallhack') || slug.includes('visibility')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which product covers ESP from this article?',
      a: `${primaryCheat} includes player visuals and related tuning.`,
    });
  }
  if (slug.includes('aimbot') || slug.includes('soft-aim') || slug.includes('trigger')) {
    slugHints.push({
      id: 'blog-slug-combat',
      topic: 'combat',
      icon: 'faqBlogSlugScripts',
      q: 'Where are aim and trigger modules?',
      a: `${primaryCheat} lists aim circle, smoothing, trigger timing, and bone selection in one portal stack.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('spoof') || slug.includes('hardware-ban')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Is this article a substitute for the spoofer product?',
      a: `Guides explain concepts—${hwid} is the dedicated SKU with tooling and verification.`,
    });
  }
  if (slug.includes('account') || slug.includes('unban') || slug.includes('ban-recovery')) {
    slugHints.push({
      id: 'blog-slug-account',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Does the blog replace the account workspace?',
      a: `${accounts} covers structured workflows; articles only document what to expect.`,
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs(slug)].slice(0, 8);
}
