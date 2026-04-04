import type { Metadata } from 'next';
import { ResourcesPage } from '@/components/ResourcesPage';

export const metadata: Metadata = {
  title: 'Ресурси',
  description:
    'Статии, ръководства и новини за DeFi, блокчейн и децентрализираните финанси от Defied.',
  openGraph: {
    title: 'Ресурси | Defied',
    description:
      'Статии, ръководства и новини за DeFi, блокчейн и децентрализираните финанси от Defied.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied – Ресурси' }], // TODO: Replace with actual OG image
  },
  alternates: {
    canonical: 'https://defied.io/resources',
  },
};

export default function ResourcesRoute() {
  return <ResourcesPage />;
}
