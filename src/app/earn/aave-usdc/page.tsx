import type { Metadata } from 'next';
import { AaveUsdcVaultPanel } from '@/components/AaveUsdcVaultPanel';

export const metadata: Metadata = {
  title: 'USDC Aave Стейбълкойн',
  description:
    'Депозирай USDC стейбълкойни в децентрализирания Aave протокол за кредити чрез ERC-4626 трезор.',
};

export default function AaveUsdcVaultPage() {
  return <AaveUsdcVaultPanel />;
}
