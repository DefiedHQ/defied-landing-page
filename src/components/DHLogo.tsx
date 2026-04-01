'use client';

export function DHLogo({ size = 40 }: { size?: number }) {
  // Aspect ratio ~2:1 width:height to match the chunky "YO" style
  const w = size * 2;
  const h = size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="88"
        fontFamily="Arial Black, Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontSize="110"
        fill="#00A3FF"
        letterSpacing="-6"
      >
        DH
      </text>
    </svg>
  );
}
