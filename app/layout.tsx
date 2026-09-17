import type { Metadata, Viewport } from 'next';
import './globals.css';
import { body, label, pixel } from './fonts';
import { asset } from '@/lib/asset';
import { DESCRIPTION, SITE_NAME, SITE_URL, TAGLINE } from '@/lib/site';

const TITLE = `${SITE_NAME} — ${TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s · ${SITE_NAME}` },
  description: DESCRIPTION,
  keywords: [
    'block puzzle', 'grid puzzle', 'block placement game', '10x10 puzzle', 'retro puzzle game',
    'pixel art game', 'offline puzzle', 'no ads puzzle game', 'browser puzzle game', 'indie game',
  ],
  authors: [{ name: 'Javier Bascones' }],
  creator: 'Javier Bascones',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: 'og-image.png', width: 1200, height: 630, alt: 'Grid Drop — the block logo next to a game board mid-clear' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: 'og-image.png', alt: 'Grid Drop — the block logo next to a game board mid-clear' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#080b10',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${label.variable} ${body.variable}`}>
      <head>
        <link rel="icon" href={asset('/favicon-32.png')} sizes="32x32" type="image/png" />
        <link rel="icon" href={asset('/icon.png')} sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href={asset('/apple-icon.png')} />
      </head>
      <body className="bg-void text-text antialiased">{children}</body>
    </html>
  );
}
