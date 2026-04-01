'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';
import { useVaultData, useUserBalance } from '@/hooks/useVaultData';
import { useDeposit, useWithdraw } from '@/hooks/useVaultActions';
import { ChainlinkIcon, LidoIcon, WstEthIcon } from '@/components/TokenIcons';

type Tab = 'deposit' | 'withdraw';

export function VaultPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('deposit');
  const [depositAmount, setDepositAmount] = useState('');
  const { address } = useAccount();
  const { ready, authenticated: isConnected, login } = usePrivy();
  const { data: ethBalance } = useBalance({ address });
  const { athReached, feePercent, totalWstETH, stEthPerToken, refetch: refetchVault } = useVaultData();
  const { wstETHBalance, refetch: refetchBalance } = useUserBalance(address);

  const {
    deposit,
    isPending: isDepositing,
    isConfirming: isDepositConfirming,
    isSuccess: depositSuccess,
    error: depositError,
    reset: resetDeposit,
  } = useDeposit();

  const {
    withdraw,
    isPending: isWithdrawing,
    isConfirming: isWithdrawConfirming,
    isSuccess: withdrawSuccess,
    error: withdrawError,
    reset: resetWithdraw,
  } = useWithdraw();

  useEffect(() => {
    if (depositSuccess || withdrawSuccess) {
      refetchVault();
      refetchBalance();
    }
  }, [depositSuccess, withdrawSuccess, refetchVault, refetchBalance]);

  const handleDeposit = () => {
    if (!depositAmount) return;
    deposit(depositAmount);
  };

  const handleWithdraw = () => {
    withdraw();
  };

  const setMaxDeposit = () => {
    if (!ethBalance?.formatted) return;
    const bal = parseFloat(ethBalance.formatted);
    const reserve = 0.01;
    const max = bal > reserve ? bal - reserve : bal;
    if (max > 0) {
      setDepositAmount(max.toFixed(6));
    }
  };

  const set50Deposit = () => {
    if (!ethBalance?.formatted) return;
    const bal = parseFloat(ethBalance.formatted);
    const half = bal * 0.5;
    if (half > 0) setDepositAmount(half.toFixed(6));
  };

  const set25Deposit = () => {
    if (!ethBalance?.formatted) return;
    const bal = parseFloat(ethBalance.formatted);
    const quarter = bal * 0.25;
    if (quarter > 0) setDepositAmount(quarter.toFixed(6));
  };

  const depositNum = parseFloat(depositAmount) || 0;
  const estimatedWstETH = stEthPerToken && depositNum > 0
    ? depositNum / stEthPerToken
    : 0;

  const earlyWithdrawAmount = parseFloat(wstETHBalance) * (1 - feePercent / 100);
  const feeAmount = parseFloat(wstETHBalance) * (feePercent / 100);
  const maxBal = ethBalance ? parseFloat(ethBalance.formatted) : 0;

  return (
    <div className="w-full max-w-[1600px] mx-auto mt-6 px-4 sm:px-6">
      {/* Page title */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <LidoIcon size={56} />
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px]" style={{ lineHeight: 1, fontWeight: 700, color: '#000000' }}>
          Diamond wstETH
        </h1>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

      {/* Left column: tabs + widget */}
      <div className="flex flex-col">
        {/* Tabs centered above widget */}
        <div className="flex items-center justify-center gap-2 mb-3 px-2">
          <button
            type="button"
            onClick={() => { setActiveTab('deposit'); resetDeposit(); resetWithdraw(); }}
            className={`text-sm px-4 py-2 transition-colors ${activeTab === 'deposit' ? 'bg-[#0F0F660D]' : 'hover:bg-[#0F0F660D]'}`}
            style={{ borderRadius: '24px', color: 'rgb(20, 20, 23)', fontWeight: 500 }}
          >
            Deposit
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('withdraw'); resetDeposit(); resetWithdraw(); }}
            className={`text-sm px-4 py-2 transition-colors ${activeTab === 'withdraw' ? 'bg-[#0F0F660D]' : 'hover:bg-[#0F0F660D]'}`}
            style={{ borderRadius: '24px', color: 'rgb(20, 20, 23)', fontWeight: 500 }}
          >
            Withdraw
          </button>
        </div>

      {/* Card */}
      <div className="flex-1" style={{ background: '#ffffff', padding: '24px' }}>
        {activeTab === 'deposit' ? (
          <>
            {/* Pay section */}
            <div className="mb-1">
              <div className="flex items-center gap-3 mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>
                <span>Pay on Ethereum</span>
                <button type="button" onClick={setMaxDeposit} className="hover:opacity-70" style={{ color: 'rgb(30, 30, 232)', fontWeight: 500 }}>
                  Max {maxBal.toFixed(7)}
                </button>
                <button type="button" onClick={set50Deposit} className="hover:opacity-70" style={{ color: 'rgb(30, 30, 232)', fontWeight: 500 }}>
                  50%
                </button>
                <button type="button" onClick={set25Deposit} className="hover:opacity-70" style={{ color: 'rgb(30, 30, 232)', fontWeight: 500 }}>
                  25%
                </button>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <input
                    type="number"
                    placeholder="0"
                    value={depositAmount}
                    onChange={(e) => { setDepositAmount(e.target.value); resetDeposit(); }}
                    className="bg-transparent outline-none placeholder:text-[#ccc]"
                    style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000', width: depositAmount ? `${Math.max(2, depositAmount.length)}ch` : '2ch' }}
                    min="0"
                    step="0.01"
                  />
                  <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: 'rgb(118, 119, 122)' }}>ETH</span>
                </div>
              </div>
            </div>

            {/* Divider + arrow */}
            <div className="flex items-center my-3">
              <div className="flex-1" style={{ height: '1px', background: '#e0e0e0' }} />
              <div className="mx-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1" style={{ height: '1px', background: '#e0e0e0' }} />
            </div>

            {/* Receive section */}
            <div className="mb-6">
              <p className="mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>Receive on Ethereum</p>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>
                    {estimatedWstETH > 0 ? estimatedWstETH.toFixed(6) : '0'}
                  </span>
                  <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: 'rgb(118, 119, 122)' }}>wstETH</span>
                </div>
              </div>
            </div>

            {/* Alerts */}
            {athReached && (
              <div className="mb-4 flex items-start gap-2 px-3 py-2.5 bg-green/8 rounded-xl">
                <span className="text-sm shrink-0">✅</span>
                <p className="text-[13px] text-green m-0 leading-snug">ATH reached! Deposits are paused - withdraw fee-free.</p>
              </div>
            )}

            {/* Button */}
            <div className="flex items-center justify-center gap-3">
              {!isConnected ? (
                <button
                  type="button"
                  onClick={login}
                  className="flex-1 py-4 hover:opacity-80 transition-opacity"
                  style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700 }}
                >
                  Вход
                </button>
              ) : athReached ? (
                <button type="button" disabled className="flex-1 py-4" style={{ background: '#e8e8ed', borderRadius: '28px', color: 'rgb(118, 119, 122)', fontSize: '16px', fontWeight: 700 }}>
                  Deposits Disabled
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDeposit}
                  disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isDepositing || isDepositConfirming}
                  className="flex-1 py-4 hover:opacity-80 transition-opacity disabled:opacity-50"
                  style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700 }}
                >
                  {isDepositing
                    ? 'Confirm in Wallet...'
                    : isDepositConfirming
                    ? 'Depositing...'
                    : depositSuccess
                    ? 'Deposited!'
                    : 'Deposit ETH'}
                </button>
              )}
            </div>

            {depositError && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-pink/6 rounded-xl">
                <span className="text-sm shrink-0">🚨</span>
                <p className="text-[13px] text-pink m-0 leading-snug break-all">{(depositError as Error).message?.split('\n')[0]}</p>
              </div>
            )}
            {depositSuccess && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-green/8 rounded-xl">
                <span className="text-sm shrink-0">✅</span>
                <p className="text-[13px] text-green m-0 leading-snug">Deposit successful!</p>
              </div>
            )}

            {/* Exchange rate */}
            <div className="mt-5 flex items-center justify-center gap-2" style={{ color: 'rgb(118, 119, 122)', fontSize: '13px' }}>
              <span>1 ETH</span>
              <span>⇄</span>
              <span>{stEthPerToken ? (1 / stEthPerToken).toFixed(6) : '—'} wstETH</span>
            </div>
          </>
        ) : (
          <>
            {/* Withdraw balance */}
            <div className="mb-1">
              <p className="mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>Your vault balance</p>
              <div className="flex items-baseline gap-2">
                <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>
                  {parseFloat(wstETHBalance).toFixed(6)}
                </span>
                <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: 'rgb(118, 119, 122)' }}>wstETH</span>
              </div>
            </div>

            {/* Fee info */}
            {!athReached && parseFloat(wstETHBalance) > 0 && (
              <>
                <div className="flex items-center my-3">
                  <div className="flex-1" style={{ height: '1px', background: '#e0e0e0' }} />
                </div>
                <div className="mb-6">
                  <p className="mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>You receive after {feePercent}% exit fee</p>
                  <div className="flex items-baseline gap-2">
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000' }}>
                      {earlyWithdrawAmount.toFixed(6)}
                    </span>
                    <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: 'rgb(118, 119, 122)' }}>wstETH</span>
                  </div>
                </div>
              </>
            )}

            {athReached && parseFloat(wstETHBalance) > 0 && (
              <div className="mt-3 mb-4 flex items-start gap-2 px-3 py-2.5 bg-green/8 rounded-xl">
                <span className="text-sm shrink-0">✅</span>
                <p className="text-[13px] text-green m-0 leading-snug">ATH reached! Zero fees.</p>
              </div>
            )}

            {/* Button */}
            <div className="mt-4 flex items-center justify-center">
              {!isConnected ? (
                <button
                  type="button"
                  onClick={login}
                  className="flex-1 py-4 hover:opacity-80 transition-opacity"
                  style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700 }}
                >
                  Вход
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleWithdraw}
                  disabled={parseFloat(wstETHBalance) <= 0 || isWithdrawing || isWithdrawConfirming}
                  className="flex-1 py-4 hover:opacity-80 transition-opacity disabled:opacity-50"
                  style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700 }}
                >
                  {isWithdrawing
                    ? 'Confirm in Wallet...'
                    : isWithdrawConfirming
                    ? 'Withdrawing...'
                    : withdrawSuccess
                    ? 'Withdrawn!'
                    : parseFloat(wstETHBalance) <= 0
                    ? 'No Balance'
                    : athReached
                    ? 'Withdraw (No Fee)'
                    : `Withdraw (${feePercent}% Fee)`}
                </button>
              )}
            </div>

            {withdrawError && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-pink/6 rounded-xl">
                <span className="text-sm shrink-0">🚨</span>
                <p className="text-[13px] text-pink m-0 leading-snug break-all">{(withdrawError as Error).message?.split('\n')[0]}</p>
              </div>
            )}
            {withdrawSuccess && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-green/8 rounded-xl">
                <span className="text-sm shrink-0">✅</span>
                <p className="text-[13px] text-green m-0 leading-snug">Withdrawal successful!</p>
              </div>
            )}
          </>
        )}
      </div>
      </div>{/* end left column */}

      {/* Vault info — right column */}
      <div className="flex flex-col">
        {/* Spacer matching tabs height so both columns align */}
        <div className="mb-3" style={{ height: '36px' }} />
        <div className="vault-card p-8 sm:p-10 flex flex-col flex-1">
        <span className="inline-block self-start text-[13px] font-semibold text-white px-3 py-1 mb-5" style={{ background: '#000' }}>
          Vault Details
        </span>

        <h3 className="text-[22px] mb-2" style={{ fontWeight: 700, color: '#000' }}>
          Diamond wstETH
        </h3>
        <p className="text-[18px] leading-relaxed mb-8" style={{ color: 'rgb(118, 119, 122)', fontWeight: 500 }}>
          Lock ETH as wstETH until a new all-time high. Earn staking yield while you wait.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-[13px] mb-1" style={{ color: 'rgb(118, 119, 122)' }}>TVL</p>
            <p className="text-[18px]" style={{ fontWeight: 700, color: '#000' }}>{parseFloat(totalWstETH).toFixed(4)}</p>
            <div className="flex items-center gap-1.5">
              <WstEthIcon size={16} />
              <span className="text-[14px]" style={{ fontWeight: 500, color: 'rgb(118, 119, 122)' }}>wstETH</span>
            </div>
          </div>
          <div>
            <p className="text-[13px] mb-1" style={{ color: 'rgb(118, 119, 122)' }}>Early exit fee</p>
            <p className="text-[18px]" style={{ fontWeight: 700, color: '#000' }}>{athReached ? 'None' : `${feePercent}%`}</p>
          </div>
          <div>
            <p className="text-[13px] mb-1" style={{ color: 'rgb(118, 119, 122)' }}>Yield source</p>
            <a href="https://lido.fi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <LidoIcon size={18} />
              <p className="text-[18px]" style={{ fontWeight: 700, color: '#000' }}>Lido</p>
            </a>
          </div>
          <div>
            <p className="text-[13px] mb-1" style={{ color: 'rgb(118, 119, 122)' }}>Price oracle</p>
            <a href="https://data.chain.link/feeds/ethereum/mainnet/eth-usd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <ChainlinkIcon size={18} />
              <p className="text-[18px]" style={{ fontWeight: 700, color: '#000' }}>Chainlink</p>
            </a>
          </div>
          <div>
            <p className="text-[13px] mb-1" style={{ color: 'rgb(118, 119, 122)' }}>Contract</p>
            <a
              href="https://etherscan.io/address/0x3548A8345A37f58F232F97eB050C937fb660D514"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              style={{ fontSize: '18px', fontWeight: 700, color: '#000' }}
            >
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
