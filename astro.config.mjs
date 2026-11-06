import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://mw4cheat.app',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/mw4-cheats/',
    '/cheats/lite/': '/products/mw4-cheats/',
    '/cheats/pro/': '/products/mw4-cheats/',
    '/cheats/elite/': '/products/mw4-cheats/',
    '/cheats/compare/': '/blog/mw4-cheat-feature-comparison/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
