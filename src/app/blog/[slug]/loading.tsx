import { Text } from '@coinbase/cds-web/typography/Text';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <Text font="body" as="p" color="fgMuted">
        Loading...
      </Text>
    </div>
  );
}
