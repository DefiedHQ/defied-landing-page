import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import articles from '@/data/articles-en.json';
import { COVER_SIZE, tintFor, loadPictogram, loadLogo } from '@/lib/og/coverConfig';

/**
 * Text-free branded cover for the blog grid and article header.
 * Category-tinted background + one large pictogram per article; the title
 * lives in the surrounding HTML, in the right language.
 */

export const dynamic = 'force-static';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) notFound();

  const [pictogram, logo] = await Promise.all([loadPictogram(slug), loadLogo()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: tintFor(article.category, slug),
          position: 'relative',
        }}
      >
        {/* Brand mark, constant */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={72} height={72} style={{ position: 'absolute', top: 56, left: 64 }} alt="" />
        {/* One large pictogram per article - the differentiator */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pictogram} width={440} height={440} alt="" />
      </div>
    ),
    { ...COVER_SIZE }
  );
}
