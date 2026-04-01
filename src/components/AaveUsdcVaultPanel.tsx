'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ERC4626VaultPanel } from '@/components/ERC4626VaultPanel';
import { AaveIcon, UsdcIcon } from '@/components/TokenIcons';
import { USDC_ADDRESS, AAVE_USDC_VAULT_ADDRESS } from '@/config/erc4626';

export function AaveUsdcVaultPanel() {
  const { t } = useLanguage();
  return (
    <ERC4626VaultPanel
      config={{
        title: t('vaults.aaveUsdc.title'),
        badge: 'Aave',
        description: t('vaults.aaveUsdc.description'),
        apr: '2.7%',
        protocolName: 'Aave',
        protocolHref: 'https://aave.com',
        ProtocolIcon: AaveIcon,
        TitleIcon: AaveIcon,
        AssetIcon: UsdcIcon,
        assetName: 'USDC',
        assetDecimals: 6,
        tokenAddress: USDC_ADDRESS,
        vaultAddress: AAVE_USDC_VAULT_ADDRESS,
        etherscanHref: `https://etherscan.io/address/${AAVE_USDC_VAULT_ADDRESS}`,
      }}
    />
  );
}
