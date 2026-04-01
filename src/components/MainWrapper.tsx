'use client';

import { usePathname } from 'next/navigation';

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return (
    <main
      className={`flex-1 flex flex-col items-center pt-0 px-4 sm:px-6 ${isHome ? '' : 'pb-12'}`}
      style={isHome ? { minHeight: 0 } : { minHeight: 'calc(100dvh - 90px)' }}
    >
      {children}
    </main>
  );
}
