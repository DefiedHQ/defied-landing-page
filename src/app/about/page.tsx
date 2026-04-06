import type { Metadata } from 'next';
import { AboutPage } from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'About us',
  description:
    'Defied provides non-custodial infrastructure for easy access to decentralized finance. The first crypto savings product in Bulgaria.',
  openGraph: {
    title: 'About us | Defied',
    description:
      'Defied provides non-custodial infrastructure for easy access to decentralized finance.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied' }],
  },
  alternates: {
    canonical: 'https://defied.money/about',
  },
};

export default function Page() {
  return <AboutPage />;
}
