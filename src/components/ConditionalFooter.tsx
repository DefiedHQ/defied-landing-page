'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';
import { stripLangPrefix } from '@/lib/i18n';

export function ConditionalFooter() {
  const pathname = usePathname();
  if (stripLangPrefix(pathname) === '/') return null;
  return <Footer />;
}
