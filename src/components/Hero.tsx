'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function Hero() {
  return (
    <section className="w-full max-w-[680px] mx-auto text-center mb-8 px-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-text tracking-tight leading-tight mb-3">
        Put your <span className="text-pink">money</span> where your <span className="text-pink">mouth</span> is.
      </h1>
      <p className="text-[15px] text-muted2 leading-relaxed max-w-[520px] mx-auto">
        Lock ETH until it reaches a new all-time high. Earn staking yield the
        entire time. Conviction has a price - so does impatience.
      </p>
    </section>
  );
}

function FaqItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        background: open ? 'rgb(247, 248, 249)' : 'transparent',
        borderRadius: '16px',
        marginBottom: '2px',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
        style={{ background: 'rgb(247, 248, 249)', borderRadius: '16px', border: 'none', height: '76px', padding: '24px 72px 24px 32px', cursor: 'pointer', fontFamily: 'CoinbaseSans, -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', fontSize: '16px', fontWeight: 400, lineHeight: '18.4px', position: 'relative' }}
      >
        <span style={{ fontWeight: 600, color: '#0A0B0D', lineHeight: 1.4 }}>{question}</span>
        <span
          className="shrink-0 flex items-center justify-center"
          style={{ fontSize: '24px', fontWeight: 300, color: '#0A0B0D', position: 'absolute', right: '32px' }}
        >
          {open ? '–' : '+'}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-8 pb-6 text-base sm:text-[16px] leading-relaxed" style={{ color: '#5B616E', fontWeight: 400 }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function InfoSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
  ];

  return (
    <section className="w-full max-w-[1300px] mx-auto px-4 sm:px-6">
      {/* FAQ Title */}
      <h2 className="text-[28px] sm:text-[40px] md:text-[52px] mb-10 sm:mb-14" style={{ fontWeight: 400, color: '#0A0B0D', lineHeight: 1.1 }}>
        {t('faq.title')}
      </h2>

      {/* FAQ Accordion */}
      <div className="flex flex-col gap-[2px]">
        {faqItems.map((item, i) => (
          <FaqItem
            key={i}
            question={item.question}
            answer={item.answer}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      {/* CTA below FAQ */}
      <div className="flex flex-col items-center text-center py-20 sm:py-28">
        <h2 className="text-[32px] sm:text-[48px] md:text-[64px]" style={{ fontWeight: 400, color: '#0A0B0D', lineHeight: 1.1, marginBottom: '16px' }}>
          {t('hero.ctaMain')}
        </h2>
        <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: '#5B616E', marginBottom: '32px' }}>
          {t('hero.subtitle1')} {t('hero.subtitle2')} {t('hero.subtitle3')}
        </p>
        <a
          href="https://app.defied.bg" target="_blank" rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          style={{ background: '#0A0B0D', border: '1px solid #0A0B0D', borderRadius: '56px', color: '#ffffff', fontSize: '16px', fontWeight: 600, height: '58px', minHeight: '56px', minWidth: '100px', padding: '16px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}
        >
          {t('hero.cta')}
        </a>
      </div>
    </section>
  );
}
