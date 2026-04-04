'use client';

import { useState, useEffect } from 'react';
import { parseUnits } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { useERC4626UserData } from '@/hooks/useERC4626';
import { useERC4626Approve, useERC4626Deposit, useERC4626Redeem } from '@/hooks/useERC4626Actions';
import { useLanguage } from '@/context/LanguageContext';

export interface ERC4626VaultConfig {
  title: string;
  badge: string;
  description: string;
  apr: string;
  protocolName: string;
  protocolHref: string;
  ProtocolIcon: React.ComponentType<{ size?: number }>;
  TitleIcon: React.ComponentType<{ size?: number }>;
  AssetIcon: React.ComponentType<{ size?: number }>;
  assetName: string;
  assetDecimals: number;
  tokenAddress: `0x${string}`;
  vaultAddress: `0x${string}`;
  etherscanHref: string;
}

type Tab = 'deposit' | 'withdraw';

export function ERC4626VaultPanel({ config }: { config: ERC4626VaultConfig }) {
  const {
    title, badge, description, apr, protocolName, protocolHref,
    ProtocolIcon, TitleIcon, AssetIcon,
    assetName, assetDecimals, tokenAddress, vaultAddress, etherscanHref,
  } = config;

  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('deposit');
  const [depositAmount, setDepositAmount] = useState('');
  const { address } = useAccount();
  const { ready, authenticated: isConnected, login } = usePrivy();

  const { data: tokenBalance } = useBalance({ address, token: tokenAddress });

  const { shares, assetValue, allowance, refetchShares, refetchAllowance } =
    useERC4626UserData(address, vaultAddress, tokenAddress, assetDecimals);

  const { approve, isPending: isApproving, isConfirming: isApproveConfirming, isSuccess: approveSuccess, error: approveError, reset: resetApprove } = useERC4626Approve();
  const { deposit, isPending: isDepositing, isConfirming: isDepositConfirming, isSuccess: depositSuccess, error: depositError, reset: resetDeposit } = useERC4626Deposit();
  const { redeem, isPending: isRedeeming, isConfirming: isRedeemConfirming, isSuccess: redeemSuccess, error: redeemError, reset: resetRedeem } = useERC4626Redeem();

  useEffect(() => {
    if (approveSuccess) refetchAllowance();
  }, [approveSuccess, refetchAllowance]);

  useEffect(() => {
    if (depositSuccess || redeemSuccess) refetchShares();
  }, [depositSuccess, redeemSuccess, refetchShares]);

  const depositAmountBigInt = depositAmount ? parseUnits(depositAmount, assetDecimals) : 0n;
  const needsApproval = depositAmountBigInt > 0n && depositAmountBigInt > allowance;

  const handleApprove = () => { if (depositAmount) approve(tokenAddress, vaultAddress, depositAmountBigInt); };
  const handleDeposit = () => { if (depositAmount && address) deposit(vaultAddress, depositAmountBigInt, address); };
  const handleRedeem = () => { if (address && shares > 0n) redeem(vaultAddress, shares, address, address); };

  const maxBal = tokenBalance ? parseFloat(tokenBalance.formatted) : 0;
  const setMaxDeposit = () => { if (tokenBalance?.formatted) setDepositAmount(tokenBalance.formatted); };
  const set50Deposit = () => { if (maxBal > 0) setDepositAmount((maxBal * 0.5).toFixed(assetDecimals)); };
  const set25Deposit = () => { if (maxBal > 0) setDepositAmount((maxBal * 0.25).toFixed(assetDecimals)); };

  return (
    <Box as="div" style={{ maxWidth: '984px', margin: '0 auto', paddingBottom: '64px', width: '100%' }}>
      {/* Hero */}
      <Box as="div" style={{ marginBottom: '48px' }}>
        <HStack as="div" style={{ gap: '16px', marginTop: '48px', marginBottom: '24px', maxWidth: '800px', alignItems: 'flex-start' }}>
          <Box as="div" style={{ flexShrink: 0, paddingTop: '4px' }}><TitleIcon size={40} /></Box>
          <Text font="display2" as="h1">{title}</Text>
        </HStack>
        <Text font="body" as="p" color="fgMuted" style={{ maxWidth: '640px', fontSize: '18px' }}>
          {description}
        </Text>
      </Box>

      {/* Tab buttons */}
      <HStack as="div" style={{ gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <Button
          variant={activeTab === 'deposit' ? 'primary' : 'secondary'}
          compact
          onClick={() => { setActiveTab('deposit'); resetDeposit(); resetApprove(); }}
          style={{ borderRadius: '50px' }}
        >
          {t('vault.deposit')}
        </Button>
        <Button
          variant={activeTab === 'withdraw' ? 'primary' : 'secondary'}
          compact
          onClick={() => { setActiveTab('withdraw'); resetRedeem(); }}
          style={{ borderRadius: '50px' }}
        >
          {t('vault.withdraw')}
        </Button>
      </HStack>

      <div className="grid-1-2-lg">
        {/* Left column */}
        <VStack as="div" style={{ gap: '0px' }}>
          <Box as="div" style={{ flex: 1, background: '#ffffff', padding: '24px' }}>
            {activeTab === 'deposit' ? (
              <>
                <Box as="div" style={{ marginBottom: '4px' }}>
                  <HStack as="div" style={{ alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <Text font="caption" as="label" htmlFor="erc4626-deposit-amount" color="fgMuted">{t('vault.payingOn')}</Text>
                    <button type="button" onClick={setMaxDeposit} className="hover-fade-70" style={{ color: '#0052FF', fontWeight: 500, background: 'none', border: 'none' }}>Max {maxBal.toFixed(2)}</button>
                    <button type="button" onClick={set50Deposit} className="hover-fade-70" style={{ color: '#0052FF', fontWeight: 500, background: 'none', border: 'none' }}>50%</button>
                    <button type="button" onClick={set25Deposit} className="hover-fade-70" style={{ color: '#0052FF', fontWeight: 500, background: 'none', border: 'none' }}>25%</button>
                  </HStack>
                  <HStack as="div" style={{ alignItems: 'baseline', gap: '8px' }}>
                    <input
                      id="erc4626-deposit-amount"
                      type="number"
                      placeholder="0"
                      value={depositAmount}
                      onChange={(e) => { setDepositAmount(e.target.value); resetDeposit(); resetApprove(); }}
                      className="vault-input"
                      style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000', width: depositAmount ? `${Math.max(2, depositAmount.length)}ch` : '2ch' }}
                      min="0"
                      step="1"
                    />
                    <Text font="title2" as="span" color="fgMuted">{assetName}</Text>
                  </HStack>
                </Box>

                <HStack as="div" style={{ alignItems: 'center', margin: '12px 0' }}>
                  <Box as="div" style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                  <Box as="div" style={{ margin: '0 12px' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Box>
                  <Box as="div" style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                </HStack>

                <Box as="div" style={{ marginBottom: '24px' }}>
                  <Text font="caption" as="p" color="fgMuted" style={{ marginBottom: '16px' }}>{t('vault.receivingOn')}</Text>
                  <HStack as="div" style={{ alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>
                      {depositAmount && parseFloat(depositAmount) > 0 ? parseFloat(depositAmount).toFixed(2) : '0'}
                    </span>
                    <Text font="title2" as="span" color="fgMuted">{assetName} {t('vault.shares')}</Text>
                  </HStack>
                </Box>

                <Box as="div" style={{ display: 'flex', justifyContent: 'center' }}>
                  {!isConnected ? (
                    <Button variant="primary" block onClick={login} style={{ borderRadius: '28px', height: '56px' }}>{t('vault.login')}</Button>
                  ) : needsApproval ? (
                    <Button variant="primary" block onClick={handleApprove} disabled={!depositAmount || isApproving || isApproveConfirming} loading={isApproving || isApproveConfirming} style={{ borderRadius: '28px', height: '56px' }}>
                      {isApproving ? t('vault.confirmInWallet') : isApproveConfirming ? t('vault.approving') : approveSuccess ? t('vault.approved') : t('vault.approve', { asset: assetName })}
                    </Button>
                  ) : (
                    <Button variant="primary" block onClick={handleDeposit} disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isDepositing || isDepositConfirming} loading={isDepositing || isDepositConfirming} style={{ borderRadius: '28px', height: '56px' }}>
                      {isDepositing ? t('vault.confirmInWallet') : isDepositConfirming ? t('vault.depositing') : depositSuccess ? t('vault.deposited') : t('vault.depositCta', { asset: assetName })}
                    </Button>
                  )}
                </Box>

                {approveError && (
                  <Box as="div" role="alert" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(223, 41, 53, 0.06)', borderRadius: '12px' }}>
                    <span>🚨</span><Text font="caption" as="p" style={{ color: '#DF2935' }}>{(approveError as Error).message?.split('\n')[0]}</Text>
                  </Box>
                )}
                {depositError && (
                  <Box as="div" role="alert" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(223, 41, 53, 0.06)', borderRadius: '12px' }}>
                    <span>🚨</span><Text font="caption" as="p" style={{ color: '#DF2935' }}>{(depositError as Error).message?.split('\n')[0]}</Text>
                  </Box>
                )}
                {depositSuccess && (
                  <Box as="div" role="alert" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(5, 177, 105, 0.08)', borderRadius: '12px' }}>
                    <span>✅</span><Text font="caption" as="p" style={{ color: '#05B169' }}>{t('vault.depositSuccess')}</Text>
                  </Box>
                )}
              </>
            ) : (
              <>
                <Box as="div" style={{ marginBottom: '4px' }}>
                  <Text font="caption" as="p" color="fgMuted" style={{ marginBottom: '16px' }}>{t('vault.vaultBalance')}</Text>
                  <HStack as="div" style={{ alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>{parseFloat(assetValue).toFixed(2)}</span>
                    <Text font="title2" as="span" color="fgMuted">{assetName}</Text>
                  </HStack>
                </Box>

                <Box as="div" style={{ height: '1px', background: '#e0e0e0', margin: '12px 0' }} />

                <Box as="div" style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                  {!isConnected ? (
                    <Button variant="primary" block onClick={login} style={{ borderRadius: '28px', height: '56px' }}>{t('vault.login')}</Button>
                  ) : (
                    <Button variant="primary" block onClick={handleRedeem} disabled={shares <= 0n || isRedeeming || isRedeemConfirming} loading={isRedeeming || isRedeemConfirming} style={{ borderRadius: '28px', height: '56px' }}>
                      {isRedeeming ? t('vault.confirmInWallet') : isRedeemConfirming ? t('vault.withdrawing') : redeemSuccess ? t('vault.withdrawn') : shares <= 0n ? t('vault.noBalance') : t('vault.withdrawAll')}
                    </Button>
                  )}
                </Box>

                {redeemError && (
                  <Box as="div" role="alert" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(223, 41, 53, 0.06)', borderRadius: '12px' }}>
                    <span>🚨</span><Text font="caption" as="p" style={{ color: '#DF2935' }}>{(redeemError as Error).message?.split('\n')[0]}</Text>
                  </Box>
                )}
                {redeemSuccess && (
                  <Box as="div" role="alert" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(5, 177, 105, 0.08)', borderRadius: '12px' }}>
                    <span>✅</span><Text font="caption" as="p" style={{ color: '#05B169' }}>{t('vault.withdrawSuccess')}</Text>
                  </Box>
                )}
              </>
            )}
          </Box>
        </VStack>

        {/* Right column */}
        <VStack as="div" style={{ gap: '0px' }}>
          <Box as="div" style={{ background: '#fff', borderRadius: '56px', padding: 'clamp(24px, 4vw, 40px)', flex: 1, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
            <Text font="caption" as="span" style={{ background: '#000', color: '#fff', padding: '4px 12px', fontWeight: 600, display: 'inline-block', marginBottom: '20px' }}>{badge}</Text>
            <Text font="title3" as="h3" style={{ marginBottom: '8px' }}>{title}</Text>
            <Text font="body" as="p" color="fgMuted" style={{ marginBottom: '32px' }}>{description}</Text>

            <div className="grid-2-3">
              <VStack as="div" style={{ gap: '4px' }}>
                <Text font="caption" as="p" color="fgMuted">{t('earn.apr')}</Text>
                <Text font="headline" as="p">{apr}</Text>
              </VStack>
              <VStack as="div" style={{ gap: '4px' }}>
                <Text font="caption" as="p" color="fgMuted">{t('earn.protocol')}</Text>
                <a href={protocolHref} target="_blank" rel="noopener noreferrer" className="hover-fade" style={{ textDecoration: 'none' }}>
                  <HStack as="div" style={{ alignItems: 'center', gap: '6px' }}><ProtocolIcon size={18} /><Text font="headline" as="span">{protocolName}</Text></HStack>
                </a>
              </VStack>
              <VStack as="div" style={{ gap: '4px' }}>
                <Text font="caption" as="p" color="fgMuted">{t('earn.asset')}</Text>
                <HStack as="div" style={{ alignItems: 'center', gap: '6px' }}><AssetIcon size={18} /><Text font="headline" as="span">{assetName}</Text></HStack>
              </VStack>
              <VStack as="div" style={{ gap: '4px' }}>
                <Text font="caption" as="p" color="fgMuted">{t('vault.contract')}</Text>
                <a href={etherscanHref} target="_blank" rel="noopener noreferrer" className="hover-fade" style={{ textDecoration: 'none' }}>
                  <Text font="headline" as="span">Etherscan ↗</Text>
                </a>
              </VStack>
            </div>
          </Box>
        </VStack>
      </div>
    </Box>
  );
}
