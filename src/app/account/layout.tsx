import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Акаунт',
  description:
    'Управлявай своя Defied акаунт – виж портфейла си, прегледай транзакциите и управлявай настройките на акаунта си.',
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
