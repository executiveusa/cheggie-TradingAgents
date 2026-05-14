'use client'

import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'

export default function DashboardPage() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center gap-3 mb-2">
          <CTLogo className="h-7 w-7 text-[var(--accent)]" />
          <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase">
            {lang === 'sr' ? 'KONTROLNA TABLA' : 'DASHBOARD'}
          </p>
        </div>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
          {lang === 'sr' ? 'Pregled portfolija' : 'Portfolio Overview'}
        </h1>
        <p className="text-[var(--muted)] mb-12 max-w-xl">
          {lang === 'sr'
            ? 'Pratite pozicije, pregledajte istoriju analize i proverite performanse modela u jednom pogledu.'
            : 'Track positions, review brief history, and check model performance in one view.'}
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: lang === 'sr' ? 'Ukupno analiza' : 'Total briefs', value: '—' },
            { label: lang === 'sr' ? 'Aktivne pozicije' : 'Active positions', value: '—' },
            { label: lang === 'sr' ? 'Prosečno vreme odgovora' : 'Avg response time', value: '—' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="font-mono text-xs text-[var(--muted)] tracking-wider uppercase mb-2">{s.label}</p>
              <p className="text-3xl font-bold text-[var(--text)] font-mono">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-6">
            {lang === 'sr' ? 'Istorija analize' : 'Brief History'}
          </p>
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <CTLogo className="h-12 w-12 text-[var(--accent)] opacity-20 animate-float" />
            <p className="text-[var(--muted)] text-sm">
              {lang === 'sr' ? 'Pokrenite prvu analizu da biste videli istoriju.' : 'Run your first brief to see history.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
