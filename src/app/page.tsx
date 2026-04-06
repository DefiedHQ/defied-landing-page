import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'A stablecoin wallet with DeFi superpowers',
  description:
    'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
  openGraph: {
    title: 'Defied | A stablecoin wallet with DeFi superpowers',
    description:
      'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied' }],
  },
  alternates: {
    canonical: 'https://defied.money',
  },
};

export default function Home() {
  return <LandingPage />;
}
