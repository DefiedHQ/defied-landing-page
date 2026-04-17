import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json(
      { error: 'Waitlist is not configured.' },
      { status: 500 },
    );
  }

  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    email: email.trim().toLowerCase(),
    unsubscribed: false,
    audienceId,
  });

  if (error) {
    const alreadyExists =
      error.name === 'validation_error' &&
      /already/i.test(error.message ?? '');

    if (alreadyExists) {
      return NextResponse.json({ ok: true, already: true });
    }

    console.error('[waitlist] Resend error:', {
      name: error.name,
      message: error.message,
    });

    return NextResponse.json(
      {
        error: 'Could not add you to the waitlist. Please try again later.',
        ...(process.env.NODE_ENV !== 'production'
          ? { debug: { name: error.name, message: error.message } }
          : {}),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
