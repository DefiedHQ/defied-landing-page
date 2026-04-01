import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import { Header } from '@/components/Header';
import { ConditionalFooter } from '@/components/ConditionalFooter';
import { MainWrapper } from '@/components/MainWrapper';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Defied | Децентрализирани Финанси за Всички',
    template: '%s | Defied',
  },
  description:
    'Спечели доходност от ETH без банка. Залагай ETH, получи wstETH от Lido и тегли без такси при ново рекордно ниво. Децентрализирани финанси с пълен контрол.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Defied | Децентрализирани Финанси за Всички',
    description:
      'Залагай ETH, спечели доходност с wstETH и тегли без такси при ново ATH. Без банка, без посредник – пълен контрол над средствата ти.',
    siteName: 'Defied',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Defied – Децентрализирани Финанси за Всички',
      },
    ],
    type: 'website',
    locale: 'bg_BG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Defied | Децентрализирани Финанси за Всички',
    description:
      'Залагай ETH, спечели доходност с wstETH и тегли без такси при ново ATH. Без банка, без посредник.',
    images: ['/og.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body className="antialiased">
        <Providers>
          <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <div className="sticky top-0 z-50" style={{ background: '#f7f7f8' }}>
              <Header />
            </div>
            <MainWrapper>{children}</MainWrapper>
            <ConditionalFooter />
          </div>
          </LanguageProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
