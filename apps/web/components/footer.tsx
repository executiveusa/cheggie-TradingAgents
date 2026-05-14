'use client'

import Link from 'next/link'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'
import { t, tr } from '@/lib/i18n'

export default function Footer() {
  const { lang } = useLanguage()

  const links = [
    { href: '/analyze', label: tr(t.footer.links.analyze, lang) },
    { href: '/models', label: tr(t.footer.links.models, lang) },
    { href: '/onboarding', label: tr(t.footer.links.onboarding, lang) },
    { href: '/agents', label: tr(t.footer.links.agents, lang) },
    { href: '/api-docs', label: tr(t.footer.links.apiDocs, lang) },
  ]

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-start gap-10 mb-10">

          <div className="flex-1">
            <div className="flex items-center gap-2.5 text-[var(--accent)] mb-3">
              <CTLogo className="h-7 w-7" />
              <span className="font-mono text-sm font-bold tracking-[0.15em] uppercase">CheggieTrade</span>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
              {tr(t.footer.tagline, lang)}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row gap-2 justify-between">
          <p className="text-xs text-[var(--muted)]">
            © 2026 Cheggie Studios. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)] opacity-70">
            {tr(t.footer.disclaimer, lang)}
          </p>
        </div>
      </div>
    </footer>
  )
}
