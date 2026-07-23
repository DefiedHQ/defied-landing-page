import articlesEn from '@/data/articles-en.json';
import articlesBg from '@/data/articles-bg.json';
import { siteConfig, absoluteUrl } from '@/lib/seo';
import { localePath, type Lang } from '@/lib/i18n';

const CHANNEL: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Defied Money Blog',
    description: 'Articles, guides, and news about stablecoins, DeFi, and self-custody from Defied Money.',
  },
  bg: {
    title: 'Defied Money Блог',
    description: 'Статии, ръководства и новини за стейбълкойни, DeFi и самостоятелно съхранение от Defied Money.',
  },
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** RSS 2.0 feed for one language tree. Articles are newest-first in the data. */
export function buildRssFeed(lang: Lang): string {
  const articles = lang === 'bg' ? articlesBg : articlesEn;
  const channel = CHANNEL[lang];
  const blogUrl = absoluteUrl(localePath(lang, '/blog'));
  const selfUrl = absoluteUrl(localePath(lang, '/feed.xml'));
  const lastBuildDate = new Date(`${articles[0].date}T00:00:00+00:00`).toUTCString();

  const items = articles
    .map((a) => {
      const url = absoluteUrl(localePath(lang, `/blog/${a.id}`));
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
    <title>${escapeXml(channel.title)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>${lang}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${absoluteUrl(siteConfig.logo)}</url>
      <title>${escapeXml(channel.title)}</title>
      <link>${blogUrl}</link>
    </image>
${items}
  </channel>
</rss>
`;
}

export function rssResponse(lang: Lang): Response {
  return new Response(buildRssFeed(lang), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
