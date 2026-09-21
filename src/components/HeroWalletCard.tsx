'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';
import { LogoMark } from '@/components/LogoMark';

/*
 * Hero wallet card - the product doing what the headline promises (hold,
 * send, exchange, use onchain markets), as a live activity feed styled after
 * the app's own Transactions list: counterparty avatar or protocol mark with
 * the currency flag badged bottom-end, "@handle" + "Action · note", and the
 * amount in the row's own currency. Every ACTIVITY_INTERVAL_MS a new row
 * arrives at the top, the oldest slides out at the bottom and the balance
 * counts to its new value. The cycle nets to zero so the balance loops. No
 * rates anywhere: this is a wallet, not a savings product.
 *
 * Motion: transform/opacity only. Paused while off-screen (useInView) and
 * frozen to a static snapshot under prefers-reduced-motion.
 */

type Currency = 'EUR' | 'USD';
type Protocol = 'Aave' | 'Fluid';

type WalletEvent = {
  id: number;
  kind: 'received' | 'sent' | 'exchange' | 'deposit' | 'withdraw';
  /** "name@defied.me" for people, the protocol name for markets; exchanges use the i18n label */
  title?: string;
  protocol?: Protocol;
  /** i18n key under hero.card for a note appended after the action */
  noteKey?: string;
  /** Currency of the row (drives the flag badge and the amount sign) */
  currency: Currency;
  /** Row amount in that currency, in cents (unsigned; kind gives the sign) */
  amountCents: number;
  /** Exchange rows: what came back, in the other currency */
  toCurrency?: Currency;
  toAmountCents?: number;
  /** Change to the euro total, in cents (USD rows converted) */
  deltaCents: number;
};

export type WalletCardVariant = 'wallet' | 'markets' | 'payments';

type VariantConfig = {
  /** Events cycle in order; net delta of one full cycle is 0 so the balance loops cleanly */
  cycle: Omit<WalletEvent, 'id'>[];
  startBalanceCents: number;
  balanceLabelKey: string;
  ariaLabelKey: string;
  /** Header chips: the two currencies, or the two markets */
  chips: 'currencies' | 'protocols';
};

/* deltaCents is relative to the card's own balance: in the wallet and
   payments cards a deposit leaves the balance; in the markets card (balance
   = money in markets) a deposit adds to it. The sign shown on each row
   follows deltaCents, so the same word reads correctly in both. */
