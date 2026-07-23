import type { Metadata, Viewport } from 'next';
import { LocaleLayout } from '@/components/LocaleLayout';
import { siteConfig, languageAlternates } from '@/lib/seo';
import bg from '@/locales/bg.json';

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
    default: bg.meta.defaultTitle,
    template: '%s | Defied',
  },
  description: bg.meta.homeDescription,
  keywords: [
    'стейбълкойн портфейл',
    'лихва върху евро',
    'дигитално евро',
    'EURC',
    'USDC',
    'крипто портфейл',
    'непопечителски портфейл',
    'децентрализирани финанси',
    'DeFi за начинаещи',
    'изпращане на пари в чужбина',
    'спестявания в евро',
    'виртуална дебитна карта',
    'Base мрежа',
    'доходност върху стейбълкойни',
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
    title: bg.meta.defaultTitle,
    description: bg.meta.homeDescription,
    siteName: siteConfig.name,
    url: `${siteConfig.url}/bg`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: bg.meta.defaultTitle,
      },
    ],
    type: 'website',
    locale: 'bg_BG',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: bg.meta.defaultTitle,
    description: bg.meta.homeDescription,
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
    canonical: '/bg',
    languages: languageAlternates('/'),
  },
};

export default function BgRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleLayout lang="bg">{children}</LocaleLayout>;
}
