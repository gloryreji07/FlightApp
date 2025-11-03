import type { Metadata } from 'next';
import './globals.css';
import { WatchlistProvider } from '@/context/WatchlistContext';
import { Toaster } from "@/components/ui/toaster";
import { Poppins, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'FlightTrackr',
  description: 'Search, track, and manage your flights with ease.',
};

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const fontPtSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", fontPoppins.variable, fontPtSans.variable)}>
        <WatchlistProvider>
          {children}
          <Toaster />
        </WatchlistProvider>
      </body>
    </html>
  );
}