const VARIANTS: Record<WalletCardVariant, VariantConfig> = {
  wallet: {
    startBalanceCents: 236000,
    balanceLabelKey: 'balanceLabel',
    ariaLabelKey: 'ariaLabel',
    chips: 'currencies',
    cycle: [
      { kind: 'received', title: 'ivan@defied.me', noteKey: 'noteDinner', currency: 'EUR', amountCents: 50000, deltaCents: 50000 },
      { kind: 'sent', title: 'maria@defied.me', noteKey: 'noteRent', currency: 'EUR', amountCents: 12000, deltaCents: -12000 },
      { kind: 'exchange', currency: 'USD', amountCents: 20000, toCurrency: 'EUR', toAmountCents: 18400, deltaCents: 18400 },
      { kind: 'deposit', title: 'Aave', protocol: 'Aave', currency: 'EUR', amountCents: 40000, deltaCents: -40000 },
      { kind: 'sent', title: 'elena@defied.me', noteKey: 'noteTickets', currency: 'USD', amountCents: 6000, deltaCents: -5500 },
      { kind: 'withdraw', title: 'Fluid', protocol: 'Fluid', currency: 'USD', amountCents: 17000, deltaCents: 15600 },
      { kind: 'received', title: 'petar@defied.me', currency: 'EUR', amountCents: 3500, deltaCents: 3500 },
      { kind: 'exchange', currency: 'EUR', amountCents: 30000, toCurrency: 'USD', toAmountCents: 32600, deltaCents: -30000 },
    ],
  },
  markets: {
    startBalanceCents: 184000,
    balanceLabelKey: 'inMarketsLabel',
    ariaLabelKey: 'ariaLabelMarkets',
    chips: 'protocols',
    cycle: [
      { kind: 'deposit', title: 'Aave', protocol: 'Aave', currency: 'EUR', amountCents: 40000, deltaCents: 40000 },
      { kind: 'withdraw', title: 'Fluid', protocol: 'Fluid', currency: 'USD', amountCents: 17000, deltaCents: -15600 },
      { kind: 'deposit', title: 'Fluid', protocol: 'Fluid', currency: 'USD', amountCents: 25000, deltaCents: 23000 },
      { kind: 'withdraw', title: 'Aave', protocol: 'Aave', currency: 'EUR', amountCents: 12000, deltaCents: -12000 },
      { kind: 'deposit', title: 'Aave', protocol: 'Aave', currency: 'EUR', amountCents: 20000, deltaCents: 20000 },
      { kind: 'withdraw', title: 'Fluid', protocol: 'Fluid', currency: 'USD', amountCents: 60200, deltaCents: -55400 },
    ],
  },
  payments: {
    startBalanceCents: 142000,
    balanceLabelKey: 'balanceLabel',
    ariaLabelKey: 'ariaLabelPayments',
    chips: 'currencies',
    cycle: [
      { kind: 'received', title: 'ana@defied.me', noteKey: 'noteInvoice', currency: 'EUR', amountCents: 125000, deltaCents: 125000 },
      { kind: 'sent', title: 'georgi@defied.me', noteKey: 'noteRent', currency: 'EUR', amountCents: 64000, deltaCents: -64000 },
      { kind: 'received', title: 'lea@defied.me', noteKey: 'noteSplit', currency: 'USD', amountCents: 4200, deltaCents: 3900 },
      { kind: 'sent', title: 'nikola@defied.me', noteKey: 'noteGroceries', currency: 'EUR', amountCents: 8600, deltaCents: -8600 },
      { kind: 'exchange', currency: 'EUR', amountCents: 25000, toCurrency: 'USD', toAmountCents: 27200, deltaCents: -25000 },
      { kind: 'sent', title: 'maria@defied.me', noteKey: 'noteDinner', currency: 'USD', amountCents: 3400, deltaCents: -3100 },
      { kind: 'received', title: 'ivan@defied.me', currency: 'EUR', amountCents: 6800, deltaCents: 6800 },
      { kind: 'sent', title: 'elena@defied.me', noteKey: 'noteTickets', currency: 'EUR', amountCents: 35000, deltaCents: -35000 },
    ],
  },
};

const DEFAULT_VISIBLE_ROWS = 3;
const ROW_HEIGHT = 64;
const AVATAR_SIZE = 40;
const BADGE_SIZE = 18;
const ACTIVITY_INTERVAL_MS = 3400;

/* Same ease-out-quart curve as the page's fade-ups (LandingPage MOTION_EASE);
   duplicated here to avoid a circular import through HeroStatic. */
const EASE = [0.22, 1, 0.36, 1] as const;

const eur = new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' });
const formatEur = (cents: number) => eur.format(cents / 100);
/* App-style amounts: "€500.00" / "$60.00" with a plain sign in front */
const formatAmount = (cents: number, currency: Currency, sign: '+' | '-' | '') =>
  `${sign}${currency === 'EUR' ? '€' : '$'}${(cents / 100).toFixed(2)}`;

const FLAG_SRC: Record<Currency, string> = { EUR: '/flag-eu.svg', USD: '/flag-us.svg' };

/* Protocol marks, copied from the app's TokenIcons so the landing page shows
   exactly what the product shows. */
function AaveMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 190.5 190.5' xmlns='http://www.w3.org/2000/svg' style={{ display: 'block' }} aria-hidden='true'>
      <path fill='#9391F7' d='M190.5,95.3C190.5,42.6,147.9,0,95.3,0S0,42.6,0,95.3s42.6,95.3,95.3,95.3S190.5,147.9,190.5,95.3L190.5,95.3z' />
      <path fill='#FFFFFF' d='M77.5,99.9c8.2-1.3,13.7-9,12.4-17.2c-1.3-8.2-9-13.7-17.2-12.4c-8.2,1.3-13.7,9-12.4,17.2C61.7,95.7,69.4,101.2,77.5,99.9L77.5,99.9z M116.7,99.9c8.2-1.3,13.7-9,12.4-17.2c-1.3-8.2-9-13.7-17.2-12.4c-8.2,1.3-13.7,9-12.4,17.2C100.8,95.7,108.5,101.2,116.7,99.9L116.7,99.9z' />
      <path fill='#FFFFFF' d='M94.7,23.3C54,23.3,21,56.9,21,98.3h18.8c0-31.1,24.4-56.2,54.8-56.2c30.5,0,54.8,25.2,54.8,56.2h18.8C168.4,56.9,135.4,23.3,94.7,23.3L94.7,23.3L94.7,23.3z' />
    </svg>
  );
}

function ProtocolMark({ protocol, size }: { protocol: Protocol; size: number }) {
  if (protocol === 'Aave') return <AaveMark size={size} />;
  return <Image loading='eager' src='/fluid_logo.svg' alt='' width={size} height={size} style={{ display: 'block' }} />;
}

/** Main circle: protocol mark, filled convert glyph for exchanges, or an initial for people */
function RowAvatar({ event }: { event: WalletEvent }) {
  if (event.protocol) return <ProtocolMark protocol={event.protocol} size={AVATAR_SIZE} />;
  if (event.kind === 'exchange') {
    return (
      <span className='wallet-card-avatar wallet-card-avatar--exchange'>
        <Icon name='convert' size='s' dangerouslySetColor='#fff' />
      </span>
    );
  }
  return <span className='wallet-card-avatar'>{event.title?.charAt(0).toUpperCase()}</span>;
}

/** Initial feed: the first `rows` events, newest first */
function initialFeed(cfg: VariantConfig, rows: number): WalletEvent[] {
  return cfg.cycle.slice(0, rows)
    .map((e, i) => ({ ...e, id: i }))
    .reverse();
}

function initialBalance(cfg: VariantConfig, rows: number): number {
  return cfg.cycle.slice(0, rows).reduce((sum, e) => sum + e.deltaCents, cfg.startBalanceCents);
}

type HeroWalletCardProps = {
  variant?: WalletCardVariant;
  /** Rows shown in the feed (3 on the page cards, 4 inside a phone screen) */
  visibleRows?: number;
  /** Delay before the first new row, so side-by-side cards don't tick in lockstep */
  tickOffsetMs?: number;
};

