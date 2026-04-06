'use client';

/**
 * Wraps button text with a slide-up hover animation.
 * On hover the current text slides up and a duplicate slides in from below.
 * Use as a direct child of CDS <Button>.
 */
export function AnimatedButtonText({ children }: { children: React.ReactNode }) {
  return (
    <span className="animated-btn-text">
      <span className="animated-btn-text__inner">
        <span className="animated-btn-text__default">{children}</span>
        <span className="animated-btn-text__hover" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}
