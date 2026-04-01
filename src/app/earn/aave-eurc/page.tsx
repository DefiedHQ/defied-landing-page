import type { Metadata } from 'next';
import { AaveEurcVaultPanel } from '@/components/AaveEurcVaultPanel';

export const metadata: Metadata = {
  title: 'EURC Aave Vault',
  description:
    'Deposit EURC stablecoins into the decentralized Aave lending protocol via an ERC-4626 vault.',
};

export default function AaveEurcVaultPage() {
  return <AaveEurcVaultPanel />;
}
