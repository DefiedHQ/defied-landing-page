import type { Metadata } from 'next';
import { TermsPage } from '@/components/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for the Defied platform. Read our terms and conditions before using our services.',
  alternates: {
    canonical: 'https://defied.money/terms',
  },
};

export default function Page() {
  return <TermsPage />;
}
