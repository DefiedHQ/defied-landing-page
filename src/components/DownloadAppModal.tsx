'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { useLanguage } from '@/context/LanguageContext';

interface DownloadAppModalProps {
  open: boolean;
  onClose: () => void;
}

type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; already?: boolean }
  | { status: 'error'; message: string };

export function DownloadAppModal({ open, onClose }: DownloadAppModalProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.paddingRight = prev.bodyPaddingRight;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setEmail('');
      setFormState({ status: 'idle' });
    }
  }, [open]);

  const submitting = formState.status === 'submitting';
  const succeeded = formState.status === 'success';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || succeeded) return;

    const trimmed = email.trim();
    if (!trimmed) {
      setFormState({
        status: 'error',
        message: t('downloadApp.waitlistErrorInvalid'),
      });
      return;
    }

    setFormState({ status: 'submitting' });

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFormState({
          status: 'error',
          message:
            res.status === 400 && data?.error
              ? t('downloadApp.waitlistErrorInvalid')
              : t('downloadApp.waitlistErrorGeneric'),
        });
        return;
      }

      setFormState({ status: 'success', already: Boolean(data?.already) });
    } catch {
      setFormState({
        status: 'error',
        message: t('downloadApp.waitlistErrorGeneric'),
      });
    }
  }

  const errorMessage =
    formState.status === 'error' ? formState.message : null;

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
              maxWidth: '420px',
            }}
          >
            {t('downloadApp.subtitle')}
          </Text>

          <form className="dl-modal-form" onSubmit={handleSubmit} noValidate>
            <label className="dl-modal-form-label" htmlFor="waitlist-email">
              {t('downloadApp.waitlistEmailLabel')}
            </label>
            <div className="dl-modal-form-row">
              <input
                id="waitlist-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formState.status === 'error') {
                    setFormState({ status: 'idle' });
                  }
                }}
                placeholder={t('downloadApp.waitlistEmailPlaceholder')}
                disabled={submitting || succeeded}
                aria-invalid={formState.status === 'error'}
                aria-describedby={errorMessage ? 'waitlist-error' : undefined}
                className="dl-modal-form-input"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={submitting || succeeded}
                loading={submitting}
                className="btn-fw-500 dl-modal-form-button"
                style={{ borderRadius: '9999px', height: '56px', padding: '0 28px' }}
              >
                {submitting
                  ? t('downloadApp.waitlistSubmitting')
                  : t('downloadApp.waitlistSubmit')}
              </Button>
            </div>

            {errorMessage && (
              <p id="waitlist-error" className="dl-modal-form-error" role="alert">
                {errorMessage}
              </p>
            )}

            {succeeded && (
              <p className="dl-modal-form-success" role="status">
                {formState.already
                  ? t('downloadApp.waitlistAlready')
                  : t('downloadApp.waitlistSuccess')}
              </p>
            )}
          </form>

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
