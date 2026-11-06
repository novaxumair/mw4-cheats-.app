import { t } from '../i18n';
import { PRODUCT_BASE, siteAssetUrl } from '../config/site';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  'mw4-private-suite': [
    'modern-warfare-4-cheats-explained',
    'mw4-esp-wallhack-guide-6v6-dmz',
    'mw4-cheat-feature-comparison',
    'mw4-cheats-pc-installation-loader-guide',
  ],
  'hwid-spoofer': [
    'mw4-hwid-spoofer-guide-pc-bans',
    'how-to-fix-anti-cheat-hardware-bans-call-of-duty',
    'mw4-cheat-troubleshooting-guide',
    'pc-shooter-hwid-ban-prevention-whitepaper',
  ],
  'game-accounts': [
    'mw4-account-unban-ban-recovery-solutions',
    'how-to-fix-anti-cheat-hardware-bans-call-of-duty',
    'mw4-cheats-faq',
  ],
  'skin-changer': [
    'mw4-unlockable-operators-weapon-blueprints-directory',
    'mw4-skin-changer-cosmetics-guide',
    'mw4-stream-proof-overlay-content-creator-setup',
  ],
};

const productBase = PRODUCT_BASE;

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Check build status',
    desc: 'Confirm the operator portal shows the PC build online before purchase—especially after a game or anti-cheat update.',
  },
  {
    num: '02',
    title: 'Choose your product',
    desc: 'Pick the private MW4 cheat, HWID tools, account recovery workspace, or skin changer. Review features on each product page first.',
  },
  {
    num: '03',
    title: 'Complete secure checkout',
    desc: 'Use Try Now or the product Buy button to open checkout. Keep your order email for portal access.',
  },
  {
    num: '04',
    title: 'Install with the guide',
    desc: 'Follow the operator portal and setup guide. Test conservative presets in a controlled session before public matches.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'The game and Ricochet anti-cheat receive frequent updates. Confirm module status in the operator portal before you purchase or launch. Overlay behavior can change after patches in menus, replays, and spectator views.';

const sharedLimitations =
  'Third-party software can violate publisher terms and lead to enforcement, including hardware or account bans. Risk is never zero. Compatibility and availability can change after game, anti-cheat, or Windows updates without notice.';

const mw4SystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: '64-bit Windows 10 or 11 with current updates.' },
  { icon: 'reqSteam', text: 'Modern Warfare 4 PC build per official requirements.' },
  { icon: 'reqSettings', text: 'Administrator access for loader setup when the guide requires it.' },
  { icon: 'reqWifi', text: 'Stable connection for portal updates and verification.' },
  { icon: 'reqCpu', text: 'Hardware that meets or exceeds published PC requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = siteAssetUrl('/images/mw4');
const spooferAssets = siteAssetUrl('/images/products/hwid-spoofer');
const ugcAssets = siteAssetUrl('/images/products/game-accounts');
const skinChangerAssets = siteAssetUrl('/images/products/skin-changer');

const galleryRaw = {
  gpMw4Esp: {
    src: `${gameplay}/asset-01.webp`,
    alt: 'Modern Warfare 4 cheat interface screenshot on PC',
    caption: 'Player ESP',
    captionDesc: 'Readable boxes and intel for 6v6 fights without flooding the screen.',
  },
  gpMw4Aim: {
    src: `${gameplay}/asset-08.webp`,
    alt: 'MW4 cheat menu and safety settings on desktop',
    caption: 'Aim tuning',
    captionDesc: 'Configurable aim circle and smooth acquisition—tune before ranked play.',
  },
  gpMw4Radar: {
    src: `${gameplay}/asset-03.webp`,
    alt: 'Modern Warfare gameplay screenshot',
    caption: '2D radar',
    captionDesc: 'Zoom and range controls so callouts stay legible.',
  },
  gpMw4Skin: {
    src: `${gameplay}/asset-05.webp`,
    alt: 'Call of Duty operator and loadout art',
    caption: 'Cosmetic preview',
    captionDesc: 'Preview skins and loadouts locally before applying.',
  },
  gpMw4Loot: {
    src: `${gameplay}/asset-06.webp`,
    alt: 'Call of Duty operator artwork',
    caption: 'Loot & DMZ layer',
    captionDesc: 'Contract and extract context when the mode calls for it.',
  },
  gpMw4Hwid: {
    src: `${gameplay}/asset-07.webp`,
    alt: 'Call of Duty operator scene',
    caption: 'Hardware workflow',
    captionDesc: 'Checklist-driven spoof and verify steps from the portal.',
  },
  gpMw4Accounts: {
    src: `${gameplay}/asset-02.webp`,
    alt: 'Modern Warfare gameplay moment',
    caption: 'Account status',
    captionDesc: 'Restriction type, timelines, and next actions in one view.',
  },
  /** HWID spoofer only — dedicated assets under /images/products/hwid-spoofer/ */
  gpSpooferPhoenixBanner: {
    src: `${spooferAssets}/phoenix-banner.png`,
    alt: 'HWID spoofer product banner with dark background and phoenix artwork',
    caption: 'Spoofer identity',
    captionDesc: 'Visual identity for the hardware recovery build—swap previews only, not in-game footage.',
  },
  gpSpooferHardwareIcon: {
    src: `${spooferAssets}/hardware-icon.png`,
    alt: 'Processor and gear line icon representing PC hardware tooling',
    caption: 'Hardware scope',
    captionDesc: 'Disk and network identifiers the workflow targets before you verify and reboot.',
  },
  gpSpooferCircuitChip: {
    src: `${spooferAssets}/circuit-chip.png`,
    alt: 'Stylized circuit board with a central chip for hardware ID recovery',
    caption: 'Identity layers',
    captionDesc: 'Motherboard-level context for why spoofing is staged, verified, and cold-rebooted.',
  },
  /** Game accounts / UGC workspace only */
  gpUgcWorkflowIcon: {
    src: `${ugcAssets}/ugc-workflow-icon.png`,
    alt: 'Gear and clock icon representing structured account recovery steps',
    caption: 'Fast-track workflow',
    captionDesc:
      'Appeal-ready timelines, status checks, and recovery steps the workspace walks through—preview art, not a live portal screen.',
  },
  /** Skin changer only */
  gpSkinChangerCrest: {
    src: `${skinChangerAssets}/skin-changer-crest.png`,
    alt: 'Metallic crest with Skin Changer lettering and weapon silhouettes',
    caption: 'Cosmetic toolkit',
    captionDesc:
      'Hero art for local operator and weapon skin preview—marketing graphic, not an in-game lobby capture.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'mw4-private-suite';
}

const productBodies: Record<string, ProductPage['body']> = {
  'mw4-private-suite': [
    { type: 'h2', text: 'Combat modules' },
    {
      type: 'p',
      text: 'Aimbot, triggerbot, player visuals, loot overlay, radar, and misc tools are grouped in the operator portal—tune distance caps, teammate filters, and stream-friendly modes before you queue.',
    },
    { type: 'h2', text: 'Modes' },
    {
      type: 'p',
      text: 'Maintain separate saved configs for 6v6 and large-map modes so overlays stay readable. Use the [feature comparison](/blog/mw4-cheat-feature-comparison/) when you need a module-by-module view.',
    },
  ],
  'hwid-spoofer': [
    { type: 'h2', text: 'When it fits' },
    {
      type: 'p',
      text: 'Use when fresh installs fail on one PC but work elsewhere after a hardware enforcement. Pair with backup and verification steps from the portal—not a replacement for account-level cases; see [game accounts](/products/mw4-cheats/game-accounts/) when restrictions are account-bound.',
    },
    { type: 'h2', text: 'Workflow' },
    {
      type: 'p',
      text: 'Restore point, compatibility scan, apply changes, cold reboot, then verify identifiers with the diff report before launching the game.',
    },
  ],
  'game-accounts': [
    { type: 'h2', text: 'What the tool does' },
    {
      type: 'p',
      text: 'The workspace helps detect restriction types, document cases, and run supported recovery flows where authorized. Outcomes depend on platform policy—nothing here bypasses publisher decisions.',
    },
    { type: 'h2', text: 'Pairing' },
    {
      type: 'p',
      text: 'Combine with [HWID Spoofer](/products/mw4-cheats/hwid-spoofer/) when hardware identity is part of the issue, and with the [private cheat](/products/mw4-cheats/mw4-private-suite/) only after you understand enforcement risk.',
    },
  ],
  'skin-changer': [
    { type: 'h2', text: 'Local preview' },
    {
      type: 'p',
      text: 'Preview operator and weapon cosmetics on your client, manage loadouts, and reset to defaults when you need a clean baseline.',
    },
    { type: 'h2', text: 'After updates' },
    {
      type: 'p',
      text: 'Re-check compatibility after major patches—see [season update compatibility](/blog/mw4-season-update-compatibility-patch-day-safety/).',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  'mw4-private-suite': {
    images: slide('gpMw4Esp', 'gpMw4Aim', 'gpMw4Loot'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'Aim circle you set around the crosshair; smooth onto the operator (not a snap)',
      'Head / upper chest / closest bone selection',
      'Visibility check: no tracking through solid cover',
      'Distance cap and teammate skip; skip downed operators when enabled',
      'Draw the aim circle for calibration',
      'Triggerbot: fire when crosshair is on an operator; short delay',
      'Triggerbot: head or upper chest; same visibility rules as aim; hold key',
      'Player visuals: box or corner box; skeleton; health; armor plates; distance',
      'Name tags optional; weapon-in-hand; snapline; quieter color behind cover',
      'Squad color; distance cap so 6v6 stays readable',
      'Loot: cash and bags in large-map mode; armor and ammo; contracts; extracts; vehicles where applicable; layer off in 6v6',
      'Radar: 2D radar; operator markers; range; zoom',
      'Misc: no recoil; no spread; stream-proof overlay; two saved configs (6v6 + large map); custom crosshair; PC build',
    ],
    overview: {
      title: 'Private MW4 cheat for PC',
      paragraphs: [
        'The main cheat bundles aim assistance, trigger assistance, player visuals, loot intelligence, radar, and misc combat tools in one operator workflow. Everything is tuned from the portal with humanized defaults—strong when you need it, quiet when you do not.',
        'Use separate profiles for 6v6 and large-map modes so overlays stay clean. Check build status after every patch before you buy or launch.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpSpooferPhoenixBanner', 'gpSpooferHardwareIcon', 'gpSpooferCircuitChip'),
    goodToKnow:
      'Create a restore point and run the compatibility scan before changing identifiers. Verify spoof results after a full cold reboot using the portal diff report.',
    limitations:
      'Spoofing does not fix every account-level restriction. Do not stack conflicting tools. Shared or locked-down PCs may be unsuitable. Driver-level changes carry system risk.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal guide before launching the game after changes.' },
      { icon: 'reqWifi', text: 'Stable connection for verification and support.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Recovery support channel',
      'Persistent HWID spoofing with reporting',
      'Multi-component spoofing (board, disk, UUID, MAC)',
      'Reboot persistence where supported',
      'Automatic system detection',
      'Restore and recovery guidance',
      'Spoofing status checker',
    ],
    overview: {
      title: 'Hardware identity recovery',
      paragraphs: [
        'The spoofer package focuses on disk and network identifiers with verification—not guesswork. Follow the checklist, confirm changes, then re-test installs with conservative game settings.',
        'Read [MW4 HWID spoofer guide](/blog/mw4-hwid-spoofer-guide-pc-bans/) before you change anything.',
      ],
    },
  },
  'game-accounts': {
    images: slide('gpUgcWorkflowIcon'),
    goodToKnow:
      'Gather order email, platform notices, and screenshots before opening a case. The workspace organizes steps—it does not guarantee restoration.',
    limitations:
      'Permanent or policy-driven restrictions may not be reversible. Results depend on case type and platform response time.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email from checkout.' },
      { icon: 'reqShieldAccount', text: 'Account identifiers and restriction notices when available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for status checks and support.' },
    ],
    fullFeatures: [
      'Multi-title and platform awareness in the workspace',
      'Automatic ban or restriction detection where supported',
      'Account restriction removal workflows where authorized',
      'Permanent versus temporary restriction labeling',
      'One-click launch for supported recovery steps',
      'Live status verification after actions',
      'Detailed error reporting for unsupported cases',
      'Automatic installed-title detection where available',
      'Secure handling: minimize credential collection',
    ],
    overview: {
      title: 'Account restriction workspace',
      paragraphs: [
        'Use this when you need structured detection, documentation, and supported remediation—not a vague “instant unban” promise.',
        'Pair reading with [account unban and recovery](/blog/mw4-account-unban-ban-recovery-solutions/) before checkout.',
      ],
    },
  },
  'skin-changer': {
    images: slide('gpSkinChangerCrest'),
    goodToKnow:
      'Cosmetic previews are for your local client. Other players may still see default inventory depending on mode and policy.',
    limitations:
      'Does not grant store purchases. Updates can invalidate presets until the portal ships a new profile.',
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'Multi-title support from one interface with profiles',
      'Centralized skin library',
      'Live preview before apply',
      'One-click apply for supported items',
      'Custom import for compatible assets',
      'Loadout manager with multiple presets',
      'Restore and reset to defaults',
      'Automatic install detection where available',
      'Post-update compatibility checks',
      'Preset export and import',
    ],
    overview: {
      title: 'Cosmetic preview and loadouts',
      paragraphs: [
        'Preview operators and weapon skins, manage loadouts, and roll back when you need the default look.',
        'See [unlockables directory](/blog/mw4-unlockable-operators-weapon-blueprints-directory/) for planning—not every item previews every season.',
      ],
    },
  },
};

function buildProductPages(): ProductPage[] {
  return t.products.items.map((product) => {
    const slug = slugFromHref(product.href);
    const content = productContent[slug];
    const isPrimary = slug === 'mw4-private-suite';
    return {
      slug,
      kind: isPrimary ? 'tier' : 'utility',
      badge: product.badge,
      category: product.category,
      tier: isPrimary ? 'Private' : undefined,
      name: isPrimary ? 'Cheat' : product.title,
      title: product.title,
      subtitle: product.subtitle,
      desc: product.desc,
      features: product.features,
      more: product.more,
      variant: isPrimary ? 'popular' : undefined,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(product.title),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      body: productBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

export const productPages: ProductPage[] = buildProductPages();

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides = slide(
  'gpMw4Esp',
  'gpMw4Aim',
  'gpMw4Radar',
  'gpMw4Skin',
  'gpMw4Loot',
  'gpMw4Hwid',
  'gpMw4Accounts',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'Private Modern Warfare 4 cheats for PC, HWID tooling, account restriction workflows, and cosmetic preview tools.',
  buyUrl: checkoutPath('mw4'),
};
