import type { Metadata } from 'next';
import { ResourcesPage } from '@/components/ResourcesPage';
import { JsonLd } from '@/components/seo/JsonLd';
import articles from '@/data/articles-en.json';
import { siteConfig, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied Money App.',
  openGraph: {
    title: 'Blog | Defied Money App',
    description:
      'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied Money App.',
    url: absoluteUrl('/blog'),
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money App – Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'Blog | Defied Money App',
    description:
      'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied Money App.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogRoute() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Defied Money App Blog',
          description:
            'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied Money App.',
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
