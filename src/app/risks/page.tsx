import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Рискове',
  description:
    'Научете повече за рисковете, свързани с DeFi протоколите и криптовалутите. Инвестирайте информирано.',
  openGraph: {
    title: 'Рискове | Defied',
    description:
      'Научете повече за рисковете, свързани с DeFi протоколите и криптовалутите.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied – Рискове' }], // TODO: Replace with actual OG image
  },
  alternates: {
    canonical: 'https://defied.io/risks',
  },
};

export default function RisksPage() {
  return (
    <section className="w-full max-w-[984px] mx-auto pb-16">
      <h1 className="text-[32px] sm:text-[56px] md:text-[80px] mt-12 sm:mt-[120px] mb-4 sm:mb-6" style={{ fontWeight: 400, lineHeight: 1, maxWidth: '800px', color: '#0A0B0D' }}>
        Рискове
      </h1>
    </section>
  );
}
