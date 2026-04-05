import type { Metadata } from 'next';
import { RisksContent } from './RisksContent';

export const metadata: Metadata = {
  title: 'Risks | Defied',
  description:
    'Learn about the risks associated with DeFi protocols and cryptocurrencies. Invest informed.',
  openGraph: {
    title: 'Risks | Defied',
    description:
      'Learn about the risks associated with DeFi protocols and cryptocurrencies.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied – Risks' }],
  },
  alternates: {
    canonical: 'https://defied.bg/risks',
  },
};

export default function RisksPage() {
  return <RisksContent />;
}
