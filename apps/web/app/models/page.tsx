'use client'

import { useLanguage } from '@/lib/language-context'
import { t, tr } from '@/lib/i18n'

const PROVIDERS = [
  {
    name: 'xAI / Grok',
    route: 'grok',
    models: ['grok-4-0709', 'grok-4-fast'],
    status: 'available',
    description: { sr: 'Premium rezonovanje. Zahteva xAI API ključ.', en: 'Premium reasoning. Requires xAI API key.' },
  },
  {
    name: 'Groq',
    route: 'groq',
    models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'],
    status: 'available',
    description: { sr: 'Brzo zaključivanje. Zahteva Groq API ključ.', en: 'Fast inference. Requires Groq API key.' },
  },
  {
    name: 'OpenRouter',
    route: 'openrouter',
    models: ['nvidia/llama-3.1-nemotron-70b-instruct'],
    status: 'available',
    description: { sr: 'Višestruki modeli kroz jednu rutu. Zahteva OpenRouter ključ.', en: 'Multiple models through one route. Requires OpenRouter key.' },
  },
  {
    name: 'Google Gemini',
    route: 'gemini',
    models: ['gemini-2.0-flash-exp', 'gemini-1.5-pro'],
    status: 'available',
    description: { sr: 'Google-ov model. Zahteva Gemini API ključ.', en: 'Google model. Requires Gemini API key.' },
  },
  {
    name: 'Synthia Gateway',
    route: 'gateway',
    models: ['claude-sonnet-4-6', 'claude-opus-4-7'],
    status: 'available',
    description: { sr: 'Centralizovani LLM proxy. Konfiguriše se kroz SYNTHIA_GATEWAY_URL.', en: 'Centralised LLM proxy. Configured via SYNTHIA_GATEWAY_URL.' },
  },
  {
    name: 'Backend / Auto',
    route: 'auto',
    models: ['auto-selected'],
    status: 'available',
    description: { sr: 'Automatski bira rutu na osnovu dostupnosti ključeva.', en: 'Auto-selects route based on key availability.' },
  },
]

const statusColor = (s: string) =>
  s === 'available' ? 'text-[var(--positive)]' : 'text-[var(--warning)]'

export default function ModelsPage() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-2">
          {tr(t.models.eyebrow, lang)}
        </p>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
          {tr(t.models.title, lang)}
        </h1>
        <p className="text-[var(--muted)] mb-12 max-w-xl">
          {tr(t.models.sub, lang)}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROVIDERS.map((p) => (
            <div key={p.route} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-[var(--text)]">{p.name}</h3>
                <span className={`font-mono text-xs ${statusColor(p.status)}`}>● {p.status}</span>
              </div>
              <p className="text-xs text-[var(--muted)] mb-4 leading-relaxed">
                {lang === 'sr' ? p.description.sr : p.description.en}
              </p>
              <div className="space-y-1.5">
                {p.models.map((m) => (
                  <div key={m} className="rounded-lg bg-[var(--elevated)] px-3 py-2">
                    <span className="font-mono text-xs text-[var(--muted)]">{m}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <span className="font-mono text-xs text-[var(--accent)]">route: {p.route}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
