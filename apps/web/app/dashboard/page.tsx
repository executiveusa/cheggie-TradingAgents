'use client'

import Link from 'next/link'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'
import { useBriefHistory } from '@/hooks/useBriefHistory'
import { useWatchlist } from '@/hooks/useWatchlist'

const riskColor = (r: string) => {
  if (r === 'HIGH') return 'text-red-400 bg-red-500/10 border-red-500/20'
  if (r === 'MEDIUM') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
  return 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20'
}

export default function DashboardPage() {
  const { lang } = useLanguage()
  const { history, clearHistory } = useBriefHistory()
  const { tickers } = useWatchlist()

  const highRiskCount = history.filter((b) => b.risk === 'HIGH').length
  const avgMs = history.length
    ? Math.round(history.reduce((s, b) => s + b.time_ms, 0) / history.length)
    : 0

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-1">
              {lang === 'sr' ? 'KONTROLNA TABLA' : 'DASHBOARD'}
            </p>
            <h1 className="text-3xl font-bold text-[var(--text)]">
              {lang === 'sr' ? 'Pregled platforme' : 'Platform overview'}
            </h1>
          </div>
          <Link
            href="/analyze"
            className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors"
          >
            {lang === 'sr' ? '+ Nova analiza' : '+ New analysis'}
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: lang === 'sr' ? 'Ukupno analiza' : 'Total briefs',
              value: history.length.toString(),
            },
            {
              label: lang === 'sr' ? 'Visoki rizik' : 'High risk',
              value: highRiskCount.toString(),
            },
            {
              label: lang === 'sr' ? 'Praćeni tickeri' : 'Watched tickers',
              value: tickers.length.toString(),
            },
            {
              label: lang === 'sr' ? 'Prosečno vreme' : 'Avg time',
              value: avgMs > 0 ? `${(avgMs / 1000).toFixed(1)}s` : '—',
            },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="font-mono text-xs text-[var(--muted)] tracking-wider uppercase mb-2">{s.label}</p>
              <p className="text-3xl font-bold text-[var(--text)] font-mono">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">

          {/* Brief history */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase">
                {lang === 'sr' ? 'Istorija analiza' : 'Brief history'}
              </p>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-[var(--muted)] hover:text-[var(--danger)] transition-colors"
                >
                  {lang === 'sr' ? 'Obriši sve' : 'Clear all'}
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <CTLogo className="h-10 w-10 text-[var(--accent)] opacity-20 animate-float" />
                <p className="text-sm text-[var(--muted)]">
                  {lang === 'sr' ? 'Pokrenite prvu analizu.' : 'Run your first brief.'}
                </p>
                <Link href="/analyze" className="text-xs text-[var(--accent)] hover:underline">
                  {lang === 'sr' ? 'Pokreni analizu →' : 'Run analysis →'}
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {history.map((b) => (
                  <div key={b.id} className="px-6 py-4 hover:bg-[var(--elevated)] transition-colors">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono font-bold text-[var(--text)]">{b.ticker}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${riskColor(b.risk)}`}>
                        {b.risk}
                      </span>
                      <span className="text-xs text-[var(--muted)] border border-[var(--border)] rounded-full px-2 py-0.5">
                        {b.route}
                      </span>
                      <span className="ml-auto font-mono text-xs text-[var(--muted)]">{b.timestamp}</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-2 line-clamp-1">{b.catalyst}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Watchlist sidebar */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden h-fit">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase">
                {lang === 'sr' ? 'Lista praćenja' : 'Watchlist'}
              </p>
              <Link href="/watchlist" className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                {lang === 'sr' ? 'Uredi →' : 'Edit →'}
              </Link>
            </div>
            {tickers.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-xs text-[var(--muted)] mb-3">
                  {lang === 'sr' ? 'Još nema tickera.' : 'No tickers yet.'}
                </p>
                <Link href="/watchlist" className="text-xs text-[var(--accent)] hover:underline">
                  {lang === 'sr' ? 'Dodaj ticker →' : 'Add ticker →'}
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {tickers.slice(0, 10).map((sym) => (
                  <div key={sym} className="flex items-center justify-between px-5 py-3 hover:bg-[var(--elevated)] transition-colors">
                    <span className="font-mono font-semibold text-sm text-[var(--text)]">{sym}</span>
                    <Link
                      href={`/analyze?ticker=${sym}`}
                      className="text-xs text-[var(--accent)] hover:underline"
                    >
                      {lang === 'sr' ? 'Analiziraj' : 'Analyze'}
                    </Link>
                  </div>
                ))}
                {tickers.length > 10 && (
                  <div className="px-5 py-3">
                    <Link href="/watchlist" className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                      +{tickers.length - 10} {lang === 'sr' ? 'više →' : 'more →'}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
