'use client';

import { usePathname } from 'next/navigation';
import { stripLangPrefix } from '@/lib/i18n';

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = stripLangPrefix(pathname) === '/';
  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: isHome ? '0 16px' : '0 16px 48px',
        minHeight: isHome ? 0 : 'calc(100dvh - 90px)',
      }}
    >
      {children}
    </main>
  );
}
