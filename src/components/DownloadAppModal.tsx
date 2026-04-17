'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { useLanguage } from '@/context/LanguageContext';

interface DownloadAppModalProps {
  open: boolean;
  onClose: () => void;
}

export function DownloadAppModal({ open, onClose }: DownloadAppModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      className={`dl-modal-backdrop${open ? ' dl-modal-backdrop--open' : ''}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dl-modal-title"
        className={`dl-modal-card${open ? ' dl-modal-card--open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="dl-modal-close"
          aria-label={t('downloadApp.close')}
        >
          <Icon name="close" size="m" dangerouslySetColor="#000000" accessibilityLabel={t('downloadApp.close')} />
        </button>

        <div className="dl-modal-content">
          <Text
            as="h2"
            id="dl-modal-title"
            font="display2"
            className="title-tight-lh"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 500,
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            {t('downloadApp.title')}
          </Text>

          <Text
            as="p"
            font="body"
            color="fgMuted"
            style={{
              fontSize: '17px',
              lineHeight: '26px',
              textAlign: 'center',
              marginTop: '12px',
            }}
          >
            {t('downloadApp.subtitle')}
          </Text>

          <div className="dl-modal-qr" aria-label={t('downloadApp.comingSoon')}>
            <div className="dl-modal-qr-pattern" aria-hidden="true">
              <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                {/* Corner finders */}
                <rect x="4" y="4" width="22" height="22" rx="3" fill="none" stroke="#0A0B0D" strokeWidth="4" />
                <rect x="10" y="10" width="10" height="10" rx="1" fill="#0A0B0D" />
                <rect x="74" y="4" width="22" height="22" rx="3" fill="none" stroke="#0A0B0D" strokeWidth="4" />
                <rect x="80" y="10" width="10" height="10" rx="1" fill="#0A0B0D" />
                <rect x="4" y="74" width="22" height="22" rx="3" fill="none" stroke="#0A0B0D" strokeWidth="4" />
                <rect x="10" y="80" width="10" height="10" rx="1" fill="#0A0B0D" />
                {/* Random data cells */}
                {Array.from({ length: 140 }).map((_, i) => {
                  const cols = 14;
                  const col = i % cols;
                  const row = Math.floor(i / cols);
                  const x = 30 + col * 4.5;
                  const y = 30 + row * 4.5;
                  if (x > 68 || y > 92) return null;
                  const seed = (i * 7919) % 11;
                  if (seed < 5) return null;
                  return <rect key={i} x={x} y={y} width="3.5" height="3.5" fill="#0A0B0D" />;
                })}
              </svg>
            </div>
            <div className="dl-modal-qr-overlay">
              <span className="dl-modal-coming-soon">{t('downloadApp.comingSoon')}</span>
            </div>
          </div>

          <div className="dl-modal-stores">
            <Image
              src="/ios_app_store.svg"
              alt="Download on the App Store"
              width={336}
              height={112}
              className="dl-modal-store-badge"
            />
            <Image
              src="/google_play_app_store.svg"
              alt="Get it on Google Play"
              width={376}
              height={112}
              className="dl-modal-store-badge"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
