import type { Metadata } from 'next';
import { AboutPage } from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'За нас',
  description:
    'Defied предоставя некастодиална инфраструктура за лесен достъп до децентрализирани финанси. Първият крипто спестовен продукт в България.',
  openGraph: {
    title: 'За нас | Defied',
    description:
      'Defied предоставя некастодиална инфраструктура за лесен достъп до децентрализирани финанси.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied' }],
  },
  alternates: {
    canonical: 'https://defied.money/about',
  },
};

export default function Page() {
  return <AboutPage />;
}
