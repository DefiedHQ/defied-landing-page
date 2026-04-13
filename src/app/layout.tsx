import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
  ],
  display: 'swap',
  variable: '--font-aeonik-pro',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://defied.money'),
  title: {
    default: 'Defied | A stablecoin wallet with DeFi superpowers',
    template: '%s | Defied',
  },
  description:
    'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
  keywords: [
    'stablecoin wallet',
    'DeFi',
    'decentralized finance',
    'USDC',
    'EURC',
    'crypto wallet',
    'stablecoins',
    'non-custodial wallet',
    'Base network',
    'yield',
    'lending',
  ],
  icons: { icon: '/favicon.svg' },
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
    site: '@defied_money',
    creator: '@defied_money',
    title: 'Defied | A stablecoin wallet with DeFi superpowers',
    description:
      'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <CdsProvider>
          <LanguageProvider>
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
