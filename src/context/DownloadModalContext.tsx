'use client';

import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';
import { DownloadAppModal } from '@/components/DownloadAppModal';

type DownloadModalValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const DownloadModalContext = createContext<DownloadModalValue | null>(null);

/**
 * Single owner of the app-waitlist modal so any surface (header nav, hero
 * CTA) can open the same dialog. Must sit inside LanguageProvider - the modal
 * reads locale strings.
 */
export function DownloadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <DownloadModalContext.Provider value={value}>
      {children}
      <DownloadAppModal open={isOpen} onClose={close} />
    </DownloadModalContext.Provider>
  );
}

export function useDownloadModal(): DownloadModalValue {
  const ctx = use(DownloadModalContext);
  if (!ctx) throw new Error('useDownloadModal must be used within DownloadModalProvider');
  return ctx;
}
