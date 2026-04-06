import type { Metadata } from 'next';
import { ResourcesPage } from '@/components/ResourcesPage';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied.',
  openGraph: {
    title: 'Blog | Defied',
    description:
      'Articles, guides, and news about DeFi, blockchain, and decentralized finance from Defied.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied – Blog' }],
  },
  alternates: {
    canonical: 'https://defied.money/blog',
  },
};

export default function BlogRoute() {
  return <ResourcesPage />;
}
