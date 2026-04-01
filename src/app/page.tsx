import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Спечели Доходност от ETH - Без Банка',
  description:
    'Залагай ETH в Defied, получи wstETH от Lido и спечели автоматична стейкинг доходност. Тегли без такси при ново рекордно ниво на ETH. DeFi за всеки.',
};

export default function Home() {
  return <LandingPage />;
}
