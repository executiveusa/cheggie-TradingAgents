'use client'

import Link from 'next/link'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'
import { t, tr } from '@/lib/i18n'

const STEPS_SR = [
  {
    num: '01',
    title: 'Unesite ticker',
    body: 'Idite na stranicu Analiziraj i unesite simbol akcije koji vas zanima — npr. NVDA, AAPL, TSLA.',
  },
  {
    num: '02',
    title: 'Opišite svoju poziciju',
    body: 'Dodajte veličinu pozicije i katalizator koji je relevantan — zarada, makro događaj ili tehnički setap.',
  },
  {
    num: '03',
    title: 'Unesite negativne faktore',
    body: 'Navedite ključne rizike, stop nivoe ili scenarije koji bi poništili vašu tezu. Ovo pomaže modelu da bude konkretan.',
  },
  {
    num: '04',
    title: 'Pokrenite analizu',
    body: 'Kliknite "Pokreni analizu". Platforma automatski bira najbrži dostupni analitički kanal na osnovu vašeg zahteva.',
  },
  {
    num: '05',
    title: 'Pročitajte brifing',
    body: 'Dobijate: procenu rizika (HIGH/MEDIUM/LOW), analizu katalizatora i put zaštite. Svaki odgovor sadrži evidenciju rute.',
  },
  {
    num: '06',
    title: 'Postavljajte pitanja',
    body: 'Koristite input na dnu da postavite pitanje o brifingu. Model ostaje u kontekstu vaše pozicije.',
  },
]

const STEPS_EN = [
  {
    num: '01',
    title: 'Enter a ticker',
    body: 'Go to the Analyze page and enter the stock symbol you\'re interested in — e.g. NVDA, AAPL, TSLA.',
  },
  {
    num: '02',
    title: 'Describe your position',
    body: 'Add position size and the relevant catalyst — earnings, macro event, or technical setup.',
  },
  {
    num: '03',
    title: 'Add downside notes',
    body: 'List key risks, stop levels, or scenarios that would invalidate your thesis. This helps the model be specific.',
  },
  {
    num: '04',
    title: 'Run the analysis',
    body: 'Click "Run Analysis". The platform automatically selects the fastest available analysis channel based on your request.',
  },
  {
    num: '05',
    title: 'Read the brief',
    body: 'You receive: risk rating (HIGH/MEDIUM/LOW), catalyst analysis, and hedge path. Every answer includes a route audit trail.',
  },
  {
    num: '06',
    title: 'Ask follow-up questions',
    body: 'Use the bottom input to ask a follow-up about the brief. The model stays in context of your position.',
  },
]

export default function OnboardingPage() {
  const { lang } = useLanguage()
  const steps = lang === 'sr' ? STEPS_SR : STEPS_EN

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center gap-3 mb-2">
          <CTLogo className="h-7 w-7 text-[var(--accent)] animate-glow" />
          <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase">
            {tr(t.onboarding.eyebrow, lang)}
          </p>
        </div>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
          {tr(t.onboarding.title, lang)}
        </h1>
        <p className="text-[var(--muted)] mb-16 max-w-xl">
          {tr(t.onboarding.sub, lang)}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="font-mono text-xs text-[var(--accent)] mb-3 tracking-widest">{s.num}</p>
              <h3 className="font-bold text-[var(--text)] mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <p className="font-mono text-xs text-[var(--accent)] tracking-[0.18em] uppercase mb-4">
            {lang === 'sr' ? 'SPREMAN STE' : 'YOU\'RE READY'}
          </p>
          <h2 className="text-3xl font-bold text-[var(--text)] mb-4">
            {lang === 'sr' ? 'Pokrenite prvu analizu' : 'Run your first analysis'}
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
            {lang === 'sr'
              ? 'Potrebno je manje od 2 minuta da dobijete potpun tržišni brifing za svoju poziciju.'
              : 'It takes less than 2 minutes to get a complete market brief for your position.'}
          </p>
          <Link
            href="/analyze"
            className="inline-block rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors"
          >
            {lang === 'sr' ? 'Pokreni analizu' : 'Run Analysis'}
          </Link>
        </div>
      </div>
    </div>
  )
}
