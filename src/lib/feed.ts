import articlesEn from '@/data/articles-en.json';
import { siteConfig, absoluteUrl } from '@/lib/seo';

const CHANNEL = {
  title: 'Defied Money Blog',
  description: 'Articles, guides, and news about stablecoins, DeFi, and self-custody from Defied Money.',
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** RSS 2.0 feed for the English site. Articles are newest-first in the data. */
export function buildRssFeed(): string {
  const blogUrl = absoluteUrl('/blog');
  const selfUrl = absoluteUrl('/feed.xml');
  const lastBuildDate = new Date(`${articlesEn[0].date}T00:00:00+00:00`).toUTCString();

  const items = articlesEn
    .map((a) => {
      const url = absoluteUrl(`/blog/${a.id}`);
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.date}T00:00:00+00:00`).toUTCString()}</pubDate>
      <category>${escapeXml(a.category)}</category>
      <description>${escapeXml(a.excerpt)}</description>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(CHANNEL.title)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(CHANNEL.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${absoluteUrl(siteConfig.logo)}</url>
      <title>${escapeXml(CHANNEL.title)}</title>
      <link>${blogUrl}</link>
    </image>
${items}
  </channel>
</rss>
`;
}

export function rssResponse(): Response {
  return new Response(buildRssFeed(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
