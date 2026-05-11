'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ChessKnightSVG } from '@/lib/logo'

const links = [
  { href: '/', label: 'Overview' },
  { href: '/hermes', label: 'Hermes' },
  { href: '/demo', label: 'Demo' },
  { href: '/method', label: 'Method' },
  { href: '/operator', label: 'Operator' },
]

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--ct-border)] bg-[var(--ct-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-[var(--ct-emerald)]">
          <ChessKnightSVG className="h-10 w-10 animate-glow" />
          <div>
            <div className="font-mono text-sm font-bold tracking-widest text-[var(--ct-emerald)] uppercase">
              CHEGGIE TRADE
            </div>
            <div className="text-xs text-[var(--ct-muted)] hidden sm:block">
              Market intelligence with enough story to trust the call.
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--ct-muted)] hover:text-[var(--ct-text)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg border border-[var(--ct-border)] p-2 text-[var(--ct-muted)] hover:text-[var(--ct-text)] transition-colors"
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
          )}
          <Link
            href="/hermes"
            className="rounded-lg bg-[var(--ct-emerald)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--ct-emerald-dim)] transition-colors"
          >
            Launch demo
          </Link>
        </div>
      </div>
    </header>
  )
}
