'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Accordion } from '@coinbase/cds-web/accordion/Accordion';
import { AccordionItem } from '@coinbase/cds-web/accordion/AccordionItem';
import { useLanguage } from '@/context/LanguageContext';

export function InfoSection() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { t } = useLanguage();

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') },
    { question: t('faq.q8'), answer: t('faq.a8') },
    { question: t('faq.q9'), answer: t('faq.a9') },
    { question: t('faq.q10'), answer: t('faq.a10') },
    { question: t('faq.q11'), answer: t('faq.a11') },
  ];

  const handleToggle = (key: string | null) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <Text
        font="display2"
        as="h2"
        display="block"
        className="section-title"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.25rem)',
          fontWeight: 500,
          marginBottom: '56px',
        }}
      >
        {t('faq.title')}
      </Text>

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
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
          >
            <AccordionItem
              itemKey={String(i)}
              title={item.question}
              style={{
                background: 'rgb(247, 248, 249)',
                borderRadius: '16px',
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
    </section>
  );
}
