import type { Metadata } from 'next';
import { VaultsGrid } from '@/components/VaultsGrid';

export const metadata: Metadata = {
  title: 'Печели',
  description:
    'Разгледай DeFi трезорите на Defied. Залагай ETH, получи wstETH и спечели автоматична доходност. Избери стратегия, подходяща за теб.',
};

export default function VaultsPage() {
  return <VaultsGrid />;
}
