import Link from 'next/link'

const links = ['Overview', 'Hermes', 'Demo', 'Method', 'Operator']

export default function Footer() {
  return (
    <footer className="border-t border-[var(--ct-border)] bg-[var(--ct-bg)] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-6 mb-4">
          {links.map((l) => (
            <Link
              key={l}
              href={l === 'Overview' ? '/' : `/${l.toLowerCase()}`}
              className="text-sm text-[var(--ct-muted)] hover:text-[var(--ct-text)] transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>
        <p className="text-xs text-[var(--ct-muted)]">
          Built by Cheggie Studios © 2026. All rights reserved.{' '}
          <span className="opacity-60">Research software, not financial advice.</span>
        </p>
      </div>
    </footer>
  )
}
