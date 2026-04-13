'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '60vh',
        padding: '32px 16px',
        gap: '16px',
      }}
    >
      <Text font="display2" as="h1" style={{ fontWeight: 500 }}>
        Something went wrong
      </Text>
      <Text font="body" as="p" color="fgMuted">
        An unexpected error occurred. Please try again.
      </Text>
      <Button
        variant="primary"
        onClick={reset}
        className="btn-fw-500"
        style={{ borderRadius: '56px', marginTop: '16px' }}
      >
        Try again
      </Button>
    </section>
  );
}
