'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'
import { useWatchlist } from '@/hooks/useWatchlist'

export default function WatchlistPage() {
  const { lang } = useLanguage()
  const { tickers, add, remove, clear, loaded } = useWatchlist()
  const [input, setInput] = useState('')

  function handleAdd() {
    if (input.trim()) {
      add(input)
      setInput('')
    }
  }

  if (!loaded) return null

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-2">
          {lang === 'sr' ? 'PRAĆENJE' : 'WATCHLIST'}
        </p>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-2">
          {lang === 'sr' ? 'Lista praćenja' : 'Watchlist'}
        </h1>
        <p className="text-[var(--muted)] mb-10 max-w-xl">
          {lang === 'sr'
            ? `${tickers.length} tickera · Čuva se lokalno`
            : `${tickers.length} tickers · Saved locally`}
        </p>

        {/* Add bar */}
        <div className="flex gap-3 mb-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="NVDA"
            maxLength={10}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-sm text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors w-40"
          />
          <button
            onClick={handleAdd}
            className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors"
          >
            {lang === 'sr' ? 'Dodaj' : 'Add'}
          </button>
          {tickers.length > 0 && (
            <button
              onClick={clear}
              className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted)] hover:text-[var(--danger)] hover:border-[var(--danger)] transition-colors ml-auto"
            >
              {lang === 'sr' ? 'Obriši sve' : 'Clear all'}
            </button>
          )}
        </div>

        {tickers.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col items-center justify-center py-16 gap-4">
            <CTLogo className="h-12 w-12 text-[var(--accent)] opacity-20 animate-float" />
            <p className="text-[var(--muted)] text-sm">
              {lang === 'sr' ? 'Dodajte ticker da biste počeli.' : 'Add a ticker to get started.'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {tickers.map((sym) => (
              <div key={sym} className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--accent)] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono font-bold text-[var(--text)] text-xl">{sym}</span>
                  <button
                    onClick={() => remove(sym)}
                    className="text-[var(--muted)] hover:text-[var(--danger)] text-xs transition-colors opacity-0 group-hover:opacity-100"
                    aria-label={`Remove ${sym}`}
                  >
                    ✕
                  </button>
                </div>
                <Link
                  href={`/analyze?ticker=${sym}`}
                  className="text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  {lang === 'sr' ? 'Analiziraj →' : 'Analyze →'}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
