'use client'

import { useState } from 'react'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'

export default function WatchlistPage() {
  const { lang } = useLanguage()
  const [input, setInput] = useState('')
  const [tickers, setTickers] = useState<string[]>([])

  function addTicker() {
    const sym = input.trim().toUpperCase()
    if (sym && !tickers.includes(sym)) {
      setTickers((prev) => [...prev, sym])
    }
    setInput('')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-2">
          {lang === 'sr' ? 'PRAĆENJE' : 'WATCHLIST'}
        </p>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
          {lang === 'sr' ? 'Lista praćenja' : 'Watchlist'}
        </h1>
        <p className="text-[var(--muted)] mb-12 max-w-xl">
          {lang === 'sr'
            ? 'Pratite tickere i pokrenite brze analize jednim klikom.'
            : 'Track tickers and run quick analyses with one click.'}
        </p>

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && addTicker()}
            placeholder="NVDA"
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-sm text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors w-48"
          />
          <button
            onClick={addTicker}
            className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors"
          >
            {lang === 'sr' ? 'Dodaj' : 'Add'}
          </button>
        </div>

        {tickers.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col items-center justify-center py-16 gap-4">
            <CTLogo className="h-12 w-12 text-[var(--accent)] opacity-20 animate-float" />
            <p className="text-[var(--muted)] text-sm">
              {lang === 'sr' ? 'Dodajte ticker da biste počeli.' : 'Add a ticker to get started.'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tickers.map((sym) => (
              <div key={sym} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono font-bold text-[var(--text)] text-xl">{sym}</span>
                  <button
                    onClick={() => setTickers((prev) => prev.filter((t) => t !== sym))}
                    className="text-[var(--muted)] hover:text-[var(--danger)] text-xs transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <a
                  href={`/analyze?ticker=${sym}`}
                  className="text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  {lang === 'sr' ? 'Analiziraj →' : 'Analyze →'}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
