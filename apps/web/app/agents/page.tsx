'use client'

import { useLanguage } from '@/lib/language-context'
import { t, tr } from '@/lib/i18n'

const AGENTS = [
  {
    id: 'hermes',
    name: 'Hermes',
    role: { sr: 'Tržišni analitičar', en: 'Market Analyst' },
    description: {
      sr: 'Primarni agent za tržišne brifinge. Analizira koncentraciju, katalizatore i puteve zaštite.',
      en: 'Primary agent for market briefs. Analyzes concentration, catalysts, and hedge paths.',
    },
    skills: ['/earnings-analysis', '/sector-overview', '/comps', '/dcf'],
  },
  {
    id: 'equity-analyst',
    name: 'Equity Research',
    role: { sr: 'Analitičar akcija', en: 'Equity Analyst' },
    description: {
      sr: 'Specijalizovan za analizu zarade, pregled sektora i praćenje teza.',
      en: 'Specialized in earnings analysis, sector overview, and thesis tracking.',
    },
    skills: ['/earnings-analysis', '/sector-overview', '/thesis-tracking'],
  },
  {
    id: 'financial-analyst',
    name: 'Financial Analysis',
    role: { sr: 'Finansijski analitičar', en: 'Financial Analyst' },
    description: {
      sr: 'Izvodi DCF modele, uporednu analizu i LBO procene.',
      en: 'Runs DCF models, comparable company analysis, and LBO assessments.',
    },
    skills: ['/comps', '/dcf', '/lbo'],
  },
  {
    id: 'wealth-mgmt',
    name: 'Wealth Management',
    role: { sr: 'Upravljanje bogatstvom', en: 'Wealth Management' },
    description: {
      sr: 'Pregled portfolija, detekcija drifta i preporuke za rebalansiranje.',
      en: 'Portfolio review, drift detection, and rebalancing recommendations.',
    },
    skills: ['/portfolio-review', '/rebalancing'],
  },
  {
    id: 'pe-analyst',
    name: 'Private Equity',
    role: { sr: 'PE analitičar', en: 'PE Analyst' },
    description: {
      sr: 'Analiza jedinične ekonomije i IC memo-i za privatne investicije.',
      en: 'Unit economics analysis and IC memos for private investments.',
    },
    skills: ['/unit-economics', '/ic-memo'],
  },
]

export default function AgentsPage() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-2">
          {tr(t.agents.eyebrow, lang)}
        </p>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
          {tr(t.agents.title, lang)}
        </h1>
        <p className="text-[var(--muted)] mb-12 max-w-xl">
          {tr(t.agents.sub, lang)}
        </p>

        <div className="space-y-6">
          {AGENTS.map((a) => (
            <div key={a.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-[var(--text)]">{a.name}</h3>
                    <span className="text-xs text-[var(--muted)] border border-[var(--border)] rounded-full px-2 py-0.5">
                      {lang === 'sr' ? a.role.sr : a.role.en}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                    {lang === 'sr' ? a.description.sr : a.description.en}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {a.skills.map((s) => (
                      <span key={s} className="font-mono text-xs bg-[var(--elevated)] text-[var(--accent)] px-2 py-1 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="font-mono text-xs text-[var(--muted)] mt-1">id: {a.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
