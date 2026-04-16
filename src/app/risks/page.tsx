import type { Metadata } from 'next';
import { RisksContent } from './RisksContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Risks',
  description:
    'Learn about the risks associated with DeFi protocols and cryptocurrencies. Invest informed.',
  openGraph: {
    title: 'Risks | Defied',
    description:
      'Learn about the risks associated with DeFi protocols and cryptocurrencies.',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied – Risks' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'Risks | Defied',
    description: 'Learn about the risks associated with DeFi protocols and cryptocurrencies.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/risks',
  },
};

export default function RisksPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Risks',
          description: 'Learn about the risks associated with DeFi protocols and cryptocurrencies.',
          url: absoluteUrl('/risks'),
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <RisksContent />
    </>
  );
}
