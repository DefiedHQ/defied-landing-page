'use client';

export function WstEthIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <circle cx="128" cy="128" r="128" fill="#00A3FF" />
      <path
        d="M128.07 48l-1.14 3.87v113.46l1.14 1.15 52.66-31.12z"
        fill="rgba(255,255,255,0.6)"
      />
      <path
        d="M128.07 48L75.41 135.36l52.66 31.13V99.37z"
        fill="#fff"
      />
      <path
        d="M128.07 176.92l-.64.79v40.42l.64 1.89L180.76 145z"
        fill="rgba(255,255,255,0.6)"
      />
      <path
        d="M128.07 220.02v-43.1L75.41 145z"
        fill="#fff"
      />
      <path
        d="M128.07 166.49l52.66-31.13-52.66-23.94z"
        fill="rgba(255,255,255,0.2)"
      />
      <path
        d="M75.41 135.36l52.66 31.13V111.42z"
        fill="rgba(255,255,255,0.6)"
      />
    </svg>
  );
}

export function LidoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#F69988" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.0149 9.375L43.2399 26.9042L32.0143 33.4308L20.7901 26.904L32.0149 9.375ZM24.2263 26.0751L32.0149 13.9121L39.8036 26.0751L32.0144 30.6038L24.2263 26.0751Z"
        fill="white"
      />
      <path
        d="M31.9983 37.2837L18.9771 29.712L18.6215 30.2673C14.611 36.5302 15.5066 44.7324 20.7749 49.9872C26.9743 56.1709 37.0257 56.1709 43.2251 49.9872C48.4934 44.7324 49.389 36.5302 45.3785 30.2673L45.0229 29.7118L31.9988 37.284L31.9983 37.2837Z"
        fill="white"
      />
    </svg>
  );
}

export function ChainlinkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 37.8 43.6" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.9,0l-4,2.3L4,8.6,0,10.9V32.7L4,35l11,6.3,4,2.3,4-2.3L33.8,35l4-2.3V10.9l-4-2.3L22.9,2.3ZM8,28.1V15.5L18.9,9.2l10.9,6.3V28.1L18.9,34.4Z"
        fill="#2A5ADA"
      />
    </svg>
  );
}
