'use client';

import { AaveIcon, CompoundIcon, YOIcon, UsdcIcon, EurcIcon } from '@/components/TokenIcons';

const YIELDS = [
  { symbol: 'USDC', apy: '5.49', TokenIcon: UsdcIcon },
  { symbol: 'EURC', apy: '1.89', TokenIcon: EurcIcon },
];

const PROTOCOLS = [
  { Icon: AaveIcon, label: 'Aave' },
  { Icon: CompoundIcon, label: 'Compound' },
  { Icon: YOIcon, label: 'Yo' },
];

function ProtocolStack() {
  return (
    <div className="flex items-center">
      {PROTOCOLS.map(({ Icon, label }, i) => (
        <div
          key={label}
          title={label}
          style={{
            marginLeft: i > 0 ? '-8px' : 0,
            zIndex: PROTOCOLS.length - i,
            borderRadius: '50%',
            border: '2px solid #fff',
            lineHeight: 0,
          }}
        >
          <Icon size={28} />
        </div>
      ))}
    </div>
  );
}

export function YieldWidget() {
  return (
    <div className="w-full max-w-[528px] mx-auto px-2">
      <div className="bg-card p-6 sm:p-8">
        <p className="text-center mb-6" style={{ fontSize: '14px', fontWeight: 500, color: 'rgb(118, 119, 122)' }}>
          Годишна Доходност (APY)
        </p>

        <div className="flex flex-col gap-5">
          {YIELDS.map(({ symbol, apy, TokenIcon }) => (
            <div key={symbol} className="flex items-center justify-between gap-4">
              {/* Token */}
              <div className="flex items-center gap-2.5 min-w-[90px]">
                <TokenIcon size={32} />
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#000' }}>{symbol}</span>
              </div>

              {/* Protocol icons */}
              <ProtocolStack />

              {/* APY */}
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#000', letterSpacing: '-0.5px' }}>
                {apy}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
