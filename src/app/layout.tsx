// Import necessary modules and components
import type { Metadata } from 'next';
import { WatchlistProvider } from '../hooks/use-watchlist';
import { bungee, rubik } from '@/lib/fonts';
import Footer from '@/components/site-footer';
import Header from '@/components/site-header';
import { getURL } from '@/lib/utils';
import { keywords } from '@/lib/tcg';
import './globals.css';

// Define metadata for the page (SEO-related information)
export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark',
  themeColor: 'black',
  title: {
    default: 'Pokefolder',
    template: '%s • Pokefolder',
  },
  applicationName: 'Pokefolder',
  keywords,
  robots: {
    index: true,
    follow: false,
    nocache: true,
    noimageindex: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Define the RootLayout component
export default function RootLayout(props: React.PropsWithChildren) {
  return (
    // Wrap the page content with WatchlistProvider to manage watchlist state
    <WatchlistProvider>
      {/* Define HTML structure with language, font classes, and body styling */}
      <html lang="en" className={`${bungee.variable} ${rubik.variable}`}>
        <body className="font-rubik bg-background text-foreground">
          {/* Background image container */}
          <div className="bg-image" />
          {/* Page content container with maximum width */}
          <div className="px-3 max-w-screen-xl mx-auto ">
            {/* Include Header component */}
            <Header />
            {/* Render the children components (actual page content) */}
            {props.children}
            {/* Include Footer component */}
            <Footer />
          </div>
        </body>
      </html>
    </WatchlistProvider>
  );
}
