'use client';

import { useState, useEffect } from 'react';
import { parseUnits } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';
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

  const handleApprove = () => {
    if (!depositAmount) return;
    approve(tokenAddress, vaultAddress, depositAmountBigInt);
  };

  const handleDeposit = () => {
    if (!depositAmount || !address) return;
    deposit(vaultAddress, depositAmountBigInt, address);
  };

  const handleRedeem = () => {
    if (!address || shares <= 0n) return;
    redeem(vaultAddress, shares, address, address);
  };

  const maxBal = tokenBalance ? parseFloat(tokenBalance.formatted) : 0;

  const setMaxDeposit = () => { if (tokenBalance?.formatted) setDepositAmount(tokenBalance.formatted); };
  const set50Deposit = () => { if (maxBal > 0) setDepositAmount((maxBal * 0.5).toFixed(assetDecimals)); };
  const set25Deposit = () => { if (maxBal > 0) setDepositAmount((maxBal * 0.25).toFixed(assetDecimals)); };

  return (
    <div className="w-full max-w-[984px] mx-auto pb-16">
      {/* Hero — same style as earn/resources */}
      <div className="mb-12">
        <div className="flex gap-3 sm:gap-4 mt-12 sm:mt-[120px] mb-4 sm:mb-6" style={{ maxWidth: '800px', alignItems: 'flex-start' }}>
          <div className="shrink-0 pt-1"><TitleIcon size={40} /></div>
          <h1 className="text-[32px] sm:text-[56px] md:text-[80px]" style={{ fontWeight: 400, lineHeight: 1, color: '#0A0B0D' }}>
            {title}
          </h1>
        </div>
        <p className="text-base sm:text-lg md:text-2xl" style={{ color: '#6b7280', lineHeight: '1.4', maxWidth: '640px', fontWeight: 500 }}>
          {description}
        </p>
      </div>

      {/* Deposit / Withdraw filters — same style as earn/resources */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          type="button"
          onClick={() => { setActiveTab('deposit'); resetDeposit(); resetApprove(); }}
          className="resource-filter-btn"
          style={{
            alignItems: 'center',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 450,
            lineHeight: '24px',
            padding: '16px 24px',
            transition: 'all .2s ease',
            whiteSpace: 'nowrap' as const,
            background: activeTab === 'deposit' ? '#000' : '#0F0F660D',
            color: activeTab === 'deposit' ? '#fff' : '#374151',
          }}
        >
          {t('vault.deposit')}
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('withdraw'); resetRedeem(); }}
          className="resource-filter-btn"
          style={{
            alignItems: 'center',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 450,
            lineHeight: '24px',
            padding: '16px 24px',
            transition: 'all .2s ease',
            whiteSpace: 'nowrap' as const,
            background: activeTab === 'withdraw' ? '#000' : '#0F0F660D',
            color: activeTab === 'withdraw' ? '#fff' : '#374151',
          }}
        >
          {t('vault.withdraw')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

        {/* Left column */}
        <div className="flex flex-col">

          <div className="flex-1" style={{ background: '#ffffff', padding: '24px' }}>
            {activeTab === 'deposit' ? (
              <>
                <div className="mb-1">
                  <div className="flex items-center gap-3 mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>
                    <label htmlFor="erc4626-deposit-amount">{t('vault.payingOn')}</label>
                    <button type="button" onClick={setMaxDeposit} className="hover:opacity-70" style={{ color: 'rgb(30, 30, 232)', fontWeight: 500 }}>
                      Max {maxBal.toFixed(2)}
                    </button>
                    <button type="button" onClick={set50Deposit} className="hover:opacity-70" style={{ color: 'rgb(30, 30, 232)', fontWeight: 500 }}>50%</button>
                    <button type="button" onClick={set25Deposit} className="hover:opacity-70" style={{ color: 'rgb(30, 30, 232)', fontWeight: 500 }}>25%</button>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <input
                      id="erc4626-deposit-amount"
                      type="number"
                      placeholder="0"
                      value={depositAmount}
                      onChange={(e) => { setDepositAmount(e.target.value); resetDeposit(); resetApprove(); }}
                      className="bg-transparent placeholder:text-[#ccc]"
                      style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000', width: depositAmount ? `${Math.max(2, depositAmount.length)}ch` : '2ch' }}
                      min="0"
                      step="1"
                    />
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: 'rgb(118, 119, 122)' }}>{assetName}</span>
                  </div>
                </div>

                <div className="flex items-center my-3">
                  <div className="flex-1" style={{ height: '1px', background: '#e0e0e0' }} />
                  <div className="mx-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1" style={{ height: '1px', background: '#e0e0e0' }} />
                </div>

                <div className="mb-6">
                  <p className="mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>{t('vault.receivingOn')}</p>
                  <div className="flex items-baseline gap-2">
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>
                      {depositAmount && parseFloat(depositAmount) > 0 ? parseFloat(depositAmount).toFixed(2) : '0'}
                    </span>
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: 'rgb(118, 119, 122)' }}>{assetName} {t('vault.shares')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  {!isConnected ? (
                    <button type="button" onClick={login} className="flex-1 py-4 hover:opacity-80 transition-opacity" style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700 }}>
                      {t('vault.login')}
                    </button>
                  ) : needsApproval ? (
                    <button type="button" onClick={handleApprove} disabled={!depositAmount || isApproving || isApproveConfirming} className="flex-1 py-4 hover:opacity-80 transition-opacity disabled:opacity-50" style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700 }}>
                      {isApproving ? t('vault.confirmInWallet') : isApproveConfirming ? t('vault.approving') : approveSuccess ? t('vault.approved') : t('vault.approve', { asset: assetName })}
                    </button>
                  ) : (
                    <button type="button" onClick={handleDeposit} disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isDepositing || isDepositConfirming} className="flex-1 py-4 hover:opacity-80 transition-opacity disabled:opacity-50" style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700 }}>
                      {isDepositing ? t('vault.confirmInWallet') : isDepositConfirming ? t('vault.depositing') : depositSuccess ? t('vault.deposited') : t('vault.depositCta', { asset: assetName })}
                    </button>
                  )}
                </div>

                {approveError && (
                  <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-pink/6 rounded-xl">
                    <span className="text-sm shrink-0">🚨</span>
                    <p className="text-[13px] text-pink m-0 leading-snug break-all">{(approveError as Error).message?.split('\n')[0]}</p>
                  </div>
                )}
                {depositError && (
                  <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-pink/6 rounded-xl">
                    <span className="text-sm shrink-0">🚨</span>
                    <p className="text-[13px] text-pink m-0 leading-snug break-all">{(depositError as Error).message?.split('\n')[0]}</p>
                  </div>
                )}
                {depositSuccess && (
                  <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-green/8 rounded-xl">
                    <span className="text-sm shrink-0">✅</span>
                    <p className="text-[13px] text-green m-0 leading-snug">{t('vault.depositSuccess')}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-1">
                  <p className="mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>{t('vault.vaultBalance')}</p>
                  <div className="flex items-baseline gap-2">
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>{parseFloat(assetValue).toFixed(2)}</span>
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: 'rgb(118, 119, 122)' }}>{assetName}</span>
                  </div>
                </div>

                <div className="flex items-center my-3">
                  <div className="flex-1" style={{ height: '1px', background: '#e0e0e0' }} />
                </div>

                <div className="mt-4 flex items-center justify-center">
                  {!isConnected ? (
                    <button type="button" onClick={login} className="flex-1 py-4 hover:opacity-80 transition-opacity" style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700 }}>
                      {t('vault.login')}
                    </button>
                  ) : (
                    <button type="button" onClick={handleRedeem} disabled={shares <= 0n || isRedeeming || isRedeemConfirming} className="flex-1 py-4 hover:opacity-80 transition-opacity disabled:opacity-50" style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700 }}>
                      {isRedeeming ? t('vault.confirmInWallet') : isRedeemConfirming ? t('vault.withdrawing') : redeemSuccess ? t('vault.withdrawn') : shares <= 0n ? t('vault.noBalance') : t('vault.withdrawAll')}
                    </button>
                  )}
                </div>

                {redeemError && (
                  <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-pink/6 rounded-xl">
                    <span className="text-sm shrink-0">🚨</span>
                    <p className="text-[13px] text-pink m-0 leading-snug break-all">{(redeemError as Error).message?.split('\n')[0]}</p>
                  </div>
                )}
                {redeemSuccess && (
                  <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-green/8 rounded-xl">
                    <span className="text-sm shrink-0">✅</span>
                    <p className="text-[13px] text-green m-0 leading-snug">{t('vault.withdrawSuccess')}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col">
          <div className="vault-card p-8 sm:p-10 flex flex-col flex-1">
            <span className="inline-block self-start text-[13px] font-semibold text-white px-3 py-1 mb-5" style={{ background: '#000' }}>
              {badge}
            </span>
            <h3 className="text-[22px] mb-2" style={{ fontWeight: 700, color: '#000' }}>{title}</h3>
            <p className="text-[18px] leading-relaxed mb-8" style={{ color: 'rgb(118, 119, 122)', fontWeight: 500 }}>{description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-[13px] mb-1" style={{ color: 'rgb(118, 119, 122)' }}>{t('earn.apr')}</p>
                <p className="text-[18px]" style={{ fontWeight: 700, color: '#000' }}>{apr}</p>
              </div>
              <div>
                <p className="text-[13px] mb-1" style={{ color: 'rgb(118, 119, 122)' }}>{t('earn.protocol')}</p>
                <a href={protocolHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                  <ProtocolIcon size={18} />
                  <p className="text-[18px]" style={{ fontWeight: 700, color: '#000' }}>{protocolName}</p>
                </a>
              </div>
              <div>
                <p className="text-[13px] mb-1" style={{ color: 'rgb(118, 119, 122)' }}>{t('earn.asset')}</p>
                <div className="flex items-center gap-1.5">
                  <AssetIcon size={18} />
                  <p className="text-[18px]" style={{ fontWeight: 700, color: '#000' }}>{assetName}</p>
                </div>
              </div>
              <div>
                <p className="text-[13px] mb-1" style={{ color: 'rgb(118, 119, 122)' }}>{t('vault.contract')}</p>
                <a href={etherscanHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" style={{ fontSize: '18px', fontWeight: 700, color: '#000' }}>
                  Etherscan ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
