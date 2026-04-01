import type { Metadata } from 'next';
import { TradePageContent } from '@/components/TradePageContent';

export const metadata: Metadata = {
  title: 'Обмени крипто',
  description:
    'Купи крипто бързо и лесно с карта, Apple Pay, Google Pay или банков превод чрез SEPA. Директно в Defied.',
};

export default function TradePage() {
  return <TradePageContent />;
}
