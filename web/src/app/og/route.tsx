import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'NeoTool';
  const subtitle = searchParams.get('subtitle') || 'Web App';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#0b0b0b',
          color: '#fff',
          padding: '64px',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, marginBottom: 12 }}>{title}</div>
        <div style={{ fontSize: 28, opacity: 0.8 }}>{subtitle}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
