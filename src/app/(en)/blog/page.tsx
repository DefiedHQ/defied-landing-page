import type { Metadata } from 'next';
import { ResourcesPage } from '@/components/ResourcesPage';
import { JsonLd } from '@/components/seo/JsonLd';
import articles from '@/data/articles-en.json';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied Money.',
  openGraph: {
    title: 'Blog | Defied Money',
    description:
      'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied Money.',
    url: absoluteUrl('/blog'),
    siteName: siteConfig.name,
    images: [{ url: absoluteUrl(siteConfig.ogImage), width: 1200, height: 630, alt: 'Defied Money – Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'Blog | Defied Money',
    description:
      'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied Money.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: absoluteUrl('/blog'),
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
          name: 'Defied Money Blog',
          description:
            'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied Money.',
          url: absoluteUrl('/blog'),
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
              url: absoluteUrl(`/blog/${article.id}`),
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
              name: 'Home',
              item: siteConfig.url,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: absoluteUrl('/blog'),
            },
          ],
        }}
      />
      <ResourcesPage />
    </>
  );
}
