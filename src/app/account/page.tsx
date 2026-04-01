'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AaveIcon, CompoundIcon, UsdcIcon, EurcIcon } from '@/components/TokenIcons';
import { USDC_ADDRESS, EURC_ADDRESS } from '@/config/erc4626';
import { parseUnits, isAddress, createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { useAccount, useBalance, useWaitForTransactionReceipt } from 'wagmi';
import QRCode from 'react-qr-code';

const ERC20_TRANSFER_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

type SendAsset = 'USDC' | 'EURC';

const TOKEN_ADDRESSES: Record<SendAsset, `0x${string}`> = {
  USDC: USDC_ADDRESS,
  EURC: EURC_ADDRESS,
};

export default function AccountPage() {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find((w) => w.walletClientType === 'privy');
  const address = embeddedWallet?.address as `0x${string}` | undefined;
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [receiveCopied, setReceiveCopied] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [sendAsset, setSendAsset] = useState<SendAsset>('USDC');

  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const copyAddressReceive = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setReceiveCopied(true);
    setTimeout(() => setReceiveCopied(false), 1500);
  };

  const { address: wagmiAddress } = useAccount();
  const { data: usdcBalance } = useBalance({ address: wagmiAddress, token: USDC_ADDRESS });
  const { data: eurcBalance } = useBalance({ address: wagmiAddress, token: EURC_ADDRESS });
  const selectedBalance = sendAsset === 'USDC' ? usdcBalance : eurcBalance;

  const isValidAddress = isAddress(sendTo);

  const [sendStatus, setSendStatus] = useState<'idle' | 'pending' | 'confirming' | 'success' | 'error'>('idle');
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendTxHash, setSendTxHash] = useState<`0x${string}` | undefined>(undefined);
  const { isLoading: isSendConfirming, isSuccess: isSendSuccess } = useWaitForTransactionReceipt({ hash: sendTxHash });

  const handleSend = async () => {
    if (!embeddedWallet || !isValidAddress || !sendAmount || parseFloat(sendAmount) <= 0) return;
    setSendStatus('pending');
    setSendError(null);
    try {
      const provider = await embeddedWallet.getEthereumProvider();
      const walletClient = createWalletClient({
        account: embeddedWallet.address as `0x${string}`,
        chain: mainnet,
        transport: custom(provider),
      });
      const hash = await walletClient.writeContract({
        address: TOKEN_ADDRESSES[sendAsset],
        abi: ERC20_TRANSFER_ABI,
        functionName: 'transfer',
        args: [sendTo as `0x${string}`, parseUnits(sendAmount, 6)],
      });
      setSendTxHash(hash);
      setSendStatus('confirming');
    } catch (err) {
      setSendStatus('error');
      setSendError((err as Error).message?.split('\n')[0] ?? 'Грешка при изпращане');
    }
  };

  useEffect(() => {
    if (isSendSuccess) setSendStatus('success');
  }, [isSendSuccess]);

  const closeSendModal = () => {
    setSendOpen(false);
    setSendAmount('');
    setSendTo('');
    setSendAsset('USDC');
    setSendStatus('idle');
    setSendError(null);
    setSendTxHash(undefined);
  };

  useEffect(() => {
    if (ready && !authenticated) {
      router.replace('/');
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) return null;

  return (
    <section className="w-full max-w-[984px] mx-auto pb-16">
      <div className="mb-12">
        <h1 className="text-[32px] sm:text-[52px] md:text-[72px] mt-12 sm:mt-[120px] mb-4 sm:mb-6" style={{ fontWeight: 600, lineHeight: 1, maxWidth: '800px', color: '#000' }}>
          Акаунт
        </h1>
        <p className="text-base sm:text-lg md:text-2xl" style={{ color: '#6b7280', lineHeight: '1.4', maxWidth: '640px', fontWeight: 500 }}>
          Тук ще откриете вашите баланси, транзакции и спечелена доходност на едно място.
        </p>
      </div>

      {/* All cards in a flex-wrap grid matching /trade page */}
      <div className="flex flex-wrap gap-6" style={{ marginBottom: '40px' }}>
        {/* Blue wallet card */}
        <div
          style={{
            flex: '1 1 100%',
            height: '225px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            position: 'relative',
            padding: '32px',
            background: '#0000FF',
            cursor: 'pointer',
            pointerEvents: 'auto',
            textDecoration: 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <button
              type="button"
              onClick={copyAddress}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              title="Копирай адрес"
            >
              <span>{address ? `${address.slice(0, 6)}…${address.slice(-4)}` : '—'}</span>
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10.5L8 14.5L16 6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <rect x="6" y="6" width="10" height="10" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                  <path d="M4 14V4C4 3.44772 4.44772 3 5 3H13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', zIndex: 3 }}><AaveIcon size={28} /></div>
              <div style={{ position: 'relative', zIndex: 2, marginLeft: '-8px' }}><CompoundIcon size={28} /></div>
              <div style={{ position: 'relative', zIndex: 1, marginLeft: '-8px' }}><UsdcIcon size={28} /></div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              $0.00
            </div>
            <svg width="44" height="44" viewBox="0 0 400 400" fill="none">
              <rect width="400" height="400" fill="#F7F7F8" />
              <rect x="107" y="227" width="110" height="110" fill="#0000FF" />
              <path d="M183 63H293V337H183V63Z" fill="#0000FF" />
            </svg>
          </div>
        </div>

        {/* Send card */}
        <div style={{ flex: '1 1 440px', maxWidth: '100%', background: 'rgb(255, 255, 255)', padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(0, 0, 0)', marginBottom: '8px' }}>
            Изпрати пари
          </h2>
          <p style={{ fontSize: '16px', color: 'rgb(107, 114, 128)', lineHeight: '24px', marginBottom: '24px' }}>
            Изпрати USDC или EURC към друг адрес.
          </p>
          <button
            type="button"
            onClick={() => setSendOpen(true)}
            style={{ background: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)', border: 'none', borderRadius: '28px', fontSize: '16px', fontWeight: 700, padding: '12px 32px', cursor: 'pointer', opacity: 1, transition: 'background 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#333'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgb(0, 0, 0)'; }}
          >
            Изпрати пари
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
            <span style={{ fontSize: '13px', color: 'rgb(156, 163, 175)' }}>Подържани валути:</span>
            <UsdcIcon size={18} />
            <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>USDC</span>
            <EurcIcon size={18} />
            <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>EURC</span>
          </div>
        </div>

        {/* Receive card */}
        <div style={{ flex: '1 1 440px', maxWidth: '100%', background: 'rgb(255, 255, 255)', padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(0, 0, 0)', marginBottom: '8px' }}>
            Получи пари
          </h2>
          <p style={{ fontSize: '16px', color: 'rgb(107, 114, 128)', lineHeight: '24px', marginBottom: '24px' }}>
            Покажи QR код или адрес за получаване.
          </p>
          <button
            type="button"
            onClick={() => setReceiveOpen(true)}
            style={{ background: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)', border: 'none', borderRadius: '28px', fontSize: '16px', fontWeight: 700, padding: '12px 32px', cursor: 'pointer', opacity: 1, transition: 'background 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#333'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgb(0, 0, 0)'; }}
          >
            Получи пари
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
            <span style={{ fontSize: '13px', color: 'rgb(156, 163, 175)' }}>Подържани валути:</span>
            <UsdcIcon size={18} />
            <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>USDC</span>
            <EurcIcon size={18} />
            <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>EURC</span>
          </div>
        </div>
      </div>

      {/* Send modal */}
      {sendOpen && (
        <div
          className="flex items-end lg:items-center justify-center"
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)' }}
          onClick={closeSendModal}
        >
          <div
            className="modal-sheet w-full lg:max-w-[440px] rounded-t-[20px] lg:rounded-none max-h-[90dvh] overflow-y-auto"
            style={{ background: '#fff', padding: '32px', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeSendModal}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#6b7280' }}
            >
              &times;
            </button>

            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>
              Изпрати пари
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
              на Ethereum мрежата
            </p>

            {/* Asset selector */}
            <div className="mb-1">
              <div className="flex items-center gap-3 mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>
                <span>Актив</span>
              </div>
              <div className="flex gap-2 mb-6">
                {(['USDC', 'EURC'] as const).map((asset) => (
                  <button
                    key={asset}
                    type="button"
                    onClick={() => setSendAsset(asset)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      padding: '8px 16px',
                      transition: 'all .2s ease',
                      background: sendAsset === asset ? '#000' : '#0F0F660D',
                      color: sendAsset === asset ? '#fff' : '#374151',
                    }}
                  >
                    {asset === 'USDC' ? <UsdcIcon size={18} /> : <EurcIcon size={18} />}
                    {asset}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount input */}
            <div className="mb-1">
              <div className="flex items-center gap-3 mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>
                <span>Сума</span>
                <button
                  type="button"
                  onClick={() => { if (selectedBalance) { setSendAmount(selectedBalance.formatted); setSendStatus('idle'); setSendError(null); } }}
                  className="hover:opacity-70"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'rgb(30, 30, 232)', fontWeight: 500 }}
                >
                  Max {selectedBalance ? parseFloat(selectedBalance.formatted).toFixed(2) : ''}
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <input
                  type="number"
                  placeholder="0"
                  value={sendAmount}
                  onChange={(e) => { setSendAmount(e.target.value); setSendStatus('idle'); setSendError(null); }}
                  className="bg-transparent outline-none placeholder:text-[#ccc]"
                  style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#000', width: sendAmount ? `${Math.max(2, sendAmount.length)}ch` : '2ch' }}
                  min="0"
                  step="any"
                />
                <span style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: 'rgb(118, 119, 122)' }}>{sendAsset}</span>
              </div>
            </div>

            {/* Divider with arrow */}
            <div className="flex items-center my-3">
              <div className="flex-1" style={{ height: '1px', background: '#e0e0e0' }} />
              <div className="mx-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1" style={{ height: '1px', background: '#e0e0e0' }} />
            </div>

            {/* Address input */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4" style={{ color: 'rgb(118, 119, 122)', fontSize: '14px' }}>
                <span>Адрес на получателя</span>
              </div>
              <div className="flex items-center gap-2" style={{ borderBottom: `1px solid ${sendTo && !isValidAddress ? '#f87171' : '#e0e0e0'}` }}>
                <input
                  type="text"
                  placeholder="0x..."
                  value={sendTo}
                  onChange={(e) => { setSendTo(e.target.value); setSendStatus('idle'); setSendError(null); }}
                  className="flex-1 bg-transparent outline-none placeholder:text-[#ccc]"
                  style={{ fontSize: '16px', fontWeight: 500, color: '#000', padding: '8px 0' }}
                />
                {isValidAddress && (
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="10" cy="10" r="9" fill="#22c55e" />
                    <path d="M6 10.5L8.5 13L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>

            {/* Send button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!sendAmount || parseFloat(sendAmount) <= 0 || !isValidAddress || sendStatus === 'pending' || sendStatus === 'confirming'}
              className="w-full py-4 hover:opacity-80 transition-opacity disabled:opacity-50"
              style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              {sendStatus === 'pending' ? 'Подписване...' : sendStatus === 'confirming' ? 'Изпращане...' : sendStatus === 'success' ? 'Изпратено!' : `Изпрати ${sendAsset}`}
            </button>

            {sendStatus === 'error' && sendError && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5" style={{ background: 'rgba(239,68,68,0.06)', borderRadius: '12px' }}>
                <span className="text-sm shrink-0">🚨</span>
                <p style={{ fontSize: '13px', color: '#ef4444', margin: 0, lineHeight: 1.4, wordBreak: 'break-all' }}>
                  {sendError}
                </p>
              </div>
            )}

            {sendStatus === 'success' && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5" style={{ background: 'rgba(34,197,94,0.08)', borderRadius: '12px' }}>
                <span className="text-sm shrink-0">✅</span>
                <p style={{ fontSize: '13px', color: '#16a34a', margin: 0, lineHeight: 1.4 }}>
                  Транзакцията е успешна!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Receive modal */}
      {receiveOpen && (
        <div
          className="flex items-end lg:items-center justify-center"
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setReceiveOpen(false)}
        >
          <div
            className="modal-sheet w-full lg:max-w-[440px] rounded-t-[20px] lg:rounded-none max-h-[90dvh] overflow-y-auto"
            style={{ background: '#fff', padding: '32px', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setReceiveOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#6b7280' }}
            >
              &times;
            </button>

            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>
              Получи USDC / EURC
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
              на Ethereum мрежата
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', padding: '16px', background: '#F7F7F8' }}>
              <QRCode value={address ?? ''} size={200} />
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>Твоят адрес</p>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {address ? `${address.slice(0, 6)}…${address.slice(-4)}` : '—'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyAddressReceive}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#F7F7F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Копирай адрес"
                >
                  {receiveCopied ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10.5L8 14.5L16 6.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="6" y="6" width="10" height="10" rx="1" stroke="#000" strokeWidth="1.5" />
                      <path d="M4 14V4C4 3.44772 4.44772 3 5 3H13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <circle cx="10" cy="10" r="9" stroke="#6b7280" strokeWidth="1.5" />
                    <path d="M10 9V14" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="10" cy="6.5" r="0.75" fill="#6b7280" />
                  </svg>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '20px' }}>
                    Изпращайте само USDC или EURC на този адрес.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M10 4V13" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6 10L10 14L14 10" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '20px' }}>
                    Този адрес може да получава само активи на Ethereum мрежата. Не изпращайте от друга мрежа.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <circle cx="10" cy="10" r="9" stroke="#6b7280" strokeWidth="1.5" />
                    <path d="M10 6V10L13 13" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '20px' }}>
                    Транзакцията може да отнеме до 5 минути.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
