// Local drop-in replacement for @coinbase/cds-web Pictogram, to avoid loading
// SVGs from static-assets.coinbase.com (third-party cookies / CSP issues).
// SVG files are served from /public/pictograms/ unmodified.
//
// To add a new pictogram: download it from
// https://static-assets.coinbase.com/ui-infra/illustration/v1/pictogram/svg/light/{name}-{version}.svg
// into /public/pictograms/ and add an entry to PICTOGRAM_FILE below.

export type LocalPictogramName =
  | 'selfCustodyWallet'
  | 'browser'
  | 'decentralizedWeb3'
  | 'gasFees'
  | 'transferSend'
  | 'apyInterest'
  | 'walletExchange'
  | 'creditCard';

const PICTOGRAM_FILE: Record<LocalPictogramName, string> = {
  selfCustodyWallet: 'selfCustodyWallet-5.svg',
  browser: 'browser-3.svg',
  decentralizedWeb3: 'decentralizedWeb3-5.svg',
  gasFees: 'gasFees-5.svg',
  transferSend: 'transferSend-3.svg',
  apyInterest: 'apyInterest-5.svg',
  walletExchange: 'walletExchange-3.svg',
  creditCard: 'creditCard-3.svg',
};

type Props = {
  name: LocalPictogramName;
  dimension?: `${number}x${number}`;
  alt?: string;
};

export function LocalPictogram({ name, dimension = '48x48', alt = '' }: Props) {
  const [w, h] = dimension.split('x').map(Number);
  return (
    <img
      src={`/pictograms/${PICTOGRAM_FILE[name]}`}
      width={w}
      height={h}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}
