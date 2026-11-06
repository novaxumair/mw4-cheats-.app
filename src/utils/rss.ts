import { blogPosts } from '../data/blog';
import { t } from '../i18n';
import { RSS_FEED_PATH, SITE_ORIGIN, absoluteAssetUrl, canonicalUrl } from '../config/seo';
import { parseBlogDate } from './schema';
import { blogPostPath } from './path';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildRssFeed(): string {
  const feedUrl = `${SITE_ORIGIN}${RSS_FEED_PATH}`;
  const items = blogPosts
    .map((post) => {
      const link = canonicalUrl(blogPostPath(post.slug));
      const pubDate = new Date(parseBlogDate(post.date)).toUTCString();
      const imageUrl = absoluteAssetUrl(post.image);
      const enclosureType = /\.webp$/i.test(post.image) ? 'image/webp' : 'image/png';
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.desc)}</description>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${escapeXml(imageUrl)}" type="${enclosureType}" />
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${t.site.name} Blog`)}</title>
    <link>${SITE_ORIGIN}/blog/</link>
    <description>${escapeXml(`MW4 cheat guides, patch notes, and PC setup walkthroughs from ${t.site.domain}.`)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
