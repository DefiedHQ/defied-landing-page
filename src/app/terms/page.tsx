import type { Metadata } from 'next';
import { TermsPage } from '@/components/TermsPage';

export const metadata: Metadata = {
  title: 'Условия за ползване',
  description:
    'Условия за ползване на платформата Defied. Прочетете нашите общи условия преди да използвате услугите ни.',
  alternates: {
    canonical: 'https://defied.money/terms',
  },
};

export default function Page() {
  return <TermsPage />;
}
