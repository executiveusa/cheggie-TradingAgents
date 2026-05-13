'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ChessKnightSVG } from '@/lib/logo'

type RoutePreference = 'auto' | 'gateway' | 'grok' | 'groq' | 'openrouter' | 'gemini'
type CatalystType = 'earnings' | 'macro' | 'technical' | 'custom'

interface Brief {
  ticker: string
  risk: string
  catalyst: string
  hedge: string
  model_note: string
  tokens: number
  time_ms: number
  mode: string
  timestamp: string
}

export default function HermesPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [ticker, setTicker] = useState('')
  const [size, setSize] = useState('')
  const [catalyst, setCatalyst] = useState<CatalystType>('earnings')
  const [downside, setDownside] = useState('')
  const [route, setRoute] = useState<RoutePreference>('auto')
  const [loading, setLoading] = useState(false)
  const [brief, setBrief] = useState<Brief | null>(null)
  const [followUp, setFollowUp] = useState('')
  const [connected] = useState(false)

  const outputRef = useRef<HTMLDivElement>(null)

  async function handleBrief() {
    if (!ticker.trim()) return
    setLoading(true)
    const start = Date.now()
    try {
      const res = await fetch('/api/hermes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, size, catalyst, downside, route }),
      })
      const data = await res.json()
      setBrief({ ...data, timestamp: new Date().toLocaleTimeString() })
    } catch {
      setBrief({
        ticker: ticker || 'NVDA',
        risk: 'HIGH',
        catalyst: 'Earnings catalyst is real but priced. The position size makes this an exposure event, not a trade thesis.',
        hedge: 'Size down to 15% before the print or buy put spread 30 days out.',
        model_note: 'Demo mode — backend offline',
        tokens: 0,
        time_ms: Date.now() - start,
        mode: 'demo',
        timestamp: new Date().toLocaleTimeString(),
      })
    } finally {
      setLoading(false)
    }
  }

  const riskColor = (r: string) => {
    if (r === 'HIGH') return 'bg-red-500/20 text-red-400 border-red-500/30'
    if (r === 'MEDIUM') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--ct-bg)] overflow-hidden">

      {/* TOP BAR */}
      <header className="flex items-center justify-between px-6 border-b border-[var(--ct-border)] h-16 flex-shrink-0">
        <div className="flex items-center gap-3">
          <ChessKnightSVG className="h-8 w-8 text-[var(--ct-emerald)]" />
          <span className="font-mono text-sm font-bold tracking-widest text-[var(--ct-emerald)] uppercase">HERMES</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--ct-border)]">
          <span className={`h-2 w-2 rounded-full ${connected ? 'bg-[var(--ct-emerald)]' : 'bg-yellow-400'}`} />
          <span className="font-mono text-xs text-[var(--ct-muted)]">{connected ? 'Connected' : 'Demo mode'}</span>
        </div>

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
      </header>

      {/* BODY */}
      <div className="grid lg:grid-cols-[35%_65%] flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <aside className="bg-[var(--ct-card)] border-r border-[var(--ct-border)] p-6 overflow-y-auto">

          {/* Market Brief */}
          <section>
            <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">Market Brief</p>

            <label className="block text-xs font-semibold text-[var(--ct-muted)] mb-1 uppercase tracking-wider">Ticker</label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="NVDA"
              className="w-full mb-4 rounded-lg border border-[var(--ct-border)] bg-[var(--ct-bg)] px-4 py-3 font-mono text-lg text-[var(--ct-text)] placeholder-[var(--ct-muted)] focus:border-[var(--ct-emerald)] focus:outline-none"
            />

            <label className="block text-xs font-semibold text-[var(--ct-muted)] mb-1 uppercase tracking-wider">Position size</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="28% or $42,000"
              className="w-full mb-4 rounded-lg border border-[var(--ct-border)] bg-[var(--ct-bg)] px-4 py-3 text-sm text-[var(--ct-text)] placeholder-[var(--ct-muted)] focus:border-[var(--ct-emerald)] focus:outline-none"
            />

            <label className="block text-xs font-semibold text-[var(--ct-muted)] mb-1 uppercase tracking-wider">Catalyst</label>
            <select
              value={catalyst}
              onChange={(e) => setCatalyst(e.target.value as CatalystType)}
              className="w-full mb-4 rounded-lg border border-[var(--ct-border)] bg-[var(--ct-bg)] px-4 py-3 text-sm text-[var(--ct-text)] focus:border-[var(--ct-emerald)] focus:outline-none"
            >
              <option value="earnings">Earnings</option>
              <option value="macro">Macro event</option>
              <option value="technical">Technical setup</option>
              <option value="custom">Custom</option>
            </select>

            <label className="block text-xs font-semibold text-[var(--ct-muted)] mb-1 uppercase tracking-wider">Downside notes</label>
            <textarea
              value={downside}
              onChange={(e) => setDownside(e.target.value)}
              rows={3}
              placeholder="Key risks, stop levels, invalidation..."
              className="w-full mb-4 rounded-lg border border-[var(--ct-border)] bg-[var(--ct-bg)] px-4 py-3 text-sm text-[var(--ct-text)] placeholder-[var(--ct-muted)] focus:border-[var(--ct-emerald)] focus:outline-none resize-none"
            />

            <button
              onClick={handleBrief}
              disabled={loading || !ticker.trim()}
              className="w-full rounded-xl bg-[var(--ct-emerald)] py-3 font-semibold text-black hover:bg-[var(--ct-emerald-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Briefing Hermes...' : 'Brief Hermes'}
            </button>
          </section>

          {/* Route preference */}
          <section className="mt-8">
            <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-3">Route preference</p>
            <div className="flex flex-wrap gap-2">
              {(['auto', 'gateway', 'grok', 'groq', 'openrouter', 'gemini'] as RoutePreference[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRoute(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
                    route === r
                      ? 'bg-[var(--ct-emerald)] text-black'
                      : 'border border-[var(--ct-border)] text-[var(--ct-muted)] hover:text-[var(--ct-text)]'
                  }`}
                >
                  {r === 'openrouter' ? 'OpenRouter' : r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </section>

          {/* Audit */}
          <section className="mt-8">
            <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-3">Audit</p>
            {brief ? (
              <div className="font-mono text-xs text-[var(--ct-muted)] space-y-1">
                <p>Model: <span className="text-[var(--ct-text)]">{brief.model_note}</span></p>
                <p>Tokens: <span className="text-[var(--ct-text)]">{brief.tokens > 0 ? brief.tokens : '—'}</span></p>
                <p>Route: <span className="text-[var(--ct-text)]">{route}</span></p>
                <p>Time: <span className="text-[var(--ct-text)]">{brief.time_ms > 0 ? `${(brief.time_ms / 1000).toFixed(1)}s` : '—'}</span></p>
                <p>Mode: <span className="text-[var(--ct-text)]">{brief.mode}</span></p>
              </div>
            ) : (
              <p className="font-mono text-xs text-[var(--ct-muted)]">No brief run yet</p>
            )}
          </section>
        </aside>

        {/* RIGHT PANEL */}
        <div className="flex flex-col overflow-hidden">

          {/* Progress bar */}
          {loading && <div className="hermes-progress-bar flex-shrink-0" />}

          {/* Output area */}
          <div ref={outputRef} className="flex-1 overflow-y-auto p-6">
            {loading && (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <ChessKnightSVG className="h-12 w-12 text-[var(--ct-emerald)] animate-glow" />
                <p className="font-mono text-sm text-[var(--ct-muted)] tracking-widest">HERMES IS READING THE BRIEF...</p>
              </div>
            )}

            {!loading && !brief && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <ChessKnightSVG className="h-16 w-16 text-[var(--ct-emerald)] animate-float opacity-40" />
                <p className="text-[var(--ct-muted)]">Brief Hermes on a position to begin.</p>
              </div>
            )}

            {!loading && brief && (
              <div className="rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-8 max-w-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="font-mono font-bold text-[var(--ct-emerald)] text-lg">{brief.ticker}</span>
                  <span className="px-2 py-0.5 rounded-full border border-[var(--ct-border)] text-xs text-[var(--ct-muted)]">
                    {catalyst}
                  </span>
                  <span className="ml-auto font-mono text-xs text-[var(--ct-muted)]">{brief.timestamp}</span>
                </div>

                {/* Risk read */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-[var(--ct-muted)] uppercase tracking-wider mb-2">Risk read</p>
                  <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold ${riskColor(brief.risk)}`}>
                    {brief.risk}
                  </span>
                </div>

                {/* Catalyst read */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-[var(--ct-muted)] uppercase tracking-wider mb-2">Catalyst read</p>
                  <p className="text-sm text-[var(--ct-text)] leading-relaxed">{brief.catalyst}</p>
                </div>

                {/* Hedge path */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-[var(--ct-muted)] uppercase tracking-wider mb-2">Hedge path</p>
                  <p className="text-sm text-[var(--ct-text)] leading-relaxed">{brief.hedge || 'None identified'}</p>
                </div>

                {/* Model note */}
                <div className="mt-6 pt-4 border-t border-[var(--ct-border)]">
                  <p className="font-mono text-xs text-[var(--ct-muted)]">{brief.model_note}</p>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="border-t border-[var(--ct-border)] p-4 flex gap-3 flex-shrink-0">
            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="Ask a follow-up about this brief..."
              className="flex-1 rounded-lg border border-[var(--ct-border)] bg-[var(--ct-bg)] px-4 py-2.5 text-sm text-[var(--ct-text)] placeholder-[var(--ct-muted)] focus:border-[var(--ct-emerald)] focus:outline-none"
            />
            <button
              onClick={() => {
                if (!followUp.trim() || !ticker) return
                const t = ticker || 'position'
                setTicker(t)
                setDownside(followUp)
                setFollowUp('')
                handleBrief()
              }}
              disabled={loading || !followUp.trim()}
              className="rounded-lg bg-[var(--ct-emerald)] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[var(--ct-emerald-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ask Hermes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
