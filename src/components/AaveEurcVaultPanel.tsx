'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ERC4626VaultPanel } from '@/components/ERC4626VaultPanel';
import { AaveIcon, EurcIcon } from '@/components/TokenIcons';
import { EURC_ADDRESS, AAVE_EURC_VAULT_ADDRESS } from '@/config/erc4626';

export function AaveEurcVaultPanel() {
  const { t } = useLanguage();
  return (
    <ERC4626VaultPanel
      config={{
        title: t('vaults.aaveEurc.title'),
        badge: 'Aave',
        description: t('vaults.aaveEurc.description'),
        apr: '2.7%',
        protocolName: 'Aave',
        protocolHref: 'https://aave.com',
        ProtocolIcon: AaveIcon,
        TitleIcon: AaveIcon,
        AssetIcon: EurcIcon,
        assetName: 'EURC',
        assetDecimals: 6,
        tokenAddress: EURC_ADDRESS,
        vaultAddress: AAVE_EURC_VAULT_ADDRESS,
        etherscanHref: `https://etherscan.io/address/${AAVE_EURC_VAULT_ADDRESS}`,
      }}
    />
  );
}
