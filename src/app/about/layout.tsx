import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About us',
  description:
    'Defied is a platform that provides non-custodial decentralized infrastructure for easy access to decentralized finance (DeFi).',
  openGraph: {
    title: 'About us | Defied',
    description:
      'Defied is a platform that provides non-custodial decentralized infrastructure for easy access to DeFi.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied – About us' }],
  },
  alternates: {
    canonical: 'https://defied.money/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
