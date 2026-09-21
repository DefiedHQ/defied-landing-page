'use client';

import type { ReactNode } from 'react';

/*
 * PhoneFrame - a CSS-only phone bezel (dark shell, dynamic-island cut-out,
 * status bar, home indicator) that wraps live content in a screen. Used by
 * the hero to show the wallet card as the app it is, not as a floating
 * card. CDS has no device-mockup component, so the shell is custom; the
 * content inside stays CDS.
 *
 * Decorative chrome is aria-hidden; the child carries its own role/label.
 */
export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone-frame ${className}`.trim()}>
      <div className="phone-screen">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-status-time">9:41</span>
          <span className="phone-island" />
          <span className="phone-status-icons">
            {/* signal */}
            <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="7" width="3" height="4" rx="0.8" />
              <rect x="4.5" y="5" width="3" height="6" rx="0.8" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" />
              <rect x="13.5" y="0" width="3" height="11" rx="0.8" />
            </svg>
            {/* wifi */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
              <path d="M7.5 8.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Z" transform="translate(0 -1.4)" />
              <path d="M3.4 6.3a5.8 5.8 0 0 1 8.2 0l-1.2 1.2a4.1 4.1 0 0 0-5.8 0L3.4 6.3Z" />
              <path d="M.6 3.5a9.8 9.8 0 0 1 13.8 0l-1.2 1.2a8.1 8.1 0 0 0-11.4 0L.6 3.5Z" />
            </svg>
            {/* battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" strokeOpacity="0.4" />
              <rect x="2" y="2" width="18" height="8" rx="1.8" fill="currentColor" />
              <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </span>
        </div>
        <div className="phone-content">{children}</div>
        <span className="phone-home" aria-hidden="true" />
      </div>
    </div>
  );
}
