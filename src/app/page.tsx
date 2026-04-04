import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Първият дигитален портфейл с пасивен доход',
  description:
    'Генерирайте доходност на вашето дигитално евро и долари, по сигурен и децентрализиран начин чрез DeFi. Без банки, без посредници.',
  openGraph: {
    title: 'Defied | Първият дигитален портфейл с пасивен доход',
    description:
      'Генерирайте доходност на вашето дигитално евро и долари, по сигурен и децентрализиран начин чрез DeFi.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied' }], // TODO: Replace with actual OG image
  },
  alternates: {
    canonical: 'https://defied.io',
  },
};

export default function Home() {
  return <LandingPage />;
}
