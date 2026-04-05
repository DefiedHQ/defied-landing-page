import type { Metadata } from 'next';
import { ResourcesPage } from '@/components/ResourcesPage';

export const metadata: Metadata = {
  title: 'Блог',
  description:
    'Статии, ръководства и новини за DeFi, блокчейн и децентрализираните финанси от Defied.',
  openGraph: {
    title: 'Блог | Defied',
    description:
      'Статии, ръководства и новини за DeFi, блокчейн и децентрализираните финанси от Defied.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied – Блог' }],
  },
  alternates: {
    canonical: 'https://defied.bg/blog',
  },
};

export default function BlogRoute() {
  return <ResourcesPage />;
}
