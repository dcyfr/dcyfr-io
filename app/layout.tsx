import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dcyfr.io'),
  title: {
    default: 'DCYFR — The Control Center for AI-Powered Development',
    template: '%s | DCYFR',
  },
  description:
    'The unified portal for the DCYFR product ecosystem. Explore templates, research, agent tools, and infrastructure solutions built for AI-powered development.',
  keywords: [
    'dcyfr',
    'ai development platform',
    'agent framework',
    'developer tools',
    'next.js templates',
    'rag pipeline',
    'code generation',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dcyfr.io',
    siteName: 'DCYFR',
    title: 'DCYFR — The Control Center for AI-Powered Development',
    description: 'Unified portal for the DCYFR product ecosystem.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DCYFR Portal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DCYFR',
    description: 'The control center for AI-powered development.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} theme-dcyfr-io`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
