'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ChessKnight from './chess-knight'
import ThemeToggle from './theme-toggle'

type NavItem = { label: string; href: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/' },
  { label: 'Hermes', href: '/hermes' },
  { label: 'Demo', href: '/demo' },
  { label: 'Method', href: '/method' },
  { label: 'Operator', href: '/operator' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 border-b border-[var(--border)] bg-[var(--bg-base)] backdrop-blur-sm">
      {/* Logo + wordmark */}
      <Link href="/" className="flex items-center gap-3 text-[var(--accent-emerald)] hover:opacity-80 transition-opacity">
        <ChessKnight size={32} />
        <span className="font-mono text-xs font-medium tracking-[0.12em] uppercase text-[var(--text-primary)]">
          CHEGGIE TRADE
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`font-sans text-sm transition-colors relative pb-1 ${
                isActive
                  ? 'text-[var(--text-primary)] nav-link-active'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <ThemeToggle />
        <Link
          href="/hermes"
          className="font-sans text-sm px-4 py-1.5 rounded bg-[var(--accent-emerald)] text-white hover:bg-[var(--accent-emerald-dim)] transition-colors"
        >
          Open Hermes
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 text-[var(--text-primary)]"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className={`block w-5 h-px bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-px bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-px bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 left-0 bg-[var(--bg-card)] border-b border-[var(--border)] py-4 px-6 flex flex-col gap-4">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`font-sans text-sm py-1 ${
                pathname === href
                  ? 'text-[var(--accent-emerald)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
            <ThemeToggle />
            <Link
              href="/hermes"
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm px-4 py-1.5 rounded bg-[var(--accent-emerald)] text-white"
            >
              Open Hermes
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
