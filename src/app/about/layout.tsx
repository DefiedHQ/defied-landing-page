import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'За нас',
  description:
    'Defied е платформа, която предоставя не-попечителска децентрализирана инфраструктура за лесен достъп до децентрализираните финанси (DeFi).',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
