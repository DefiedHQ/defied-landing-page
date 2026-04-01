import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Рискове',
  description:
    'Научете повече за рисковете, свързани с DeFi протоколите и криптовалутите. Инвестирайте информирано.',
};

export default function RisksPage() {
  return (
    <section className="w-full max-w-[984px] mx-auto pb-16">
      <h1 style={{ fontSize: '72px', fontWeight: 600, lineHeight: '72px', marginBottom: '24px', marginTop: '120px', maxWidth: '800px', color: '#000' }}>
        Рискове
      </h1>
    </section>
  );
}
