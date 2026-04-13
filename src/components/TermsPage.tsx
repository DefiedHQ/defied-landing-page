'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';

export function TermsPage() {
  const { t } = useLanguage();

  return (
    <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 16px', paddingBottom: '64px' }}>
      <Text font="display1" as="h1" display="block" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1, maxWidth: '800px', marginTop: 'clamp(48px, 10vw, 120px)', marginBottom: '16px', color: '#0A0B0D' }}>
        {t('terms.title')}
      </Text>
    </section>
  );
}