export function HeroWalletCard({ variant = 'wallet', visibleRows = DEFAULT_VISIBLE_ROWS, tickOffsetMs = 0 }: HeroWalletCardProps) {
  const { t } = useLanguage();
  const cfg = VARIANTS[variant];
  const reduceMotion = useReducedMotion();
  /* non-null init: useInView wants RefObject<Element>; React 19 types RefObject<T | null> */
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref, { amount: 0.5 });

  const [feed, setFeed] = useState<WalletEvent[]>(() => initialFeed(cfg, visibleRows));
  const nextIndex = useRef(visibleRows);
  const balanceCents = useRef(initialBalance(cfg, visibleRows));

  const balance = useMotionValue(balanceCents.current);
  const balanceText = useTransform(balance, (v) => formatEur(Math.round(v)));

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const tick = () => {
      const source = cfg.cycle[nextIndex.current % cfg.cycle.length];
      const event: WalletEvent = { ...source, id: nextIndex.current };
      nextIndex.current += 1;
      balanceCents.current += event.deltaCents;
      animate(balance, balanceCents.current, { duration: 0.9, ease: [...EASE] });
      setFeed((prev) => [event, ...prev].slice(0, visibleRows));
    };
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, ACTIVITY_INTERVAL_MS);
    }, ACTIVITY_INTERVAL_MS + tickOffsetMs);
    return () => {
      window.clearTimeout(start);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [reduceMotion, inView, balance, cfg, visibleRows, tickOffsetMs]);

  const actionLabel = (event: WalletEvent) => {
    if (event.kind === 'exchange') return `${event.currency} → ${event.toCurrency}`;
    const action = t(`hero.card.${event.kind}`);
    return event.noteKey ? `${action} · ${t(`hero.card.${event.noteKey}`)}` : action;
  };

  return (
    <div ref={ref} className='wallet-card' role='img' aria-label={t(`hero.card.${cfg.ariaLabelKey}`)}>
      <div className='wallet-card-top'>
        {/* App-style header: label left, small mark right. 24px keeps the
            blue square a badge, not a second CTA next to the primary button */}
        <div className='wallet-card-header'>
          <Text font='label2' as='span' display='block' color='fgMuted'>
            {t(`hero.card.${cfg.balanceLabelKey}`)}
          </Text>
          <LogoMark size={24} />
        </div>
        <span className='wallet-card-balance'>
          <m.span>{balanceText}</m.span>
        </span>
        <div className='wallet-card-chips' aria-hidden='true'>
          {cfg.chips === 'currencies' ? (
            <>
              <span className='wallet-card-chip'>
                <Image loading='eager' src={FLAG_SRC.EUR} alt='' width={14} height={14} />
                EURC
              </span>
              <span className='wallet-card-chip'>
                <Image loading='eager' src={FLAG_SRC.USD} alt='' width={14} height={14} />
                USDC
              </span>
            </>
          ) : (
            <>
              <span className='wallet-card-chip'>
                <ProtocolMark protocol='Aave' size={14} />
                Aave
              </span>
              <span className='wallet-card-chip'>
                <ProtocolMark protocol='Fluid' size={14} />
                Fluid
              </span>
            </>
          )}
        </div>
      </div>

      <div className='wallet-card-feed'>
        <Text font='label2' as='span' display='block' color='fgMuted' className='wallet-card-feed-label'>
          {t('hero.card.recentLabel')}
        </Text>
        <div
          className='wallet-card-rows'
          style={{ '--row-h': `${ROW_HEIGHT}px`, height: ROW_HEIGHT * visibleRows } as React.CSSProperties}
        >
          <AnimatePresence initial={false}>
            {feed.map((event, index) => {
              const isOut = event.deltaCents < 0;
              const isExchange = event.kind === 'exchange';
              return (
                /* className is not typed on m.* here (framer-motion 10 + React 19
                   types), so the motion element only positions and the plain
                   div inside carries the row styling */
                <m.div
                  key={event.id}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                  initial={{ opacity: 0, y: -ROW_HEIGHT * 0.35 }}
                  animate={{ opacity: 1, y: ROW_HEIGHT * index }}
                  exit={{ opacity: 0, y: ROW_HEIGHT * visibleRows }}
                  transition={{ duration: 0.5, ease: [...EASE] }}
                >
                  <div className='wallet-card-row'>
                    <span className='wallet-card-avatar-wrap'>
                      <RowAvatar event={event} />
                      <span className='wallet-card-badge'>
                        <Image loading='eager' src={FLAG_SRC[event.currency]} alt='' width={BADGE_SIZE - 3} height={BADGE_SIZE - 3} />
                      </span>
                    </span>
                    <span className='wallet-card-row-text'>
                      <span className='wallet-card-row-label'>
                        {isExchange ? t('hero.card.exchange') : event.title}
                      </span>
                      <span className='wallet-card-row-detail'>{actionLabel(event)}</span>
                    </span>
                    {isExchange ? (
                      <span className='wallet-card-row-amount wallet-card-row-amount--exchange'>
                        <span>{formatAmount(event.amountCents, event.currency, '-')}</span>
                        <span className='wallet-card-row-amount-to'>
                          {formatAmount(event.toAmountCents ?? 0, event.toCurrency ?? 'EUR', '+')}
                        </span>
                      </span>
                    ) : (
                      <span className={`wallet-card-row-amount${isOut ? '' : ' wallet-card-row-amount--in'}`}>
                        {formatAmount(event.amountCents, event.currency, isOut ? '-' : '+')}
                      </span>
                    )}
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
