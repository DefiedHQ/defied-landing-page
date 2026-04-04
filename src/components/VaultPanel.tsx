'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { useVaultData, useUserBalance } from '@/hooks/useVaultData';
import { useDeposit, useWithdraw } from '@/hooks/useVaultActions';
import { ChainlinkIcon, LidoIcon, WstEthIcon } from '@/components/TokenIcons';
import { useLanguage } from '@/context/LanguageContext';

type Tab = 'deposit' | 'withdraw';

export function VaultPanel() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('deposit');
  const [depositAmount, setDepositAmount] = useState('');
  const { address } = useAccount();
  const { ready, authenticated: isConnected, login } = usePrivy();
  const { data: ethBalance } = useBalance({ address });
  const { athReached, feePercent, totalWstETH, stEthPerToken, refetch: refetchVault } = useVaultData();
  const { wstETHBalance, refetch: refetchBalance } = useUserBalance(address);

  const {
    deposit, isPending: isDepositing, isConfirming: isDepositConfirming,
    isSuccess: depositSuccess, error: depositError, reset: resetDeposit,
  } = useDeposit();

  const {
    withdraw, isPending: isWithdrawing, isConfirming: isWithdrawConfirming,
    isSuccess: withdrawSuccess, error: withdrawError, reset: resetWithdraw,
  } = useWithdraw();

  useEffect(() => {
    if (depositSuccess || withdrawSuccess) {
      refetchVault();
      refetchBalance();
    }
  }, [depositSuccess, withdrawSuccess, refetchVault, refetchBalance]);

  const handleDeposit = () => { if (depositAmount) deposit(depositAmount); };
  const handleWithdraw = () => { withdraw(); };

  const setMaxDeposit = () => {
    if (!ethBalance?.formatted) return;
    const bal = parseFloat(ethBalance.formatted);
    const max = bal > 0.01 ? bal - 0.01 : bal;
    if (max > 0) setDepositAmount(max.toFixed(6));
  };
  const set50Deposit = () => {
    if (!ethBalance?.formatted) return;
    const half = parseFloat(ethBalance.formatted) * 0.5;
    if (half > 0) setDepositAmount(half.toFixed(6));
  };
  const set25Deposit = () => {
    if (!ethBalance?.formatted) return;
    const quarter = parseFloat(ethBalance.formatted) * 0.25;
    if (quarter > 0) setDepositAmount(quarter.toFixed(6));
  };

  const depositNum = parseFloat(depositAmount) || 0;
  const estimatedWstETH = stEthPerToken && depositNum > 0 ? depositNum / stEthPerToken : 0;
  const earlyWithdrawAmount = parseFloat(wstETHBalance) * (1 - feePercent / 100);
  const maxBal = ethBalance ? parseFloat(ethBalance.formatted) : 0;

  return (
    <Box as="div" style={{ maxWidth: '1200px', margin: '24px auto 0', padding: '0 16px', width: '100%' }}>
      {/* Page title */}
      <HStack as="div" style={{ justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
        <LidoIcon size={56} />
        <Text font="display2" as="h1">{t('vaultDiamond.title')}</Text>
      </HStack>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: tabs + widget */}
        <VStack as="div" style={{ gap: '0px' }}>
          {/* Tab buttons */}
          <HStack as="div" style={{ justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            <Button
              variant={activeTab === 'deposit' ? 'primary' : 'secondary'}
              compact
              onClick={() => { setActiveTab('deposit'); resetDeposit(); resetWithdraw(); }}
              style={{ borderRadius: '24px' }}
            >
              {t('vaultDiamond.deposit')}
            </Button>
            <Button
              variant={activeTab === 'withdraw' ? 'primary' : 'secondary'}
              compact
              onClick={() => { setActiveTab('withdraw'); resetDeposit(); resetWithdraw(); }}
              style={{ borderRadius: '24px' }}
            >
              {t('vaultDiamond.withdraw')}
            </Button>
          </HStack>

          {/* Card */}
          <Box as="div" style={{ flex: 1, background: '#ffffff', padding: '24px' }}>
            {activeTab === 'deposit' ? (
              <>
                {/* Pay section */}
                <Box as="div" style={{ marginBottom: '4px' }}>
                  <HStack as="div" style={{ alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <Text font="caption" as="label" htmlFor="deposit-amount" color="fgMuted">{t('vaultDiamond.payOnEthereum')}</Text>
                    <button type="button" onClick={setMaxDeposit} className="hover:opacity-70" style={{ color: '#0052FF', fontWeight: 500, background: 'none', border: 'none', minHeight: '44px', minWidth: '44px' }}>
                      Max {maxBal.toFixed(7)}
                    </button>
                    <button type="button" onClick={set50Deposit} className="hover:opacity-70" style={{ color: '#0052FF', fontWeight: 500, background: 'none', border: 'none', minHeight: '44px', minWidth: '44px' }}>50%</button>
                    <button type="button" onClick={set25Deposit} className="hover:opacity-70" style={{ color: '#0052FF', fontWeight: 500, background: 'none', border: 'none', minHeight: '44px', minWidth: '44px' }}>25%</button>
                  </HStack>
                  <HStack as="div" style={{ alignItems: 'baseline', gap: '8px' }}>
                    <input
                      id="deposit-amount"
                      type="number"
                      placeholder="0"
                      value={depositAmount}
                      onChange={(e) => { setDepositAmount(e.target.value); resetDeposit(); }}
                      className="bg-transparent placeholder:text-[#ccc]"
                      style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000', width: depositAmount ? `${Math.max(2, depositAmount.length)}ch` : '2ch' }}
                      min="0"
                      step="0.01"
                    />
                    <Text font="title2" as="span" color="fgMuted">ETH</Text>
                  </HStack>
                </Box>

                {/* Divider + arrow */}
                <HStack as="div" style={{ alignItems: 'center', margin: '12px 0' }}>
                  <Box as="div" style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                  <Box as="div" style={{ margin: '0 12px' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Box>
                  <Box as="div" style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                </HStack>

                {/* Receive section */}
                <Box as="div" style={{ marginBottom: '24px' }}>
                  <Text font="caption" as="p" color="fgMuted" style={{ marginBottom: '16px' }}>{t('vaultDiamond.receiveOnEthereum')}</Text>
                  <HStack as="div" style={{ alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>
                      {estimatedWstETH > 0 ? estimatedWstETH.toFixed(6) : '0'}
                    </span>
                    <Text font="title2" as="span" color="fgMuted">wstETH</Text>
                  </HStack>
                </Box>

                {/* ATH Alert */}
                {athReached && (
                  <Box as="div" role="alert" style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(5, 177, 105, 0.08)', borderRadius: '12px' }}>
                    <span aria-hidden="true">✅</span>
                    <Text font="caption" as="p" style={{ color: '#05B169' }}>{t('vaultDiamond.athPaused')}</Text>
                  </Box>
                )}

                {/* Button */}
                <Box as="div" style={{ display: 'flex', justifyContent: 'center' }}>
                  {!isConnected ? (
                    <Button variant="primary" block onClick={login} style={{ borderRadius: '28px', height: '56px' }}>
                      {t('vaultDiamond.login')}
                    </Button>
                  ) : athReached ? (
                    <Button variant="secondary" block disabled style={{ borderRadius: '28px', height: '56px' }}>
                      {t('vaultDiamond.depositsDisabled')}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      block
                      onClick={handleDeposit}
                      disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isDepositing || isDepositConfirming}
                      loading={isDepositing || isDepositConfirming}
                      style={{ borderRadius: '28px', height: '56px' }}
                    >
                      {isDepositing ? t('vaultDiamond.confirmInWallet')
                        : isDepositConfirming ? t('vaultDiamond.depositing')
                        : depositSuccess ? t('vaultDiamond.deposited')
                        : t('vaultDiamond.depositETH')}
                    </Button>
                  )}
                </Box>

                {depositError && (
                  <Box as="div" role="alert" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(223, 41, 53, 0.06)', borderRadius: '12px' }}>
                    <span aria-hidden="true">🚨</span>
                    <Text font="caption" as="p" style={{ color: '#DF2935' }}>{(depositError as Error).message?.split('\n')[0]}</Text>
                  </Box>
                )}
                {depositSuccess && (
                  <Box as="div" role="alert" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(5, 177, 105, 0.08)', borderRadius: '12px' }}>
                    <span aria-hidden="true">✅</span>
                    <Text font="caption" as="p" style={{ color: '#05B169' }}>{t('vaultDiamond.depositSuccess')}</Text>
                  </Box>
                )}

                {/* Exchange rate */}
                <HStack as="div" style={{ justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
                  <Text font="caption" as="span" color="fgMuted">1 ETH</Text>
                  <Text font="caption" as="span" color="fgMuted">⇄</Text>
                  <Text font="caption" as="span" color="fgMuted">{stEthPerToken ? (1 / stEthPerToken).toFixed(6) : '—'} wstETH</Text>
                </HStack>
              </>
            ) : (
              <>
                {/* Withdraw balance */}
                <Box as="div" style={{ marginBottom: '4px' }}>
                  <Text font="caption" as="p" color="fgMuted" style={{ marginBottom: '16px' }}>{t('vaultDiamond.vaultBalance')}</Text>
                  <HStack as="div" style={{ alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>
                      {parseFloat(wstETHBalance).toFixed(6)}
                    </span>
                    <Text font="title2" as="span" color="fgMuted">wstETH</Text>
                  </HStack>
                </Box>

                {/* Fee info */}
                {!athReached && parseFloat(wstETHBalance) > 0 && (
                  <>
                    <Box as="div" style={{ height: '1px', background: '#e0e0e0', margin: '12px 0' }} />
                    <Box as="div" style={{ marginBottom: '24px' }}>
                      <Text font="caption" as="p" color="fgMuted" style={{ marginBottom: '16px' }}>{t('vaultDiamond.receiveAfterFee', { feePercent: String(feePercent) })}</Text>
                      <HStack as="div" style={{ alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>
                          {earlyWithdrawAmount.toFixed(6)}
                        </span>
                        <Text font="title2" as="span" color="fgMuted">wstETH</Text>
                      </HStack>
                    </Box>
                  </>
                )}

                {athReached && parseFloat(wstETHBalance) > 0 && (
                  <Box as="div" role="alert" style={{ margin: '12px 0 16px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(5, 177, 105, 0.08)', borderRadius: '12px' }}>
                    <span aria-hidden="true">✅</span>
                    <Text font="caption" as="p" style={{ color: '#05B169' }}>{t('vaultDiamond.athZeroFees')}</Text>
                  </Box>
                )}

                {/* Button */}
                <Box as="div" style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                  {!isConnected ? (
                    <Button variant="primary" block onClick={login} style={{ borderRadius: '28px', height: '56px' }}>
                      {t('vaultDiamond.login')}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      block
                      onClick={handleWithdraw}
                      disabled={parseFloat(wstETHBalance) <= 0 || isWithdrawing || isWithdrawConfirming}
                      loading={isWithdrawing || isWithdrawConfirming}
                      style={{ borderRadius: '28px', height: '56px' }}
                    >
                      {isWithdrawing ? t('vaultDiamond.confirmInWallet')
                        : isWithdrawConfirming ? t('vaultDiamond.withdrawing')
                        : withdrawSuccess ? t('vaultDiamond.withdrawn')
                        : parseFloat(wstETHBalance) <= 0 ? t('vaultDiamond.noBalance')
                        : athReached ? t('vaultDiamond.withdrawNoFee')
                        : t('vaultDiamond.withdrawWithFee', { feePercent: String(feePercent) })}
                    </Button>
                  )}
                </Box>

                {withdrawError && (
                  <Box as="div" role="alert" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(223, 41, 53, 0.06)', borderRadius: '12px' }}>
                    <span aria-hidden="true">🚨</span>
                    <Text font="caption" as="p" style={{ color: '#DF2935' }}>{(withdrawError as Error).message?.split('\n')[0]}</Text>
                  </Box>
                )}
                {withdrawSuccess && (
                  <Box as="div" role="alert" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(5, 177, 105, 0.08)', borderRadius: '12px' }}>
                    <span aria-hidden="true">✅</span>
                    <Text font="caption" as="p" style={{ color: '#05B169' }}>{t('vaultDiamond.withdrawSuccess')}</Text>
                  </Box>
                )}
              </>
            )}
          </Box>
        </VStack>

        {/* Vault info — right column */}
        <VStack as="div" style={{ gap: '0px' }}>
          <Box
            as="div"
            style={{
              background: '#fff',
              borderRadius: '56px',
              padding: 'clamp(24px, 4vw, 40px)',
              flex: 1,
              border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            <Text font="caption" as="span" style={{ background: '#000', color: '#fff', padding: '4px 12px', fontWeight: 600, display: 'inline-block', marginBottom: '20px' }}>
              {t('vaultDiamond.vaultDetails')}
            </Text>

            <Text font="title3" as="h3" style={{ marginBottom: '8px' }}>
              {t('vaultDiamond.title')}
            </Text>
            <Text font="body" as="p" color="fgMuted" style={{ marginBottom: '32px' }}>
              {t('vaultDiamond.description')}
            </Text>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6" style={{ marginBottom: '32px' }}>
              <VStack as="div" style={{ gap: '4px' }}>
                <Text font="caption" as="p" color="fgMuted">{t('vaultDiamond.tvl')}</Text>
                <Text font="headline" as="p">{parseFloat(totalWstETH).toFixed(4)}</Text>
                <HStack as="div" style={{ alignItems: 'center', gap: '6px' }}>
                  <WstEthIcon size={16} />
                  <Text font="caption" as="span" color="fgMuted">wstETH</Text>
                </HStack>
              </VStack>
              <VStack as="div" style={{ gap: '4px' }}>
                <Text font="caption" as="p" color="fgMuted">{t('vaultDiamond.earlyExitFee')}</Text>
                <Text font="headline" as="p">{athReached ? t('vaultDiamond.feeNone') : `${feePercent}%`}</Text>
              </VStack>
              <VStack as="div" style={{ gap: '4px' }}>
                <Text font="caption" as="p" color="fgMuted">{t('vaultDiamond.yieldSource')}</Text>
                <a href="https://lido.fi" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}>
                  <HStack as="div" style={{ alignItems: 'center', gap: '6px' }}>
                    <LidoIcon size={18} />
                    <Text font="headline" as="span">Lido</Text>
                  </HStack>
                </a>
              </VStack>
              <VStack as="div" style={{ gap: '4px' }}>
                <Text font="caption" as="p" color="fgMuted">{t('vaultDiamond.priceOracle')}</Text>
                <a href="https://data.chain.link/feeds/ethereum/mainnet/eth-usd" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}>
                  <HStack as="div" style={{ alignItems: 'center', gap: '6px' }}>
                    <ChainlinkIcon size={18} />
                    <Text font="headline" as="span">Chainlink</Text>
                  </HStack>
                </a>
              </VStack>
              <VStack as="div" style={{ gap: '4px' }}>
                <Text font="caption" as="p" color="fgMuted">{t('vaultDiamond.contract')}</Text>
                <a
                  href="https://etherscan.io/address/0x3548A8345A37f58F232F97eB050C937fb660D514"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  style={{ textDecoration: 'none' }}
                >
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
