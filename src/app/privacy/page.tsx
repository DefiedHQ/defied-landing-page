import type { Metadata } from 'next';
import { PrivacyPage } from '@/components/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Defied Privacy Policy. Learn how we process and protect your personal data.',
  openGraph: {
    title: 'Privacy Policy | Defied',
    description:
      'Defied Privacy Policy. Learn how we process and protect your personal data.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied Privacy Policy' }],
  },
  alternates: {
    canonical: 'https://defied.money/privacy',
  },
};

export default function Page() {
  return <PrivacyPage />;
}
