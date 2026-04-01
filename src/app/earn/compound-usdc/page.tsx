import type { Metadata } from 'next';
import { CompoundUsdcVaultPanel } from '@/components/CompoundUsdcVaultPanel';

export const metadata: Metadata = {
  title: 'USDC Compound Vault',
  description:
    'Deposit USDC stablecoins into the decentralized Compound lending protocol via an ERC-4626 vault.',
};

export default function CompoundUsdcVaultPage() {
  return <CompoundUsdcVaultPanel />;
}
