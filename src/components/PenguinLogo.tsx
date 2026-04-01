'use client';

export function PenguinLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="60" cy="60" r="60" fill="#6ECFD8" />

      {/* Body dark */}
      <ellipse cx="60" cy="68" rx="34" ry="40" fill="#2D3D50" />

      {/* Head */}
      <ellipse cx="60" cy="42" rx="26" ry="24" fill="#2D3D50" />

      {/* Belly */}
      <ellipse cx="60" cy="70" rx="22" ry="30" fill="#F2E8D5" />

      {/* Face heart shape */}
      <path
        d="M48 38 Q48 30 56 32 Q60 28 64 32 Q72 30 72 38 Q72 46 60 52 Q48 46 48 38Z"
        fill="#F2E8D5"
      />

      {/* Left eye */}
      <circle cx="54" cy="39" r="2.5" fill="#2D3D50" />

      {/* Right eye */}
      <circle cx="66" cy="39" r="2.5" fill="#2D3D50" />

      {/* Beak */}
      <path d="M57 44 L60 48 L63 44 Z" fill="#2D3D50" />

      {/* Belly buttons */}
      <circle cx="60" cy="65" r="1.5" fill="#2D3D50" />
      <circle cx="60" cy="72" r="1.5" fill="#2D3D50" />

      {/* Left flipper */}
      <path
        d="M26 58 Q22 68 28 78 Q30 80 34 76 Q28 68 30 58Z"
        fill="#2D3D50"
      />

      {/* Right flipper */}
      <path
        d="M94 58 Q98 68 92 78 Q90 80 86 76 Q92 68 90 58Z"
        fill="#2D3D50"
      />

      {/* Diamond in left flipper */}
      <g transform="translate(18, 52) scale(0.55)">
        <polygon points="16,0 28,12 16,28 4,12" fill="white" opacity="0.85" />
        <polygon points="16,0 22,12 16,10 10,12" fill="#D8F0F2" opacity="0.9" />
        <polygon points="4,12 10,12 16,28" fill="#B0D8DC" opacity="0.7" />
        {/* Sparkles */}
        <path d="M0 4 L1.5 2 L3 4 L1.5 6 Z" fill="white" opacity="0.8" />
        <path d="M5 -2 L6 -3.5 L7 -2 L6 -0.5 Z" fill="white" opacity="0.6" />
      </g>
    </svg>
  );
}
