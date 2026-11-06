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

/** slug → source filename in assetsDir */
const slugToSourceFile = {
  'modern-warfare-4-cheats-explained': 'this-is-how-you-use-mw4-cheats-never-get-banned-in-701ce8cc-67ea-4490-ba9d-8653e703880d.webp',
  'best-mw4-cheat-features-competitive': 'modernwarfare6-5a86eb26-42de-43de-81be-af1994e29668.webp',
  'mw4-aimbot-vs-soft-aim-safety': 'eefan-my-aim-got-me-banned-in-modern-warfare-4-b1k-b9a7de51-2a0c-438f-bea7-b4768713cc4c.webp',
  'mw4-esp-wallhack-guide-6v6-dmz': 'modern-warfare-4-match-esp-960-f7c9d484-b349-441b-bf6b-75248fa20c25.webp',
  'mw4-triggerbot-setup-reaction-tuning': 'eefan-my-aim-got-me-banned-in-modern-warfare-4-b1k-9cd4de5a-3844-45b5-baa9-8dbe7fb11ddb.webp',
  'mw4-radar-hack-uav-utility-guide': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-5c7c1071-0e75-4d0a-a44c-8912b2a9f82c.webp',
  'mw4-loot-dmz-asset-esp-explained': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-6e5ba7a9-82b9-466c-aaa1-9e5a19116eff.webp',
  'mw4-hwid-spoofer-guide-pc-bans': 'eefan-my-aim-got-me-banned-in-modern-warfare-4-b1k-360ed76f-bac3-474b-a77d-b6da75bb73c5.webp',
  'how-to-fix-anti-cheat-hardware-bans-call-of-duty':
    'eefan-my-aim-got-me-banned-in-modern-warfare-4-b1k-d3682c4d-269b-4c07-bd99-f14c8d19aab5.webp',
  'mw4-account-unban-ban-recovery-solutions':
    'eefan-my-aim-got-me-banned-in-modern-warfare-4-b1k-d3682c4d-269b-4c07-bd99-f14c8d19aab5.webp',
  'mw4-stream-proof-overlay-content-creator-setup': 'arcane-cod-s3-1-cf09ecc5-3be2-4157-88da-307c5052dc8b.webp',
  'mw4-no-recoil-no-spread-mechanics': 'modernwarfare7-22c9d7c7-8fd7-4308-974d-79bde2851701.webp',
  'mw4-custom-crosshair-visual-guide': 'arcane-cod-s2-1-c4852442-3bea-4467-9a2b-bf57901f112b.webp',
  'mw4-cheat-feature-comparison': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-2c9c194e-cbaf-43c5-985a-2fe3a674a437.webp',
  'mw4-cheats-pc-installation-loader-guide': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-30951909-97d8-4cc8-90df-3cd6e2c35878.webp',
  'mw4-cheats-faq': 'saifskylz-this-is-how-you-use-mw4-cheats-never-get-68b7d8bf-66cd-4141-acbe-0abeb7957a5a.webp',
  'mw4-cheat-troubleshooting-guide': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-d2f805ef-e5d7-4ec0-b415-f4e80ec6424f.webp',
  'cod-anti-cheat-bypass-mechanics-explained': 'whosimmortal-modern-warfare-4-major-anti-cheat-upd-d277006f-b80d-4afb-97be-f60055b0c735.webp',
  'botting-vs-private-cheats-modern-warfare-4': 'the-rick-modern-warfare-4-is-fcking-pathetic-this--b1119573-bce8-4c40-92ca-7991f2757751.webp',
  'mw4-config-management-6v6-vs-dmz': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-69f46ede-10c1-472d-aa1c-71abc6df6bff.webp',
  'free-mw4-cheats-vs-premium-private': 'the-rick-modern-warfare-4-is-fcking-pathetic-this--a336bfcd-c574-4d28-ae46-6b57f4014c3e.webp',
  'mw4-trainer-safety-loader-integrity': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-00da1af4-f6bb-412a-b62d-39b07d86a91d.webp',
  'mw4-weapon-meta-attachment-optimization': 'modernwarfare7-22c9d7c7-8fd7-4308-974d-79bde2851701.webp',
  'mw4-safe-configuration-preset-sharing': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-10e2c064-7c1c-45f5-a3a3-5bdaa4a9138b.webp',
  'avoiding-detection-private-cheats-best-practices':
    'the-rick-modern-warfare-4-is-fcking-pathetic-this--b9fb0656-63b6-4222-a240-6e8cac97c31d.webp',
  'dma-cards-vs-software-cheats-mw4': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-10e2c064-7c1c-45f5-a3a3-5bdaa4a9138b.webp',
  'mw4-visibility-checks-bone-selection': 'modern-warfare-4-match-esp-960-f7c9d484-b349-441b-bf6b-75248fa20c25.webp',
  'mw4-distance-capping-radar-optimization': 'trainerg0dx-call-of-duty-modern-warfare-4-2026-che-5c7c1071-0e75-4d0a-a44c-8912b2a9f82c.webp',
  'mw4-advanced-performance-fps-optimization': 'modernwarfare6-5a86eb26-42de-43de-81be-af1994e29668.webp',
  'mw4-season-update-compatibility-patch-day-safety':
    'whosimmortal-modern-warfare-4-major-anti-cheat-upd-23b6c976-86bb-411b-8b34-fb4ff6688612.webp',
  'mw4-map-callouts-tactical-guide': 'arcane-cod-s1-1-2c47ac90-04c5-4674-b16e-1c9db2802b23.webp',
  'mw4-weapon-recoil-attachment-tier-list': 'modernwarfare7-22c9d7c7-8fd7-4308-974d-79bde2851701.webp',
  'mw4-unlockable-operators-weapon-blueprints-directory': 'arcane-cod-s1-1-2c47ac90-04c5-4674-b16e-1c9db2802b23.webp',
  'pc-shooter-hwid-ban-prevention-whitepaper': 'eefan-my-aim-got-me-banned-in-modern-warfare-4-b1k-360ed76f-bac3-474b-a77d-b6da75bb73c5.webp',
  'mw4-update-season-patch-timeline': 'whosimmortal-modern-warfare-4-major-anti-cheat-upd-23b6c976-86bb-411b-8b34-fb4ff6688612.webp',
};

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
