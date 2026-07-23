import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CdsProvider } from '@/components/CdsProvider';
import { Header } from '@/components/Header';
import { ConditionalFooter } from '@/components/ConditionalFooter';
import { MainWrapper } from '@/components/MainWrapper';
import { LanguageProvider } from '@/context/LanguageContext';
import { LanguageGeoInit } from '@/components/LanguageGeoInit';
import type { Lang } from '@/lib/i18n';

import '@/app/globals.css';
import '@coinbase/cds-icons/fonts/web/icon-font.css';
import '@coinbase/cds-web/defaultFontStyles';
import '@coinbase/cds-web/globalStyles';

const aeonikPro = localFont({
  src: [
    { path: '../../public/fonts/AeonikPro-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/AeonikPro-Medium.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-aeonik-pro',
});

/**
 * Shared document shell for both language trees. Each root layout —
 * app/(en)/layout.tsx and app/(bg)/layout.tsx — renders this with its
 * language, so `<html lang>` and every server-rendered string match the URL
 * (English at the root, Bulgarian under /bg). Geo-based language suggestion
 * only runs on the English tree; on /bg the URL already states the intent.
 */
export function LocaleLayout({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={aeonikPro.variable}>
      <body>
        <CdsProvider>
          <LanguageProvider initialLang={lang}>
            {lang === 'en' && <LanguageGeoInit />}
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 50,
                  background: '#ffffff',
                }}
              >
                <Header />
              </div>
              <MainWrapper>{children}</MainWrapper>
              <ConditionalFooter />
            </div>
          </LanguageProvider>
        </CdsProvider>
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
