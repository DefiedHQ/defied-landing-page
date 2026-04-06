import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'A digital stablecoin wallet for everyone',
  description:
    'Manage your money using the latest technology — stablecoins. Send, receive, and exchange in seconds.',
  openGraph: {
    title: 'Defied | A digital stablecoin wallet for everyone',
    description:
      'Manage your money using the latest technology — stablecoins. Send, receive, and exchange in seconds.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied' }],
  },
  alternates: {
    canonical: 'https://defied.money',
  },
};

export default function Home() {
  return <LandingPage />;
}
