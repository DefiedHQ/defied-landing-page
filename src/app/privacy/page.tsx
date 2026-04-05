import type { Metadata } from 'next';
import { PrivacyPage } from '@/components/PrivacyPage';

export const metadata: Metadata = {
  title: 'Политика за поверителност',
  description:
    'Политика за поверителност на Defied. Научете как обработваме и защитаваме вашите лични данни.',
  alternates: {
    canonical: 'https://defied.bg/privacy',
  },
};

export default function Page() {
  return <PrivacyPage />;
}
