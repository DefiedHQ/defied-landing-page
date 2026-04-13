'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '100vh',
            padding: '32px 16px',
            gap: '16px',
            fontFamily: "'Aeonik Pro', 'Inter', sans-serif",
          }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 500 }}>
            Something went wrong
          </h1>
          <p style={{ color: '#5B616E' }}>
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              background: '#0052FF',
              color: '#fff',
              border: 'none',
              borderRadius: '56px',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              marginTop: '16px',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
