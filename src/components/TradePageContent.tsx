'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useFundWallet } from '@privy-io/react-auth';
import { useAccount } from 'wagmi';
import { useLanguage } from '@/context/LanguageContext';
import { mainnet } from 'viem/chains';

export function TradePageContent() {
  const { t } = useLanguage();
  const { ready, authenticated, login } = usePrivy();
  const { address } = useAccount();
  const { fundWallet } = useFundWallet();

  const handleBuy = async () => {
    if (!authenticated) {
      login();
      return;
    }
    if (!address) return;

    await fundWallet({
      address,
      options: {
        chain: mainnet,
        card: {
          preferredProvider: 'moonpay',
        },
      },
    });
  };

  return (
    <div className="w-full max-w-[984px] mx-auto pb-16">
      <div className="mb-12">
        <h1 className="text-[32px] sm:text-[52px] md:text-[72px] mt-12 sm:mt-[120px] mb-4 sm:mb-6" style={{ fontWeight: 600, lineHeight: 1, maxWidth: '800px', color: '#000' }}>
          {t('trade.title')}
        </h1>
        <p className="text-base sm:text-lg md:text-2xl" style={{ color: '#6b7280', lineHeight: '1.4', maxWidth: '640px', fontWeight: 500 }}>
          {t('trade.subtitle')}
        </p>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Buy Crypto Card */}
        <div
          style={{
            flex: '1 1 440px',
            maxWidth: '100%',
            background: '#fff',
            padding: '32px',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '8px' }}>
            {t('trade.buyCrypto')}
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '24px', marginBottom: '24px' }}>
            {t('trade.buyCryptoDesc')}
          </p>
          <button
            type="button"
            onClick={handleBuy}
            disabled={!ready}
            style={{
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '28px',
              fontSize: '16px',
              fontWeight: 700,
              padding: '12px 32px',
              cursor: ready ? 'pointer' : 'default',
              opacity: ready ? 1 : 0.5,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => { if (ready) e.currentTarget.style.background = '#333'; }}
            onMouseLeave={(e) => { if (ready) e.currentTarget.style.background = '#000'; }}
          >
            {authenticated ? t('trade.buyAction') : t('trade.loginRequired')}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>Подържано от</span>
            <img src="/MoonPay.svg" alt="MoonPay" style={{ height: '70px' }} />
          </div>
        </div>

        {/* Sell Crypto Card */}
        <div
          style={{
            flex: '1 1 440px',
            maxWidth: '100%',
            background: '#fff',
            padding: '32px',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '8px' }}>
            {t('trade.sellCrypto')}
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '24px', marginBottom: '24px' }}>
            {t('trade.sellCryptoDesc')}
          </p>
          <button
            type="button"
            disabled
            style={{
              background: '#e5e7eb',
              color: '#9ca3af',
              border: 'none',
              borderRadius: '28px',
              fontSize: '16px',
              fontWeight: 700,
              padding: '12px 32px',
              cursor: 'default',
            }}
          >
            {t('trade.sellAction')}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>Подържано от</span>
            <img src="/MoonPay.svg" alt="MoonPay" style={{ height: '70px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
