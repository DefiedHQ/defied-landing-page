import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'За нас',
  description:
    'Defied е платформа, която предоставя не-попечителска децентрализирана инфраструктура за лесен достъп до децентрализираните финанси (DeFi).',
  openGraph: {
    title: 'За нас | Defied',
    description:
      'Defied е платформа, която предоставя не-попечителска децентрализирана инфраструктура за лесен достъп до DeFi.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied – За нас' }], // TODO: Replace with actual OG image
  },
  alternates: {
    canonical: 'https://defied.io/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
