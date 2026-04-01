'use client';

export function DiamondIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Minimalist diamond shape — clean facets, Lido-style simplicity */}
      <path
        d="M16 2L28 12L16 30L4 12L16 2Z"
        fill="#00A3FF"
      />
      {/* Top facet highlight */}
      <path
        d="M16 2L28 12H4L16 2Z"
        fill="#33B8FF"
      />
      {/* Center line for facet detail */}
      <path
        d="M4 12L16 18L28 12"
        stroke="white"
        strokeWidth="0.6"
        opacity="0.4"
      />
      <path
        d="M16 18V30"
        stroke="white"
        strokeWidth="0.6"
        opacity="0.3"
      />
    </svg>
  );
}
