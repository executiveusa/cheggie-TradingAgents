import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'CHEGGIE TRADE — Market desk built for traders who want the why',
  description: 'Hermes weighs concentration, liquidity, catalyst risk, and hedge paths before it ever sounds certain. 6-lane model routing with full audit trails.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cheggie.trade'),
  openGraph: {
    title: 'CHEGGIE TRADE',
    description: 'Market intelligence with enough story to trust the call.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
