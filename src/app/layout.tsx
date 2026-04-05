import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import { CdsProvider } from '@/components/CdsProvider';
import { Header } from '@/components/Header';
import { ConditionalFooter } from '@/components/ConditionalFooter';
import { MainWrapper } from '@/components/MainWrapper';
import { LanguageProvider } from '@/context/LanguageContext';

import './globals.css';
import '@coinbase/cds-icons/fonts/web/icon-font.css';
import '@coinbase/cds-web/defaultFontStyles';
import '@coinbase/cds-web/globalStyles';

const aeonikPro = localFont({
  src: [
    { path: '../../public/fonts/AeonikPro-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/AeonikPro-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/AeonikPro-Black.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-aeonik-pro',
});

export const metadata: Metadata = {
  title: {
    default: 'Defied | Дигитален стейбълкойн портфейл за всеки',
    template: '%s | Defied',
  },
  description:
    'Управлявай парите си като използваш най-новата технология - стейбълкойните. Изпращай, получавай и обменяй за секунди.',
  icons: { icon: '/favicon.svg' },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://defied.bg'),
  openGraph: {
    title: 'Defied | Дигитален стейбълкойн портфейл за всеки',
    description:
      'Управлявай парите си като използваш най-новата технология - стейбълкойните. Изпращай, получавай и обменяй за секунди.',
    siteName: 'Defied',
    url: 'https://defied.bg',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Defied – Дигитален стейбълкойн портфейл за всеки',
      },
    ],
    type: 'website',
    locale: 'bg_BG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Defied | Дигитален стейбълкойн портфейл за всеки',
    description:
      'Управлявай парите си като използваш най-новата технология - стейбълкойните. Изпращай, получавай и обменяй за секунди.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://defied.bg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" className={aeonikPro.variable}>
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
                    /* borderBottom removed */
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
