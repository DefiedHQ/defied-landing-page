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

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      className="shrink-0 flex items-center justify-center text-black"
      style={{ fontSize: '28px', fontWeight: 300, lineHeight: 1, width: '28px' }}
    >
      {open ? '—' : '+'}
    </span>
  );
}

function FaqItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 sm:gap-6 py-4 sm:py-6 text-left"
      >
        <ToggleIcon open={open} />
        <span className="text-lg sm:text-xl md:text-[24px] text-black leading-tight" style={{ fontWeight: 700 }}>{question}</span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="pl-10 sm:pl-[52px] pb-6 text-base sm:text-[18px] leading-relaxed" style={{ color: 'rgb(118, 119, 122)', fontWeight: 500 }}>
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
    <section className="w-full max-w-[1600px] mx-auto mt-6 px-4 sm:px-6">
      {/* FAQ — two-column */}
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
        {/* Left: title — sticky so it doesn't move on expand */}
        <div className="lg:w-[40%] shrink-0 lg:sticky lg:top-8">
          <h1 className="text-2xl sm:text-[32px]" style={{ lineHeight: '1.2', fontWeight: 700, color: '#000000' }}>
            {t('faq.title')}{' '}
            <span style={{ color: 'rgb(118, 119, 122)' }}>{t('faq.subtitle')}</span>
          </h1>
        </div>

        {/* Right: accordion — aligned with right edge of container */}
        <div className="flex-1">
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
      </div>

      {/* Disclaimers hidden for now */}
    </section>
  );
}
