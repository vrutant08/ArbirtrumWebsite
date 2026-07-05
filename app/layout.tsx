import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LenisProvider } from '@/components/lenis-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CustomCursor } from '@/components/custom-cursor'

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
})

export const metadata: Metadata = {
  title: 'LAYERED — Understanding Arbitrum & Layer 2',
  description:
    'An educational Web3 site exploring blockchain fundamentals, Arbitrum, Layer 2 scaling, live crypto prices, and an interactive block mining simulator.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#F4F4F2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${grotesk.variable} ${mono.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        <LenisProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LenisProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
