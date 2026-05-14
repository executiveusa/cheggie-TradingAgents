'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'
import { t, tr } from '@/lib/i18n'
import { useBriefHistory } from '@/hooks/useBriefHistory'
import { toast } from '@/components/toast'

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

const ROUTES: RoutePreference[] = ['auto', 'gateway', 'grok', 'groq', 'openrouter', 'gemini']
const ROUTE_LABELS: Record<RoutePreference, string> = {
  auto: 'Auto', gateway: 'Gateway', grok: 'Grok', groq: 'Groq', openrouter: 'OpenRouter', gemini: 'Gemini',
}

function AnalyzeForm() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const { addBrief } = useBriefHistory()

  const [ticker, setTicker] = useState(searchParams.get('ticker') || '')
  const [size, setSize] = useState('')
  const [catalyst, setCatalyst] = useState<CatalystType>('earnings')
  const [downside, setDownside] = useState('')
  const [route, setRoute] = useState<RoutePreference>('auto')
  const [loading, setLoading] = useState(false)
  const [brief, setBrief] = useState<Brief | null>(null)
  const [followUp, setFollowUp] = useState('')
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sym = searchParams.get('ticker')
    if (sym) setTicker(sym.toUpperCase())
  }, [searchParams])

  async function handleBrief(downsideOverride?: string) {
    if (!ticker.trim()) return
    setLoading(true)
    const start = Date.now()
    const effectiveDownside = downsideOverride !== undefined ? downsideOverride : downside
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, size, catalyst, downside: effectiveDownside, route }),
      })
      const data = await res.json()
      const record: Brief = { ...data, timestamp: new Date().toLocaleTimeString() }
      setBrief(record)
      addBrief({ ...record, route })
      toast(lang === 'sr' ? `Analiza za ${ticker} završena` : `Brief for ${ticker} complete`, 'success')
    } catch {
      const ms = Date.now() - start
      const demo: Brief = {
        ticker: ticker || 'NVDA',
        risk: 'HIGH',
        catalyst: lang === 'sr'
          ? 'Katalizator zarade je realan, ali uračunat u cenu. Veličina pozicije ovaj događaj čini izloznostnim, ne tezom.'
          : 'Earnings catalyst is real but priced. The position size makes this an exposure event, not a trade thesis.',
        hedge: lang === 'sr'
          ? 'Smanjite na 15% pre objave ili kupite put spread 30 dana van.'
          : 'Size down to 15% before the print or buy put spread 30 days out.',
        model_note: 'Demo mode — backend offline',
        tokens: 0,
        time_ms: ms,
        mode: 'demo',
        timestamp: new Date().toLocaleTimeString(),
      }
      setBrief(demo)
      addBrief({ ...demo, route })
      toast(lang === 'sr' ? 'Demo režim — backend offline' : 'Demo mode — backend offline', 'info')
    } finally {
      setLoading(false)
    }
  }

  const riskColor = (r: string) => {
    if (r === 'HIGH') return 'bg-red-500/10 text-red-400 border-red-500/30'
    if (r === 'MEDIUM') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
    return 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30'
  }

  const catalystOptions: { value: CatalystType; label: string }[] = [
    { value: 'earnings', label: tr(t.analyze.catalystOptions.earnings, lang) },
    { value: 'macro', label: tr(t.analyze.catalystOptions.macro, lang) },
    { value: 'technical', label: tr(t.analyze.catalystOptions.technical, lang) },
    { value: 'custom', label: tr(t.analyze.catalystOptions.custom, lang) },
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[var(--bg)] overflow-hidden">

      {/* SUB-HEADER */}
      <div className="flex items-center justify-between px-6 border-b border-[var(--border)] h-12 flex-shrink-0">
        <div className="flex items-center gap-3">
          <CTLogo className="h-5 w-5 text-[var(--accent)]" />
          <span className="font-mono text-xs font-bold tracking-[0.18em] text-[var(--accent)] uppercase">
            {tr(t.analyze.eyebrow, lang)}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)]">
          <span className={`h-1.5 w-1.5 rounded-full ${brief ? 'bg-[var(--accent)]' : 'bg-yellow-400'}`} />
          <span className="font-mono text-xs text-[var(--muted)]">
            {brief ? (lang === 'sr' ? 'Aktivan' : 'Active') : (lang === 'sr' ? 'Demo režim' : 'Demo mode')}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="grid lg:grid-cols-[320px_1fr] flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <aside className="bg-[var(--surface)] border-r border-[var(--border)] p-5 overflow-y-auto">

          <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-5">
            {tr(t.analyze.title, lang)}
          </p>

          <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wider">
            {tr(t.analyze.ticker, lang)}
          </label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="NVDA"
            className="w-full mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 font-mono text-xl text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />

          <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wider">
            {tr(t.analyze.posSize, lang)}
          </label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="28% or $42,000"
            className="w-full mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />

          <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wider">
            {tr(t.analyze.catalyst, lang)}
          </label>
          <select
            value={catalyst}
            onChange={(e) => setCatalyst(e.target.value as CatalystType)}
            className="w-full mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          >
            {catalystOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wider">
            {tr(t.analyze.downside, lang)}
          </label>
          <textarea
            value={downside}
            onChange={(e) => setDownside(e.target.value)}
            rows={3}
            placeholder={tr(t.analyze.downsidePlaceholder, lang)}
            className="w-full mb-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none resize-none transition-colors"
          />

          <button
            onClick={() => handleBrief()}
            disabled={loading || !ticker.trim()}
            className="w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? tr(t.analyze.running, lang) : tr(t.analyze.runBrief, lang)}
          </button>

          {/* Route */}
          <div className="mt-7">
            <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-3">
              {tr(t.analyze.route, lang)}
            </p>
            <div className="flex flex-wrap gap-2">
              {ROUTES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoute(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    route === r
                      ? 'bg-[var(--accent)] text-black'
                      : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)]'
                  }`}
                >
                  {ROUTE_LABELS[r]}
                </button>
              ))}
            </div>
          </div>

          {/* Audit */}
          <div className="mt-7">
            <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-3">
              {tr(t.analyze.audit, lang)}
            </p>
            {brief ? (
              <div className="font-mono text-xs text-[var(--muted)] space-y-1.5">
                <p>Model: <span className="text-[var(--text)]">{brief.model_note}</span></p>
                <p>Tokens: <span className="text-[var(--text)]">{brief.tokens > 0 ? brief.tokens : '—'}</span></p>
                <p>Route: <span className="text-[var(--text)]">{route}</span></p>
                <p>Time: <span className="text-[var(--text)]">{brief.time_ms > 0 ? `${(brief.time_ms / 1000).toFixed(1)}s` : '—'}</span></p>
                <p>Mode: <span className="text-[var(--text)]">{brief.mode}</span></p>
              </div>
            ) : (
              <p className="font-mono text-xs text-[var(--muted)]">
                {lang === 'sr' ? 'Još nije pokrenuta analiza' : 'No brief run yet'}
              </p>
            )}
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <div className="flex flex-col overflow-hidden">
          {loading && <div className="ct-progress-bar flex-shrink-0" />}

          <div ref={outputRef} className="flex-1 overflow-y-auto p-8">
            {loading && (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <CTLogo className="h-12 w-12 text-[var(--accent)] animate-glow" />
                <p className="font-mono text-sm text-[var(--muted)] tracking-[0.18em]">
                  {tr(t.analyze.loading, lang)}
                </p>
              </div>
            )}

            {!loading && !brief && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <CTLogo className="h-16 w-16 text-[var(--accent)] animate-float opacity-25" />
                <p className="text-[var(--muted)]">{tr(t.analyze.emptyState, lang)}</p>
              </div>
            )}

            {!loading && brief && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 max-w-2xl">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="font-mono font-bold text-[var(--accent)] text-2xl">{brief.ticker}</span>
                  <span className="px-2 py-0.5 rounded-full border border-[var(--border)] text-xs text-[var(--muted)]">
                    {catalyst}
                  </span>
                  <span className="ml-auto font-mono text-xs text-[var(--muted)]">{brief.timestamp}</span>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                    {tr(t.analyze.riskRead, lang)}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold ${riskColor(brief.risk)}`}>
                    {brief.risk}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                    {tr(t.analyze.catalystRead, lang)}
                  </p>
                  <p className="text-sm text-[var(--text)] leading-relaxed">{brief.catalyst}</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                    {tr(t.analyze.hedgePath, lang)}
                  </p>
                  <p className="text-sm text-[var(--text)] leading-relaxed">
                    {brief.hedge || (lang === 'sr' ? 'Nije identifikovano' : 'None identified')}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)]">
                  <p className="font-mono text-xs text-[var(--muted)]">{brief.model_note}</p>
                </div>
              </div>
            )}
          </div>

          {/* Follow-up */}
          <div className="border-t border-[var(--border)] p-4 flex gap-3 flex-shrink-0">
            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && followUp.trim() && ticker) {
                  const text = followUp
                  setDownside(text)
                  setFollowUp('')
                  handleBrief(text)
                }
              }}
              placeholder={tr(t.analyze.followUp, lang)}
              className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
            <button
              onClick={() => {
                if (!followUp.trim() || !ticker) return
                const text = followUp
                setDownside(text)
                setFollowUp('')
                handleBrief(text)
              }}
              disabled={loading || !followUp.trim()}
              className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {tr(t.analyze.askBtn, lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AnalyzePage() {
  return (
    <Suspense>
      <AnalyzeForm />
    </Suspense>
  )
}
