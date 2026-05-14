'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { TIER_LABELS, TIER_PRICES, type Tier } from '@/lib/tier-config'

const FEATURES_SR: Record<Tier, string[]> = {
  free: ['10 analiza mesečno', 'Auto ruta', 'Istorija u browseru', 'Demo mode'],
  pro: ['Neograničene analize', 'Svih 6 ruta modela', '/comps, /dcf, /earnings analiza', 'CSV export', '10 alertova', 'Praćenje do 20 tickera'],
  team: ['Sve Pro funkcije', 'Sve finansijske veštine', 'IC memo, LBO, portfolio review', 'API pristup', 'Neograničeni alertovi', '100 tickera u praćenju', 'Prioritetna podrška'],
}

const FEATURES_EN: Record<Tier, string[]> = {
  free: ['10 analyses per month', 'Auto route', 'Browser history', 'Demo mode'],
  pro: ['Unlimited analyses', 'All 6 model routes', '/comps, /dcf, /earnings analysis', 'CSV export', '10 alerts', 'Track up to 20 tickers'],
  team: ['Everything in Pro', 'All financial skills', 'IC memo, LBO, portfolio review', 'API access', 'Unlimited alerts', '100 tickers in watchlist', 'Priority support'],
}

const TIERS: Tier[] = ['free', 'pro', 'team']

export default function PricingPage() {
  const { lang } = useLanguage()
  const features = lang === 'sr' ? FEATURES_SR : FEATURES_EN

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg)] bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="text-center mb-16">
          <p className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
            {lang === 'sr' ? 'CENE' : 'PRICING'}
          </p>
          <h1 className="text-5xl font-bold text-[var(--text)] mb-4">
            {lang === 'sr' ? 'Jednostavne, transparentne cene' : 'Simple, transparent pricing'}
          </h1>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            {lang === 'sr'
              ? 'Počnite besplatno. Nadogradite kada budete spremni.'
              : 'Start free. Upgrade when you are ready.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {TIERS.map((tier) => {
            const isPro = tier === 'pro'
            const price = TIER_PRICES[tier]
            return (
              <div
                key={tier}
                className={`rounded-2xl border p-8 flex flex-col ${
                  isPro
                    ? 'border-[var(--accent)] bg-[var(--surface)] shadow-[0_0_40px_var(--accent-glow)]'
                    : 'border-[var(--border)] bg-[var(--surface)]'
                }`}
              >
                {isPro && (
                  <div className="mb-4">
                    <span className="font-mono text-xs font-bold bg-[var(--accent)] text-black px-3 py-1 rounded-full">
                      {lang === 'sr' ? 'NAJPOPULARNIJE' : 'MOST POPULAR'}
                    </span>
                  </div>
                )}

                <h2 className="text-xl font-bold text-[var(--text)] mb-1">
                  {TIER_LABELS[tier][lang]}
                </h2>

                <div className="mb-6 mt-3">
                  {price.monthly === 0 ? (
                    <span className="text-4xl font-bold text-[var(--text)] font-mono">
                      {lang === 'sr' ? 'Besplatno' : 'Free'}
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-[var(--text)] font-mono">${price.monthly}</span>
                      <span className="text-[var(--muted)] text-sm ml-1">{lang === 'sr' ? '/mes' : '/mo'}</span>
                    </>
                  )}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {features[tier].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                      <span className="text-[var(--accent)] mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier === 'free' ? '/analyze' : '/auth/signup'}
                  className={`w-full text-center rounded-xl py-3 font-semibold transition-colors ${
                    isPro
                      ? 'bg-[var(--accent)] text-black hover:bg-[var(--accent-dim)]'
                      : 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]'
                  }`}
                >
                  {tier === 'free'
                    ? (lang === 'sr' ? 'Počnite besplatno' : 'Start free')
                    : (lang === 'sr' ? 'Počnite sa Pro' : `Start ${TIER_LABELS[tier].en}`)}
                </Link>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-[var(--muted)] opacity-60">
          {lang === 'sr'
            ? 'Cene su u USD. Naplata je mesečna. Otkažite u bilo kom trenutku.'
            : 'Prices in USD. Billed monthly. Cancel at any time.'}
        </p>
      </div>
    </div>
  )
}
