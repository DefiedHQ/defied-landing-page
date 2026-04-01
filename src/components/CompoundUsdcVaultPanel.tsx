'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ERC4626VaultPanel } from '@/components/ERC4626VaultPanel';
import { CompoundIcon, UsdcIcon } from '@/components/TokenIcons';
import { USDC_ADDRESS, COMPOUND_USDC_VAULT_ADDRESS } from '@/config/erc4626';

export function CompoundUsdcVaultPanel() {
  const { t } = useLanguage();
  return (
    <ERC4626VaultPanel
      config={{
        title: t('vaults.compoundUsdc.title'),
        badge: 'Compound',
        description: t('vaults.compoundUsdc.description'),
        apr: '2.7%',
        protocolName: 'Compound',
        protocolHref: 'https://compound.finance',
        ProtocolIcon: CompoundIcon,
        TitleIcon: CompoundIcon,
        AssetIcon: UsdcIcon,
        assetName: 'USDC',
        assetDecimals: 6,
        tokenAddress: USDC_ADDRESS,
        vaultAddress: COMPOUND_USDC_VAULT_ADDRESS,
        etherscanHref: `https://etherscan.io/address/${COMPOUND_USDC_VAULT_ADDRESS}`,
      }}
    />
  );
}
