import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { CompareProvider } from '@/context/CompareContext';
import CompareDock from '@/components/layout/CompareDock';
import NextAuthProvider from '@/components/layout/NextAuthProvider';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import AIChat from '@/components/ui/AIChat';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IRONMARKET — Global Heavy Equipment Marketplace',
  description: 'Find heavy machinery from trusted dealers, manufacturers and marketplace partners worldwide. Browse excavators, bulldozers, cranes, loaders and more.',
  keywords: 'heavy equipment, machinery, excavators, bulldozers, cranes, construction equipment, mining equipment, used machinery',
  openGraph: {
    title: 'IRONMARKET — Global Heavy Equipment Marketplace',
    description: 'Find heavy machinery from trusted dealers worldwide.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <InteractiveBackground />
        <NextAuthProvider>
          <CompareProvider>
            <Navbar />
            <main className="min-h-screen pt-20">
              {children}
            </main>
            <Footer />
            <CompareDock />
            <AIChat />
          </CompareProvider>
        </NextAuthProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
