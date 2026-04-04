'use client';

import { useState } from 'react';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { HStack } from '@coinbase/cds-web/layout/HStack';
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
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto">
      <Text font="display3" as="h2" style={{ marginBottom: '56px' }}>
        {t('faq.title')}
      </Text>

      <Accordion
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        onChange={(key: string | null) => setActiveKey(key !== null && activeKey === key ? null : key)}
      >
        {faqItems.map((item, i) => (
          <AccordionItem
            key={i}
            itemKey={String(i)}
            title={item.question}
          >
            <Box as="div" style={{ padding: '0 32px 24px' }}>
              <Text font="body" as="p" color="fgMuted">
                {item.answer}
              </Text>
            </Box>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
