import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: typeof window === 'undefined' ? new URL(process.env.SITE_URL || 'http://localhost:3000') : undefined,
  title: { default: 'NeoTool', template: '%s • NeoTool' },
  description: 'NeoTool Web App',
  applicationName: 'NeoTool',
  openGraph: {
    title: 'NeoTool',
    description: 'NeoTool Web App',
    url: '/',
    siteName: 'NeoTool',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'NeoTool', description: 'NeoTool Web App' },
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
  },
};
