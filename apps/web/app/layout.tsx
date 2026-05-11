import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CHEGGIE TRADE — Market desk built for traders who want the why',
  description:
    'Hermes weighs concentration, liquidity, catalyst risk, and hedge paths before it ever sounds certain. Multi-model market intelligence with full audit trails.',
  openGraph: {
    title: 'CHEGGIE TRADE — Market desk built for traders who want the why',
    description:
      'Hermes weighs concentration, liquidity, catalyst risk, and hedge paths before it ever sounds certain.',
    type: 'website',
    siteName: 'CHEGGIE TRADE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHEGGIE TRADE',
    description:
      'Hermes weighs concentration, liquidity, catalyst risk, and hedge paths before it ever sounds certain.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmMono.variable} bg-[var(--bg-base)]`}
    >
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
