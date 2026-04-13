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
import { siteConfig } from '@/lib/seo';

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Defied — Earn on Your Euros. Send Money Globally. No Bank Needed.',
    template: '%s | Defied',
  },
  description: siteConfig.description,
  keywords: [
    'earn on euros',
    'stablecoin wallet europe',
    'send money instantly EU',
    'DeFi for beginners',
    'USDC EURC wallet',
    'non-custodial wallet email login',
    'stablecoin wallet',
    'DeFi',
    'decentralized finance',
    'USDC',
    'EURC',
    'crypto wallet',
    'Base network',
    'yield',
    'lending',
    'euro savings crypto',
    'virtual debit card crypto',
  ],
  icons: {
    icon: '/favicon.svg',
    apple: '/og-image.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Defied — Earn on Your Euros. Send Money Globally. No Bank Needed.',
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Defied — Earn on Your Euros. Send Money Globally. No Bank Needed.',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: 'Defied — Earn on Your Euros. Send Money Globally. No Bank Needed.',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
    canonical: '/',
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
