import Image from 'next/image';

export function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/defied_squared_logo_blue.svg"
      width={size}
      height={size}
      alt="Defied"
      aria-hidden="true"
      priority
    />
  );
}
