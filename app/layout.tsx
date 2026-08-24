import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://kittyiox.example.com');

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const title = 'kittyiox — Roblox Dress to Impress styling on YouTube';
const description =
  'kittyiox styles a new Roblox Dress to Impress lookbook every week — outfit breakdowns, scoring reactions and prompt battles, first on YouTube.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'profile',
    siteName: 'kittyiox',
    title,
    description,
    url: '/',
    images: [
      {
        url: '/hero.png',
        width: 393,
        height: 634,
        alt: "kittyiox's Roblox avatar in a full-body Dress to Impress look",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/hero.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#fff6f8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('kittyiox-theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  var metaTheme = document.querySelector('meta[name="theme-color"]');
                  if (metaTheme) {
                    metaTheme.setAttribute('content', theme === 'dark' ? '#130d12' : '#fff6f8');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'kittyiox',
              url: siteUrl,
              jobTitle: 'Roblox Fashion Creator',
              knowsAbout: ['Roblox', 'Dress to Impress', 'Fashion Styling'],
              description: 'Roblox creator styling weekly Dress to Impress lookbooks on YouTube.',
              image: `${siteUrl}/hero.png`,
              sameAs: ['https://www.youtube.com/@kittyiox'],
            }),
          }}
        />
      </head>
      <body>
        <div className="wrap" style={{ maxWidth: 'none' }}>
          {children}
        </div>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
