'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <section className="section-padding" style={{ width: '100%', maxWidth: '984px', margin: '0 auto', paddingBottom: '64px' }}>
      <Text font="display1" as="h1" className="text-display-responsive" style={{ fontWeight: 400, lineHeight: 1, maxWidth: '800px', color: '#0A0B0D' }}>
        {t('terms.title')}
      </Text>
    </section>
  );
}
