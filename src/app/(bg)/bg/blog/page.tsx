import type { Metadata } from 'next';
import { ResourcesPage } from '@/components/ResourcesPage';
import { JsonLd } from '@/components/seo/JsonLd';
import articles from '@/data/articles-bg.json';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';
import bg from '@/locales/bg.json';

export const metadata: Metadata = {
  title: bg.meta.blogTitle,
  description: bg.meta.blogDescription,
  openGraph: {
    title: `${bg.meta.blogTitle} | Defied Money`,
    description: bg.meta.blogDescription,
    url: absoluteUrl('/bg/blog'),
    siteName: siteConfig.name,
    images: [{ url: absoluteUrl(siteConfig.ogImage), width: 1200, height: 630, alt: 'Defied Money – Блог' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: `${bg.meta.blogTitle} | Defied Money`,
    description: bg.meta.blogDescription,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: absoluteUrl('/bg/blog'),
    languages: languageAlternates('/blog'),
  },
};

export default function BlogRoute() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Defied Money Блог',
          description: bg.meta.blogDescription,
          url: absoluteUrl('/bg/blog'),
          inLanguage: 'bg',
          isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.name,
            url: siteConfig.url,
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: articles.map((article, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: absoluteUrl(`/bg/blog/${article.id}`),
              name: article.title,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Начало',
              item: absoluteUrl('/bg'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Блог',
              item: absoluteUrl('/bg/blog'),
            },
          ],
        }}
      />
      <ResourcesPage />
    </>
  );
}
