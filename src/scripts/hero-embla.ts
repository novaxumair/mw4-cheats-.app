export const HERO_AUTOPLAY_MS = 4800;

const DESKTOP_MQ = '(min-width: 1024px)';

type EmblaApi = {
  selectedScrollSnap: () => number;
  scrollTo: (n: number, jump?: boolean) => void;
  on: (event: string, cb: () => void) => void;
};

type AutoplayPlugin = {
  stop: () => void;
  play: () => void;
};

type CarouselInstance = {
  api: EmblaApi;
  reInit: (options?: Record<string, unknown>, plugins?: unknown[]) => void;
};

function restartProgress(progressEl: HTMLElement) {
  progressEl.style.animation = 'none';
  void progressEl.offsetWidth;
  progressEl.style.animation = `hero-embla-progress ${HERO_AUTOPLAY_MS}ms linear forwards`;
}

function bindHeroDots(wrapper: HTMLElement, api: EmblaApi, autoplay: AutoplayPlugin) {
  const dotsRoot = wrapper.querySelector('[data-hero-embla-dots]');
  if (!dotsRoot) return;

  const dots = Array.from(dotsRoot.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));

  const syncProgress = () => {
    const index = api.selectedScrollSnap();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dots.forEach((dot, i) => {
      const progress = dot.querySelector<HTMLElement>('[data-hero-embla-progress]');
      if (!progress) return;

      progress.style.animation = 'none';
      progress.style.width = i === index && reducedMotion ? '100%' : '0%';

      if (i === index && !reducedMotion) {
        restartProgress(progress);
      }
    });
  };

  const setActive = () => {
    const index = api.selectedScrollSnap();
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.dataset.active = active ? 'true' : 'false';
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.tabIndex = active ? 0 : -1;
    });
    syncProgress();
  };

  dots.forEach((dot) => {
    const index = Number(dot.getAttribute('data-hero-embla-dot'));
    dot.addEventListener('click', () => {
      api.scrollTo(index, true);
      autoplay.stop();
    });
  });

  api.on('select', setActive);
  api.on('reInit', setActive);
  setActive();
}

/** Embla measures slides on init; hidden (lg:block) roots often have width 0 until layout resolves. */
function attachReinitWhenSized(carouselRoot: HTMLElement, instance: CarouselInstance) {
  const viewport = carouselRoot.querySelector<HTMLElement>('[data-sw-carousel-viewport]');
  if (!viewport) return;

  let raf = 0;
  const scheduleReinit = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      raf = 0;
      instance.reInit();
    });
  };

  const ro = new ResizeObserver((entries) => {
    const w = entries[0]?.contentRect.width ?? 0;
    if (w < 4) return;
    scheduleReinit();
  });
  ro.observe(viewport);
}

async function initHeroCarousels(root: ParentNode = document) {
  const nodes = [...root.querySelectorAll<HTMLElement>('[data-hero-embla]')].filter(
    (node) => node.dataset.heroEmblaReady !== 'true',
  );
  if (!nodes.length) return;

  const [{ createCarousel }, { default: Autoplay }] = await Promise.all([
    import('@starwind-ui/runtime/carousel'),
    import('embla-carousel-autoplay'),
  ]);

  nodes.forEach((carouselRoot) => {
    carouselRoot.dataset.heroEmblaReady = 'true';

    const wrapper = carouselRoot.closest('[data-hero-embla-wrap]');
    if (!wrapper) return;

    const autoplay = Autoplay({
      delay: HERO_AUTOPLAY_MS,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    });

    const instance = createCarousel(carouselRoot, {
      opts: { loop: true, align: 'start', duration: 20 },
      plugins: [autoplay],
    });

    bindHeroDots(wrapper as HTMLElement, instance.api as EmblaApi, autoplay);
    attachReinitWhenSized(carouselRoot, instance);

    const pauseWhenHidden = () => {
      if (document.hidden) autoplay.stop();
      else autoplay.play();
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !document.hidden) {
          instance.reInit();
          autoplay.play();
        } else autoplay.stop();
      },
      { threshold: 0.15 },
    );
    io.observe(carouselRoot);
  });
}

export function setupHeroEmbla(deferInit = false) {
  const schedule =
    deferInit && typeof window !== 'undefined'
      ? (fn: () => void) => {
          if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(() => fn(), { timeout: 2500 });
          } else {
            window.setTimeout(fn, 1);
          }
        }
      : (fn: () => void) => {
          fn();
        };

  const run = () => {
    void initHeroCarousels();
  };

  schedule(run);

  window.matchMedia(DESKTOP_MQ).addEventListener('change', () => schedule(run));

  document.addEventListener('astro:page-load', () => schedule(run));
}
