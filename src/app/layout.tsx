import React from 'react';
import { geist, newsreader, jetbrainsMono } from './fonts';
import './globals.css'
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a href="#main-content" className='sr-only focus:absolute focus:top-16 focus:left-16 focus:z-100 focus:bg-accent focus:text-white focus:px-16 focus:py-8 focus:rounded-(--radius-sm)'>Skip to content</a>
        <Nav />
        <main id='main-content'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://adityatalks.dev'),
  title: {
    default: 'adityatalks.dev',
    template: '%s - adityatalks.dev'
  },
  description: 'Building products. Exploring ideas. Documenting the journey.',
  openGraph: {
    type: 'website',
    siteName: 'adityatalks.dev',
    title: 'adityatalks.dev',
    description: 'Building products. Exploring ideas. Documenting the journey.',
  },
  twitter: {
    card: 'summary',
    title: 'adityatalks.dev',
    description: 'Building products. Exploring ideas. Documenting the journey.',
  },
}
