import type { Metadata } from 'next';
import { RisksContent } from '@/components/RisksContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Risk Disclosure',
  description:
    'Defied Money Risk Disclosure: the risks of stablecoins, self-custodial wallets and third-party onchain protocols, including variable rates and the absence of deposit guarantees.',
  openGraph: {
    title: 'Risk Disclosure | Defied Money',
    description:
      'Defied Money Risk Disclosure: the risks of stablecoins, self-custodial wallets and third-party onchain protocols, including variable rates and the absence of deposit guarantees.',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money – Risk Disclosure' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'Risk Disclosure | Defied Money',
    description: 'Defied Money Risk Disclosure: the risks of stablecoins, self-custodial wallets and third-party onchain protocols, including variable rates and the absence of deposit guarantees.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/risks',
    languages: languageAlternates('/risks'),
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
