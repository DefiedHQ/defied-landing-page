'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AaveIcon, CompoundIcon, UsdcIcon, EurcIcon } from '@/components/TokenIcons';
import { useLanguage } from '@/context/LanguageContext';
import vaults from '@/data/vaults.json';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  AaveIcon,
  CompoundIcon,
  UsdcIcon,
  EurcIcon,
};

const VAULT_KEY_MAP: Record<string, string> = {
  'aave-usdc': 'aaveUsdc',
  'aave-eurc': 'aaveEurc',
  'compound-usdc': 'compoundUsdc',
};

type Filter = 'ALL' | 'USDC' | 'EURC';

const filters: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'earn.filterAll' },
  { key: 'USDC', label: 'USDC' },
  { key: 'EURC', label: 'EURC' },
];

export function VaultsGrid() {
  const [filter, setFilter] = useState<Filter>('ALL');
  const { t } = useLanguage();

  const filtered = filter === 'ALL' ? vaults : vaults.filter(v => v.tokenName === filter);

  return (
    <div className="w-full max-w-[984px] mx-auto pb-16">
      {/* Hero — same style as resources page */}
      <div className="mb-12">
        <h1 className="text-[32px] sm:text-[52px] md:text-[72px] mt-12 sm:mt-[120px] mb-4 sm:mb-6" style={{ fontWeight: 500, lineHeight: 1, maxWidth: '800px', color: '#0A0B0D' }}>
          {t('earn.title')}
        </h1>
        <p className="text-base sm:text-lg md:text-2xl" style={{ color: '#6b7280', lineHeight: '1.4', maxWidth: '640px', fontWeight: 500 }}>
          {t('earn.subtitle')}
        </p>
      </div>

      {/* Filters — same design as resources */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
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
              background: filter === key ? '#0052FF' : '#F5F8FF',
              color: filter === key ? '#fff' : '#374151',
            }}
          >
            {key === 'ALL' ? t(label) : label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(vault => {
          const YieldIcon = ICON_MAP[vault.yieldIcon];
          const TokenIcon = ICON_MAP[vault.tokenIcon];
          const vaultKey = VAULT_KEY_MAP[vault.id] ?? vault.id;

          const cardContent = (
            <>
              <span className="inline-block self-start text-[13px] font-medium text-white px-3 py-1 mb-5" style={{ background: '#0052FF', borderRadius: '100px' }}>
                {vault.badge}
              </span>

              <h3 className="text-[22px] mb-2" style={{ fontWeight: 500, color: '#0A0B0D' }}>
                {t(`vaults.${vaultKey}.title`)}
              </h3>
              <p className="flex-1 text-[18px] leading-relaxed mb-8 vault-card-desc" style={{ color: '#5B616E', fontWeight: 400 }}>
                {t(`vaults.${vaultKey}.description`)}
              </p>

              <div className="flex gap-6 mb-8">
                <div>
                  <p className="text-[13px] mb-1" style={{ color: '#5B616E' }}>{t('earn.apr')}</p>
                  <p className="text-[18px]" style={{ fontWeight: 500, color: '#0A0B0D' }}>{vault.apr}</p>
                </div>
                <div>
                  <p className="text-[13px] mb-1" style={{ color: '#5B616E' }}>{t('earn.protocol')}</p>
                  <div className="flex items-center gap-1.5">
                    <YieldIcon size={18} />
                    <p className="text-[18px]" style={{ fontWeight: 500, color: '#0A0B0D' }}>{vault.yieldSource}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[13px] mb-1" style={{ color: '#5B616E' }}>{t('earn.asset')}</p>
                  <div className="flex items-center gap-1.5">
                    <TokenIcon size={18} />
                    <p className="text-[18px]" style={{ fontWeight: 500, color: '#0A0B0D' }}>{vault.tokenName}</p>
                  </div>
                </div>
              </div>

              <div>
                <span
                  className="inline-block px-8 py-3.5 vault-card-btn"
                  style={{ borderRadius: '100px', fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}
                >
                  {t(`vaults.${vaultKey}.cta`)}
                </span>
              </div>
            </>
          );

          return vault.href ? (
            <Link
              key={vault.id}
              href={vault.href}
              className={`p-8 sm:p-10 text-left flex flex-col transition-colors vault-card ${vault.cardClass}`}
            >
              {cardContent}
            </Link>
          ) : (
            <div
              key={vault.id}
              className={`p-8 sm:p-10 text-left flex flex-col vault-card ${vault.cardClass}`}
            >
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
