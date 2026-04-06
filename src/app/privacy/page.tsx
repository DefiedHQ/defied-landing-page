import type { Metadata } from 'next';
import { PrivacyPage } from '@/components/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Defied Privacy Policy. Learn how we process and protect your personal data.',
  alternates: {
    canonical: 'https://defied.money/privacy',
  },
};

export default function Page() {
  return <PrivacyPage />;
}
