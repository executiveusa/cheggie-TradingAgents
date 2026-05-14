import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/lib/language-context'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { ToastProvider } from '@/components/toast'

export const metadata: Metadata = {
  title: 'CheggieTrade — Tržišna inteligencija za prave traders',
  description: 'CheggieTrade analizira koncentraciju, likvidnost, katalizatorski rizik i puteve zaštite. Šest ruta modela, potpuna evidencija. Market intelligence for traders who want the real answer.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cheggie.trade'),
  openGraph: {
    title: 'CheggieTrade',
    description: 'Tržišna inteligencija sa dovoljno priče da se veruje pozivu.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
            <ToastProvider />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
