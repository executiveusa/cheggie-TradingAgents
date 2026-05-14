'use client'

import { useLanguage } from '@/lib/language-context'
import { t, tr } from '@/lib/i18n'

const ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/analyze',
    description: { sr: 'Pokreće tržišni brifing za zadati ticker.', en: 'Runs a market brief for the given ticker.' },
    body: `{
  "ticker": "NVDA",
  "size": "28%",
  "catalyst": "earnings",
  "downside": "Stop at 115, expect gap risk",
  "route": "auto"
}`,
    response: `{
  "ticker": "NVDA",
  "risk": "HIGH",
  "catalyst": "...",
  "hedge": "...",
  "model_note": "...",
  "tokens": 1847,
  "time_ms": 4200,
  "mode": "live"
}`,
  },
  {
    method: 'POST',
    path: '/api/hermes',
    description: { sr: 'Legacy ruta (ekvivalent /api/analyze).', en: 'Legacy route (equivalent to /api/analyze).' },
    body: '{ "ticker": "NVDA", "route": "auto" }',
    response: '{ same as /api/analyze }',
  },
  {
    method: 'POST',
    path: '/api/skills',
    description: { sr: 'Poziva specifičnu finansijsku veštinu direktno.', en: 'Calls a specific financial skill directly.' },
    body: `{
  "skill": "/comps",
  "ticker": "NVDA",
  "peers": ["AMD", "INTC"]
}`,
    response: `{
  "skill": "/comps",
  "ticker": "NVDA",
  "table": [...],
  "data_source": "yfinance"
}`,
  },
]

const SKILLS = ['/comps', '/dcf', '/lbo', '/earnings-analysis', '/sector-overview', '/thesis-tracking', '/portfolio-review', '/rebalancing', '/unit-economics', '/ic-memo']

const methodColor = (m: string) =>
  m === 'GET' ? 'text-[var(--accent)] bg-[var(--accent)]/10' : 'text-blue-400 bg-blue-400/10'

export default function ApiDocsPage() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-2">
          {tr(t.apiDocs.eyebrow, lang)}
        </p>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
          {tr(t.apiDocs.title, lang)}
        </h1>
        <p className="text-[var(--muted)] mb-12 max-w-xl">
          {tr(t.apiDocs.sub, lang)}
        </p>

        <div className="space-y-8 mb-16">
          {ENDPOINTS.map((ep) => (
            <div key={ep.path} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--border)]">
                <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${methodColor(ep.method)}`}>
                  {ep.method}
                </span>
                <span className="font-mono text-sm text-[var(--text)]">{ep.path}</span>
              </div>
              <div className="p-6">
                <p className="text-sm text-[var(--muted)] mb-5">
                  {lang === 'sr' ? ep.description.sr : ep.description.en}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                      {lang === 'sr' ? 'Telo zahteva' : 'Request body'}
                    </p>
                    <pre className="rounded-xl bg-[var(--elevated)] p-4 font-mono text-xs text-[var(--text)] overflow-x-auto">{ep.body}</pre>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                      {lang === 'sr' ? 'Odgovor' : 'Response'}
                    </p>
                    <pre className="rounded-xl bg-[var(--elevated)] p-4 font-mono text-xs text-[var(--text)] overflow-x-auto">{ep.response}</pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-4">
            {lang === 'sr' ? 'DOSTUPNE VEŠTINE' : 'AVAILABLE SKILLS'}
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span key={s} className="font-mono text-xs bg-[var(--elevated)] text-[var(--accent)] px-3 py-1.5 rounded-lg">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
