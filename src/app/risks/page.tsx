import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Рискове',
  description:
    'Научете повече за рисковете, свързани с DeFi протоколите и криптовалутите. Инвестирайте информирано.',
};

export default function RisksPage() {
  return (
    <section className="w-full max-w-[984px] mx-auto pb-16">
      <h1 className="text-[32px] sm:text-[52px] md:text-[72px] mt-12 sm:mt-[120px] mb-4 sm:mb-6" style={{ fontWeight: 600, lineHeight: 1, maxWidth: '800px', color: '#000' }}>
        Рискове
      </h1>
    </section>
  );
}
