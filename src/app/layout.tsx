import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import { CdsProvider } from '@/components/CdsProvider';
import { Header } from '@/components/Header';
import { ConditionalFooter } from '@/components/ConditionalFooter';
import { MainWrapper } from '@/components/MainWrapper';
import { LanguageProvider } from '@/context/LanguageContext';

import '@coinbase/cds-icons/fonts/web/icon-font.css';
import '@coinbase/cds-web/defaultFontStyles';
import '@coinbase/cds-web/globalStyles';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Defied | Първият дигитален портфейл с пасивен доход',
    template: '%s | Defied',
  },
  description:
    'Генерирайте доходност на вашето дигитално евро и долари, по сигурен и децентрализиран начин чрез DeFi. Без банки, без посредници.',
  icons: { icon: '/favicon.svg' },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://defied.io'),
  openGraph: {
    title: 'Defied | Първият дигитален портфейл с пасивен доход',
    description:
      'Генерирайте доходност на вашето дигитално евро и долари, по сигурен и децентрализиран начин чрез DeFi.',
    siteName: 'Defied',
    url: 'https://defied.io',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Defied – Първият дигитален портфейл с пасивен доход',
      },
    ],
    type: 'website',
    locale: 'bg_BG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Defied | Първият дигитален портфейл с пасивен доход',
    description:
      'Генерирайте доходност на вашето дигитално евро и долари, по сигурен и децентрализиран начин чрез DeFi.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://defied.io',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body>
        <Providers>
          <CdsProvider>
            <LanguageProvider>
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div
                  style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    background: '#ffffff',
                    borderBottom: '1px solid rgba(91, 97, 110, 0.2)',
                  }}
                >
                  <Header />
                </div>
                <MainWrapper>{children}</MainWrapper>
                <ConditionalFooter />
              </div>
            </LanguageProvider>
          </CdsProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
