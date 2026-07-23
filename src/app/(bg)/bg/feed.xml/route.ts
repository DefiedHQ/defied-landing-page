import { rssResponse } from '@/lib/feed';

// Statically generated at build time; regenerates whenever articles change.
export const dynamic = 'force-static';

export function GET() {
  return rssResponse('bg');
}
