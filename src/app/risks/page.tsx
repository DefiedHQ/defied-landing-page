import type { Metadata } from 'next';
import { RisksContent } from './RisksContent';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Risks',
  description:
    'Learn about the risks associated with DeFi protocols and cryptocurrencies. Invest informed.',
  openGraph: {
    title: 'Risks | Defied Money App',
    description:
      'Learn about the risks associated with DeFi protocols and cryptocurrencies.',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money App – Risks' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'Risks | Defied Money App',
    description: 'Learn about the risks associated with DeFi protocols and cryptocurrencies.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/risks',
  },
};

export default function RisksPage() {
  return <RisksContent />;
}
