'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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
        style={{ background: 'rgb(247, 248, 249)', borderRadius: '16px', border: 'none', height: '76px', padding: '24px 72px 24px 32px', cursor: 'pointer', fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 400, lineHeight: '18.4px', position: 'relative' }}
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
    <section className="w-full max-w-[1200px] mx-auto">
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

    </section>
  );
}
