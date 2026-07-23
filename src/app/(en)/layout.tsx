import type { Metadata, Viewport } from 'next';
import { LocaleLayout } from '@/components/LocaleLayout';
import { siteConfig, languageAlternates } from '@/lib/seo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0052FF',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Defied - Earn on your euros. Send money globally. No bank needed.',
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
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Defied - Earn on your euros. Send money globally. No bank needed.',
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Defied - Earn on your euros. Send money globally. No bank needed.',
      },
    ],
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bg_BG',
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: 'Defied - Earn on your euros. Send money globally. No bank needed.',
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
    languages: languageAlternates('/'),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleLayout lang="en">{children}</LocaleLayout>;
}
