import type { MetadataRoute } from 'next';
import articlesEn from '@/data/articles-en.json';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';

/**
 * Both language versions of every page are listed, each carrying hreflang
 * alternates pointing at its counterpart (en at the root, bg under /bg,
 * x-default → en). Article slugs are shared between the two languages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const localized = (
    path: string,
    rest: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>
  ): MetadataRoute.Sitemap => {
    const alternates = { languages: languageAlternates(path) };
    return [
      { url: path === '/' ? siteConfig.url : absoluteUrl(path), alternates, ...rest },
      { url: absoluteUrl(path === '/' ? '/bg' : `/bg${path}`), alternates, ...rest },
    ];
  };

  const articleUrls = articlesEn.flatMap((article) =>
    localized(`/blog/${article.id}`, {
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  );

  return [
    ...localized('/', {
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [absoluteUrl(siteConfig.ogImage)],
    }),
    ...localized('/blog', {
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    ...localized('/risks', {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }),
    ...localized('/terms', {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    }),
    ...localized('/privacy', {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    }),
    ...articleUrls,
  ];
}
