'use client'

import { useLanguage } from '@/lib/language-context'

const SKILLS = [
  { id: '/comps', sr: 'Analiza sličnih kompanija', en: 'Comparable company analysis', desc_sr: 'P/E, EV/Revenue, P/B za ticker i konkurente', desc_en: 'P/E, EV/Revenue, P/B for ticker and peers' },
  { id: '/dcf', sr: 'DCF valuacija', en: 'DCF valuation', desc_sr: 'Diskontovani novčani tok — unutrašnja vrednost i potencijal rasta', desc_en: 'Discounted cash flow — intrinsic value and upside potential' },
  { id: '/lbo', sr: 'LBO model', en: 'LBO model', desc_sr: 'Leveraged buyout analiza sa MOIC i IRR procenom', desc_en: 'Leveraged buyout analysis with MOIC and IRR estimate' },
  { id: '/earnings-analysis', sr: 'Analiza zarade', en: 'Earnings analysis', desc_sr: 'Kvalitet zarade, EPS rast i istorija iznenađenja', desc_en: 'Earnings quality, EPS growth, and surprise history' },
  { id: '/sector-overview', sr: 'Pregled sektora', en: 'Sector overview', desc_sr: 'Pozicioniranje u sektoru i poređenje sa konkurentima', desc_en: 'Sector and industry positioning relative to peers' },
  { id: '/portfolio-review', sr: 'Pregled portfolija', en: 'Portfolio review', desc_sr: 'Analiza koncentracije, beta ekspozicija i upozorenja na rizik', desc_en: 'Concentration analysis, beta exposure, and risk flags' },
  { id: '/rebalancing', sr: 'Rebalansiranje', en: 'Rebalancing', desc_sr: 'Detekcija drifta i predlog trade-ova za povratak na ciljnu alokaciju', desc_en: 'Drift detection and trades needed to return to target allocation' },
  { id: '/ic-memo', sr: 'IC memorandum', en: 'IC memo', desc_sr: 'Potpuni investment committee memorandum koji kombinuje /comps i /dcf', desc_en: 'Full investment committee memo combining /comps and /dcf' },
  { id: '/unit-economics', sr: 'Jedinične ekonomike', en: 'Unit economics', desc_sr: 'LTV, CAC, gross margin i analiza puta do profitabilnosti', desc_en: 'LTV, CAC, gross margin, and path-to-profitability analysis' },
  { id: '/thesis-tracking', sr: 'Praćenje teze', en: 'Thesis tracking', desc_sr: 'Čitanje prethodnih odluka iz memorije platforme po tickeru', desc_en: 'Read prior decisions from platform memory by ticker' },
]

export default function SkillsPage() {
  const { lang } = useLanguage()

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
        {lang === 'sr' ? 'VEŠTINE' : 'SKILLS'}
      </p>
      <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
        {lang === 'sr' ? 'Katalog finansijskih veština' : 'Financial skills catalogue'}
      </h1>
      <p className="text-[var(--muted)] mb-12 max-w-2xl leading-relaxed">
        {lang === 'sr'
          ? 'Svaka veština je posebna analiza koja se može pozvati direktno ili kombinovati u deskbrifu. Podatke pruža yfinance (besplatni tier).'
          : 'Each skill is a discrete analysis that can be called directly or combined in a desk brief. Data is sourced from yfinance (free tier).'}
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {SKILLS.map(s => (
          <div key={s.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--accent)] transition-colors">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-[var(--text)]">{lang === 'sr' ? s.sr : s.en}</h3>
              <code className="font-mono text-xs text-[var(--accent)] bg-[var(--elevated)] px-2 py-0.5 rounded">{s.id}</code>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{lang === 'sr' ? s.desc_sr : s.desc_en}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
