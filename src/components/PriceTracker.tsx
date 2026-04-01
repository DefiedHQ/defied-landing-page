'use client';

import { useVaultData } from '@/hooks/useVaultData';
import { ChainlinkIcon } from '@/components/TokenIcons';

export function PriceTracker() {
  const { currentPrice, allTimeHighTarget, percentToATH, athReached } = useVaultData();

  const progressPercent = currentPrice
    ? Math.min(100, (currentPrice / allTimeHighTarget) * 100)
    : 0;

  return (
    <div className="w-full max-w-[480px] mx-auto px-2">
      <div className="bg-card p-6 sm:p-8">
        {/* Chainlink price feed badge */}
        <a href="https://data.chain.link/feeds/ethereum/mainnet/eth-usd" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 mb-5 hover:opacity-80 transition-opacity">
          <ChainlinkIcon size={16} />
          <span className="text-[13px] font-semibold" style={{ color: 'rgb(118, 119, 122)' }}>Price Feed by Chainlink</span>
        </a>

        {athReached && (
          <div className="flex justify-end mb-4">
            <span className="text-[11px] font-semibold text-green bg-green/10 px-2 py-0.5 rounded-full">
              ATH Reached
            </span>
          </div>
        )}

        <div className="flex items-baseline justify-between mb-6 mt-4">
          <div>
            <p className="text-[14px] font-medium mb-1" style={{ color: 'rgb(118, 119, 122)' }}>Current</p>
            <p className="text-2xl font-bold" style={{ color: '#000000' }}>
              {currentPrice ? `$${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '\u2014'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[14px] font-medium mb-1" style={{ color: 'rgb(118, 119, 122)' }}>ATH Target</p>
            <p className="text-2xl font-bold" style={{ color: '#000000' }}>
              ${allTimeHighTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-3 bg-surface2 overflow-hidden mb-2">
          <div
            className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
            style={{
              width: `${progressPercent}%`,
              background: athReached ? '#40b66b' : 'rgb(30, 30, 232)',
            }}
          />
        </div>

        <div className="flex justify-between text-[13px] font-medium" style={{ color: 'rgb(118, 119, 122)' }}>
          <span>{progressPercent.toFixed(1)}% of target</span>
          {!athReached && percentToATH !== undefined && (
            <span>{percentToATH.toFixed(2)}% to go</span>
          )}
        </div>
      </div>
    </div>
  );
}
