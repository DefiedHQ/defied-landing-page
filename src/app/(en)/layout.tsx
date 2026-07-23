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
    default: 'Defied Money - Onchain Wealth Platform. Earn on Euros, Send Money Globally.',
    template: '%s | Defied Money',
  },
  description: siteConfig.description,
  keywords: [
    'onchain wealth management',
    'non-custodial platform',
    'earn on euros',
    'earn interest on euros',
    'self-custodial account',
    'digital euro account',
    'stablecoin wallet europe',
    'send money instantly EU',
    'DeFi for beginners',
    'USDC EURC wallet',
    'non-custodial wallet email login',
    'stablecoin wallet',
    'onchain finance europe',
    'DeFi',
    'decentralized finance',
    'USDC',
    'EURC',
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
    title: 'Defied Money - Onchain Wealth Platform. Earn on Euros, Send Money Globally.',
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Defied Money - Onchain Wealth Platform. Earn on Euros, Send Money Globally.',
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
    title: 'Defied Money - Onchain Wealth Platform. Earn on Euros, Send Money Globally.',
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
