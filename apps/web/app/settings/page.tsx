'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'

export default function SettingsPage() {
  const { lang, setLang } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-2">
          {lang === 'sr' ? 'PODEŠAVANJA' : 'SETTINGS'}
        </p>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-12">
          {lang === 'sr' ? 'Podešavanja platforme' : 'Platform Settings'}
        </h1>

        <div className="space-y-6">
          {/* Language */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="font-semibold text-[var(--text)] mb-1">
              {lang === 'sr' ? 'Jezik / Language' : 'Language / Jezik'}
            </h2>
            <p className="text-sm text-[var(--muted)] mb-4">
              {lang === 'sr' ? 'Izaberite jezik interfejsa.' : 'Select interface language.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setLang('sr')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  lang === 'sr'
                    ? 'bg-[var(--accent)] text-black'
                    : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                Srpski
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  lang === 'en'
                    ? 'bg-[var(--accent)] text-black'
                    : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Theme */}
          {mounted && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="font-semibold text-[var(--text)] mb-1">
                {lang === 'sr' ? 'Tema' : 'Theme'}
              </h2>
              <p className="text-sm text-[var(--muted)] mb-4">
                {lang === 'sr' ? 'Izaberite svetlu ili tamnu temu.' : 'Select light or dark theme.'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'bg-[var(--accent)] text-black'
                      : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {lang === 'sr' ? 'Tamna' : 'Dark'}
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    theme === 'light'
                      ? 'bg-[var(--accent)] text-black'
                      : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {lang === 'sr' ? 'Svetla' : 'Light'}
                </button>
              </div>
            </div>
          )}

          {/* API keys note */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="font-semibold text-[var(--text)] mb-1">
              {lang === 'sr' ? 'API ključevi' : 'API Keys'}
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {lang === 'sr'
                ? 'API ključevi se konfigurišu kroz environment varijable na serveru. Pogledajte /api-docs za detalje.'
                : 'API keys are configured via server-side environment variables. See /api-docs for details.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
