export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/defied_squared_logo.svg"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  );
}
