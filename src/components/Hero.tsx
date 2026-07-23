'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { Accordion } from '@coinbase/cds-web/accordion/Accordion';
import { AccordionItem } from '@coinbase/cds-web/accordion/AccordionItem';
import { useLanguage } from '@/context/LanguageContext';

/* The 8 questions that carry the main objections lead; the rest sit behind
   a "show all" expander (design review, Phase 1). */
const VISIBLE_FAQ_COUNT = 8;

export function InfoSection() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { t } = useLanguage();

  const allFaqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q7'), answer: t('faq.a7') },
    { question: t('faq.q8'), answer: t('faq.a8') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q13'), answer: t('faq.a13') },
    { question: t('faq.q15'), answer: t('faq.a15') },
    { question: t('faq.q14'), answer: t('faq.a14') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q9'), answer: t('faq.a9') },
    { question: t('faq.q10'), answer: t('faq.a10') },
    { question: t('faq.q11'), answer: t('faq.a11') },
    { question: t('faq.q12'), answer: t('faq.a12') },
  ];
  const faqItems = showAll ? allFaqItems : allFaqItems.slice(0, VISIBLE_FAQ_COUNT);

  const handleToggle = (key: string | null) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto 56px', textAlign: 'center' }}>
        <Text
          font="display2"
          as="h2"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 500,
          }}
        >
          {t('faq.title')}
        </Text>
      </div>

      <div className="faq-accordion" style={{ marginTop: '40px' }}>
      <Accordion
        activeKey={activeKey}
        setActiveKey={handleToggle}
        style={{
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '4px',
        }}
      >
        {faqItems.map((item, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <AccordionItem
              itemKey={String(i)}
              title={item.question}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-content)',
                overflow: 'hidden',
              }}
            >
              <VStack>
                <Text font="label2" as="p" color="fgMuted" style={{ fontSize: '16px' }}>
                  {item.answer}
                </Text>
              </VStack>
            </AccordionItem>
          </m.div>
        ))}
      </Accordion>
      </div>

      {!showAll && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <Button
            type="button"
            variant="secondary"
            className="btn-fw-500"
            style={{ borderRadius: '56px', height: '48px', padding: '0 28px' }}
            onClick={() => setShowAll(true)}
          >
            {t('faq.showAll')}
          </Button>
        </div>
      )}
    </section>
  );
}
