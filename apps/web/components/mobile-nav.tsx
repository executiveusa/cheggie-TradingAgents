'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'
import { t, tr } from '@/lib/i18n'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const { lang, toggle } = useLanguage()

  const links = [
    { href: '/analyze', label: tr(t.nav.analyze, lang) },
    { href: '/reports', label: tr(t.nav.reports, lang) },
    { href: '/watchlist', label: tr(t.nav.watchlist, lang) },
    { href: '/models', label: tr(t.nav.models, lang) },
    { href: '/onboarding', label: tr(t.nav.onboarding, lang) },
    { href: '/pricing', label: lang === 'sr' ? 'Cene' : 'Pricing' },
  ]

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {open
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md px-6 py-4">
          <nav className="flex flex-col gap-1 mb-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--elevated)] rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3 pt-3 border-t border-[var(--border)]">
            <button
              onClick={() => { toggle(); setOpen(false) }}
              className="rounded-lg border border-[var(--border)] px-3 py-2 font-mono text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              {lang === 'sr' ? 'EN' : 'SR'}
            </button>
            <Link
              href="/analyze"
              onClick={() => setOpen(false)}
              className="flex-1 text-center rounded-xl bg-[var(--ct-emerald)] px-6 py-3 font-semibold text-black hover:bg-[var(--ct-emerald-dim)] transition-colors"
            >
              {tr(t.nav.launchApp, lang)}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
