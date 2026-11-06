import { siteAssetUrl } from '../config/site';

const RASTER_EXT = /\.(png|jpe?g|webp)$/i;
/**
 * Width-sized WebPs from `scripts/optimize-images.mjs` (must stay in sync with that script).
 * Do not use `-(\d+)` — filenames like `asset-01.webp` would false-match and break srcset.
 */
const SIZED_WEBP_RE = /-(320|400|512|640|960)\.webp$/i;

/** 400w covers ~330px card slots at 1x; 640w covers 2x retina. */
export const CARD_IMAGE_WIDTHS = [400, 640] as const;
export const CARD_IMAGE_SIZES = '(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw';
/** 512w matches hero slider display (~487px at 1x); 640/960 for larger viewports and retina. */
export const HERO_IMAGE_WIDTHS = [512, 640, 960] as const;
export const HERO_IMAGE_SIZES = '(min-width: 1024px) 490px, 100vw';
/** Thumbs ~148px CSS; 320w covers 2x DPR without pulling 640/960. */
export const THUMB_IMAGE_WIDTHS = [320, 400] as const;
export const DEFAULT_IMAGE_WIDTHS = [640, 960] as const;

export function stripRasterExt(src: string): string {
  return src.replace(RASTER_EXT, '');
}

export function webpSrc(src: string, width: number): string {
  let out: string;
  if (/\.webp$/i.test(src)) {
    if (SIZED_WEBP_RE.test(src)) {
      out = src.replace(SIZED_WEBP_RE, `-${width}.webp`);
    } else {
      /** Already a single deliverable `.webp` (e.g. hero assets) — no `-400.webp` siblings in /public. */
      out = src;
    }
  } else {
    out = `${stripRasterExt(src)}-${width}.webp`;
  }
  return siteAssetUrl(out);
}

export function responsiveSrcSet(src: string, widths: readonly number[] = DEFAULT_IMAGE_WIDTHS): string {
  if (/\.webp$/i.test(src) && !SIZED_WEBP_RE.test(src)) {
    const w = widths[widths.length - 1] ?? 960;
    return `${siteAssetUrl(src)} ${w}w`;
  }
  return widths.map((width) => `${webpSrc(src, width)} ${width}w`).join(', ');
}

/** Smallest variant — used as img src so Lighthouse and no-srcset clients get the right size. */
export function defaultWebpSrc(src: string, widths: readonly number[]): string {
  if (/\.webp$/i.test(src) && !SIZED_WEBP_RE.test(src)) {
    return siteAssetUrl(src);
  }
  return webpSrc(src, widths[0] ?? 640);
}

/** True when `.webp` should be a single `<img src>` (no `-640.webp` width family). */
export function isSingleFileWebp(src: string): boolean {
  return /\.webp$/i.test(src) && !SIZED_WEBP_RE.test(src);
}

/**
 * Use a plain `<img src>` (no `<picture>` WebP srcset). PNG/JPEG in /public never get the
 * `-320.webp` pipeline unless listed in optimize-images — product and one-off assets rely on this.
 */
export function isDirectRasterSrc(src: string): boolean {
  return isSingleFileWebp(src) || /\.(png|jpe?g)$/i.test(src);
}
