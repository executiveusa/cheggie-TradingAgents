'use client'

import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'

export default function ReportsPage() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-2">
          {lang === 'sr' ? 'IZVEŠTAJI' : 'REPORTS'}
        </p>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
          {lang === 'sr' ? 'Tržišni izveštaji' : 'Market Reports'}
        </h1>
        <p className="text-[var(--muted)] mb-12 max-w-xl">
          {lang === 'sr'
            ? 'Istorijski brifovi, IC memo-i i sačuvani izveštaji o pozicijama.'
            : 'Historical briefs, IC memos, and saved position reports.'}
        </p>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <CTLogo className="h-12 w-12 text-[var(--accent)] opacity-20 animate-float" />
            <p className="text-[var(--muted)] text-sm">
              {lang === 'sr' ? 'Izveštaji će se pojaviti ovde nakon pokretanja analize.' : 'Reports will appear here after running analyses.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
