import { ImageResponse } from 'next/og';
import articles from '@/data/articles-bg.json';
import { COVER_SIZE, tintFor, loadPictogram, loadLogo, loadFont } from '@/lib/og/coverConfig';

/**
 * Bulgarian social-share cover: same template as the English one, with the
 * Bulgarian title set in Aeonik (the TTF includes Cyrillic).
 */

export const size = COVER_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  const title = article?.title ?? 'Defied Блог';
  const category = article?.category ?? 'Блог';

  const [pictogram, logo, aeonikMedium, aeonikRegular] = await Promise.all([
    loadPictogram(slug),
    loadLogo(),
    loadFont('Medium'),
    loadFont('Regular'),
  ]);

  const fontSize = title.length > 55 ? 52 : 60;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: tintFor(category),
          position: 'relative',
          fontFamily: 'Aeonik',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={72} height={72} style={{ position: 'absolute', top: 56, left: 64 }} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pictogram}
          width={400}
          height={400}
          style={{ position: 'absolute', right: 48, top: 140 }}
          alt=""
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: 20,
            padding: '0 64px 64px',
            width: 760,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: '#5D6167',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize,
              fontWeight: 500,
              color: '#14161A',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...COVER_SIZE,
      fonts: [
        { name: 'Aeonik', data: aeonikMedium, weight: 500, style: 'normal' },
        { name: 'Aeonik', data: aeonikRegular, weight: 400, style: 'normal' },
      ],
    }
  );
}
