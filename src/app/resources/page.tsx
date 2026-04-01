import type { Metadata } from 'next';
import { ResourcesPage } from '@/components/ResourcesPage';

export const metadata: Metadata = {
  title: 'Ресурси',
  description:
    'Статии, ръководства и новини за DeFi, блокчейн и децентрализираните финанси от Defied.',
};

export default function ResourcesRoute() {
  return <ResourcesPage />;
}
