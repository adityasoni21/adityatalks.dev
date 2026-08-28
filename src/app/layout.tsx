import React from 'react';
import { geist, newsreader, jetbrainsMono } from './fonts';
import './globals.css'
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
