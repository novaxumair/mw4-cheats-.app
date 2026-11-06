/**
 * Generate blog cover WebP width family from curated sources in .cursor/assets (or scripts/BLOG_IMAGE_SOURCES).
 * Run: node scripts/sync-blog-hero-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outDir = path.join(root, 'public', 'images', 'blog');
const widths = [320, 400, 512, 640, 960];

/** Prefer repo `scripts/blog-image-sources/*.webp`; else Cursor project assets. */
const assetsDir = (() => {
  const local = path.join(root, 'scripts', 'blog-image-sources');
  const localHasWebp =
    fs.existsSync(local) &&
    fs.readdirSync(local, { withFileTypes: true }).some((e) => e.isFile() && /\.webp$/i.test(e.name));
  if (localHasWebp) return local;

  const home = process.env.USERPROFILE || process.env.HOME || '';
  const candidates = [
    path.join(home, '.cursor', 'projects', 'c-Users-iamanigger-Desktop-website-mw4-cheat-app', 'assets'),
    path.join(root, '..', '..', '.cursor', 'projects', 'c-Users-iamanigger-Desktop-website-mw4-cheat-app', 'assets'),
  ];
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return null;
})();

if (!assetsDir) {
  console.warn(
    '[sync-blog-hero-images] Skipped: no source folder (scripts/blog-image-sources/ or .cursor/projects/.../assets). Using existing public/images/blog/.',
  );
  process.exit(0);
}

/** Curated gameplay stills in `scripts/blog-image-sources/gameplay-NN.webp` (27 files, cycle if more slugs) */
const GAMEPLAY_STILL_COUNT = 27;

const blogSlugsInOrder = [
  'modern-warfare-4-cheats-explained',
  'best-mw4-cheat-features-competitive',
  'mw4-aimbot-vs-soft-aim-safety',
  'mw4-esp-wallhack-guide-6v6-dmz',
  'mw4-triggerbot-setup-reaction-tuning',
  'mw4-radar-hack-uav-utility-guide',
  'mw4-loot-dmz-asset-esp-explained',
  'mw4-hwid-spoofer-guide-pc-bans',
  'how-to-fix-anti-cheat-hardware-bans-call-of-duty',
  'mw4-account-unban-ban-recovery-solutions',
  'mw4-stream-proof-overlay-content-creator-setup',
  'mw4-no-recoil-no-spread-mechanics',
  'mw4-custom-crosshair-visual-guide',
  'mw4-cheat-feature-comparison',
  'mw4-cheats-pc-installation-loader-guide',
  'mw4-cheats-faq',
  'mw4-cheat-troubleshooting-guide',
  'cod-anti-cheat-bypass-mechanics-explained',
  'botting-vs-private-cheats-modern-warfare-4',
  'mw4-config-management-6v6-vs-dmz',
  'free-mw4-cheats-vs-premium-private',
  'mw4-trainer-safety-loader-integrity',
  'mw4-weapon-meta-attachment-optimization',
  'mw4-safe-configuration-preset-sharing',
  'avoiding-detection-private-cheats-best-practices',
  'dma-cards-vs-software-cheats-mw4',
  'mw4-visibility-checks-bone-selection',
  'mw4-distance-capping-radar-optimization',
  'mw4-advanced-performance-fps-optimization',
  'mw4-season-update-compatibility-patch-day-safety',
  'mw4-map-callouts-tactical-guide',
  'mw4-weapon-recoil-attachment-tier-list',
  'mw4-unlockable-operators-weapon-blueprints-directory',
  'pc-shooter-hwid-ban-prevention-whitepaper',
  'mw4-update-season-patch-timeline',
];

const slugToSourceFile = Object.fromEntries(
  blogSlugsInOrder.map((slug, i) => {
    const n = String((i % GAMEPLAY_STILL_COUNT) + 1).padStart(2, '0');
    return [slug, `gameplay-${n}.webp`];
  }),
);

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const [slug, file] of Object.entries(slugToSourceFile)) {
    const input = path.join(assetsDir, file);
    if (!fs.existsSync(input)) {
      console.warn(`[sync-blog-hero-images] Missing source, skipping ${slug}: ${input}`);
      continue;
    }

    const base = path.join(outDir, slug);
    for (const w of widths) {
      const output = `${base}-${w}.webp`;
      await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
