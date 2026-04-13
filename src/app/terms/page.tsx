import type { Metadata } from 'next';
import { TermsPage } from '@/components/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for the Defied platform. Read our terms and conditions before using our services.',
  openGraph: {
    title: 'Terms of Use | Defied',
    description:
      'Terms of Use for the Defied platform. Read our terms and conditions before using our services.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied Terms of Use' }],
  },
  alternates: {
    canonical: 'https://defied.money/terms',
  },
};

export default function Page() {
  return <TermsPage />;
}
