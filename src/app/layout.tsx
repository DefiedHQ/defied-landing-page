import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
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
    default: 'Defied | A stablecoin wallet with DeFi superpowers',
    template: '%s | Defied',
  },
  description:
    'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
  icons: { icon: '/favicon.svg' },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://defied.money'),
  openGraph: {
    title: 'Defied | A stablecoin wallet with DeFi superpowers',
    description:
      'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
    siteName: 'Defied',
    url: 'https://defied.money',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Defied – A stablecoin wallet with DeFi superpowers',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Defied | A stablecoin wallet with DeFi superpowers',
    description:
      'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://defied.money',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={aeonikPro.variable}>
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
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
