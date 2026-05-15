'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'
import { t, tr } from '@/lib/i18n'
import MobileNav from './mobile-nav'

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { lang, toggle } = useLanguage()
  useEffect(() => setMounted(true), [])

  const links = [
    { href: '/analyze', label: tr(t.nav.analyze, lang) },
    { href: '/reports', label: tr(t.nav.reports, lang) },
    { href: '/watchlist', label: tr(t.nav.watchlist, lang) },
    { href: '/assistant', label: lang === 'sr' ? 'Asistent' : 'Assistant' },
    { href: '/skills', label: lang === 'sr' ? 'Veštine' : 'Skills' },
    { href: '/status', label: lang === 'sr' ? 'Status' : 'Status' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">

        <Link href="/" className="flex items-center gap-2.5 text-[var(--accent)]">
          <CTLogo className="h-8 w-8 animate-glow" />
          <span className="font-mono text-sm font-bold tracking-[0.15em] text-[var(--accent)] uppercase hidden sm:block">
            CheggieTrade
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--elevated)] rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <>
              <button
                onClick={toggle}
                className="hidden sm:block rounded-lg border border-[var(--border)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors"
                aria-label="Toggle language"
              >
                {lang === 'sr' ? 'EN' : 'SR'}
              </button>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </>
          )}

          <Link
            href="/analyze"
            className="hidden lg:block rounded-xl bg-[var(--ct-emerald)] px-6 py-3 font-semibold text-black hover:bg-[var(--ct-emerald-dim)] transition-colors"
          >
            {tr(t.nav.launchApp, lang)}
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
