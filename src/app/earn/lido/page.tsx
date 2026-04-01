import type { Metadata } from 'next';
import { VaultPanel } from '@/components/VaultPanel';

export const metadata: Metadata = {
  title: 'ETH Трезор с Lido',
  description:
    'Залагай ETH в Lido трезора на Defied. Получи wstETH, спечели стейкинг доходност и тегли без такси при ново рекордно ниво на ETH.',
};

export default function LidoVaultPage() {
  return <VaultPanel />;
}
