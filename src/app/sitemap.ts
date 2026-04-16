import type { MetadataRoute } from 'next';
import articles from '@/data/articles-en.json';
import { siteConfig, absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const articleUrls = articles.map((article) => ({
    url: absoluteUrl(`/blog/${article.id}`),
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
{
      url: absoluteUrl('/risks'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/terms'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: absoluteUrl('/privacy'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...articleUrls,
  ];
}
