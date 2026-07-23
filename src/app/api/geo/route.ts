import { NextResponse } from 'next/server';

// Returns the visitor's country from the Vercel edge geo header. Kept as a
// tiny dynamic route so the pages themselves can stay fully static — the
// client (LanguageGeoInit) fetches this on mount to pick the default
// language. When the header is absent (local dev, non-Vercel), an optional
// DEV_GEO_COUNTRY env var stands in (set DEV_GEO_COUNTRY=BG in .env.local to
// test the Bulgarian experience locally); otherwise null → default language.
export async function GET(request: Request) {
  const country =
    request.headers.get('x-vercel-ip-country') ?? process.env.DEV_GEO_COUNTRY ?? null;
  return NextResponse.json({ country });
}
