import Link from 'next/link'
import ThemeToggle from './theme-toggle'

const NAV_LINKS = [
  { label: 'Overview', href: '/' },
  { label: 'Hermes', href: '/hermes' },
  { label: 'Demo', href: '/demo' },
  { label: 'Method', href: '/method' },
  { label: 'Operator', href: '/operator' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-base)] px-6 md:px-10 py-10">
      <div className="max-w-content mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-content mx-auto mt-8 pt-6 border-t border-[var(--border)]">
        <p className="font-mono text-xs text-[var(--text-secondary)] tracking-wide">
          Built by Cheggie Studios &copy; 2026. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
