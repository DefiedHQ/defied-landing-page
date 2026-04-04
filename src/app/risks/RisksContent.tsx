'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';

export function RisksContent() {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-[984px] mx-auto pb-16">
      <Text font="display1" as="h1" style={{ marginTop: 'clamp(48px, 10vw, 120px)', maxWidth: '800px', marginBottom: '24px' }}>
        {t('risks.title')}
      </Text>
    </section>
  );
}
