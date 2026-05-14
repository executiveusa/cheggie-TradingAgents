'use client'

import Link from 'next/link'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'
import { useBriefHistory } from '@/hooks/useBriefHistory'

const riskColor = (r: string) => {
  if (r === 'HIGH') return 'text-[var(--danger)] bg-[var(--danger)]/10 border-[var(--danger)]/20'
  if (r === 'MEDIUM') return 'text-[var(--warning)] bg-[var(--warning)]/10 border-[var(--warning)]/20'
  return 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20'
}

function escapeCsv(value: unknown): string {
  const s = String(value ?? '')
  return `"${s.replace(/"/g, '""')}"`
}

function downloadCsv(data: ReturnType<typeof useBriefHistory>['history'], lang: string) {
  const headers = lang === 'sr'
    ? ['Ticker', 'Rizik', 'Katalizator', 'Put zaštite', 'Model', 'Tokeni', 'Vreme (ms)', 'Ruta', 'Timestamp']
    : ['Ticker', 'Risk', 'Catalyst', 'Hedge path', 'Model', 'Tokens', 'Time (ms)', 'Route', 'Timestamp']
  const rows = data.map((b) =>
    [
      escapeCsv(b.ticker),
      escapeCsv(b.risk),
      escapeCsv(b.catalyst),
      escapeCsv(b.hedge),
      escapeCsv(b.model_note),
      b.tokens ?? 0,
      b.time_ms ?? 0,
      escapeCsv(b.route),
      escapeCsv(b.timestamp),
    ].join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `cheggie-briefs-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function ReportsPage() {
  const { lang } = useLanguage()
  const { history, clearHistory } = useBriefHistory()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-1">
              {lang === 'sr' ? 'IZVEŠTAJI' : 'REPORTS'}
            </p>
            <h1 className="text-3xl font-bold text-[var(--text)]">
              {lang === 'sr' ? 'Istorija analiza' : 'Brief history'}
            </h1>
            <p className="text-[var(--muted)] mt-1 text-sm">
              {history.length} {lang === 'sr' ? 'analiza · Čuva se lokalno' : 'briefs · Saved locally'}
            </p>
          </div>
          {history.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={() => downloadCsv(history, lang)}
                className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] hover:border-[var(--accent)] transition-colors"
              >
                {lang === 'sr' ? 'Izvezi CSV' : 'Export CSV'}
              </button>
              <button
                onClick={clearHistory}
                className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--muted)] hover:text-[var(--danger)] hover:border-[var(--danger)] transition-colors"
              >
                {lang === 'sr' ? 'Obriši sve' : 'Clear all'}
              </button>
            </div>
          )}
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col items-center justify-center py-16 gap-4">
            <CTLogo className="h-12 w-12 text-[var(--accent)] opacity-20 animate-float" />
            <p className="text-[var(--muted)] text-sm">
              {lang === 'sr' ? 'Izveštaji će se pojaviti ovde nakon pokretanja analize.' : 'Reports will appear here after running analyses.'}
            </p>
            <Link href="/analyze" className="text-xs text-[var(--accent)] hover:underline">
              {lang === 'sr' ? 'Pokreni prvu analizu →' : 'Run your first analysis →'}
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="divide-y divide-[var(--border)]">
              {history.map((b) => (
                <div key={b.id} className="px-6 py-5 hover:bg-[var(--elevated)] transition-colors">
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <span className="font-mono font-bold text-[var(--text)] text-lg">{b.ticker}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${riskColor(b.risk)}`}>
                      {b.risk}
                    </span>
                    <span className="text-xs text-[var(--muted)] border border-[var(--border)] rounded-full px-2 py-0.5">
                      {b.route}
                    </span>
                    <span className="font-mono text-xs text-[var(--muted)] ml-auto">{b.timestamp}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] mb-1 line-clamp-2">{b.catalyst}</p>
                  {b.hedge && (
                    <p className="text-xs text-[var(--muted)] opacity-70 line-clamp-1">{b.hedge}</p>
                  )}
                  <div className="flex gap-4 mt-3">
                    <span className="font-mono text-xs text-[var(--muted)]">{b.model_note}</span>
                    {b.tokens > 0 && (
                      <span className="font-mono text-xs text-[var(--muted)]">{b.tokens} tokens</span>
                    )}
                    {b.time_ms > 0 && (
                      <span className="font-mono text-xs text-[var(--muted)]">{(b.time_ms / 1000).toFixed(1)}s</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
