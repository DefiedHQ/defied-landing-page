import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Дигитален стейбълкойн портфейл за всеки',
  description:
    'Управлявай парите си като използваш най-новата технология - стейбълкойните. Изпращай, получавай и обменяй за секунди.',
  openGraph: {
    title: 'Defied | Дигитален стейбълкойн портфейл за всеки',
    description:
      'Управлявай парите си като използваш най-новата технология - стейбълкойните. Изпращай, получавай и обменяй за секунди.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Defied' }], // TODO: Replace with actual OG image
  },
  alternates: {
    canonical: 'https://defied.bg',
  },
};

export default function Home() {
  return <LandingPage />;
}
