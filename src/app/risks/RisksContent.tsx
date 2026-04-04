'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';

export function RisksContent() {
  const { t } = useLanguage();

  return (
    <section style={{ width: '100%', maxWidth: '984px', margin: '0 auto', paddingBottom: '64px' }}>
      <Text font="display1" as="h1" style={{ marginTop: 'clamp(48px, 10vw, 120px)', maxWidth: '800px', marginBottom: '24px' }}>
        {t('risks.title')}
      </Text>
    </section>
  );
}
