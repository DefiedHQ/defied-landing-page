'use client';

interface DiamondHandsLogoProps {
  /** Render stacked (two lines) or inline (single line) */
  variant?: 'stacked' | 'inline';
  /** Font size in px for the text */
  size?: number;
}

export function DiamondHandsLogo({ variant = 'inline', size = 18 }: DiamondHandsLogoProps) {
  if (variant === 'stacked') {
    return (
      <div className="leading-[1.1] font-black tracking-tight text-center" style={{ fontSize: size }}>
        <div className="text-text">diamond</div>
        <div className="text-pink">hands.</div>
      </div>
    );
  }

  return (
    <span className="font-black tracking-tight" style={{ fontSize: size }}>
      <span className="text-text">diamond</span>{' '}
      <span className="text-pink">hands.</span>
    </span>
  );
}
