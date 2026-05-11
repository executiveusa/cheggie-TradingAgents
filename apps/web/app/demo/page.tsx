import Link from 'next/link'
import ChessKnight from '@/components/chess-knight'

export const metadata = {
  title: 'Live Demo — CHEGGIE TRADE',
  description: 'Watch Hermes work a real brief. No signup. No API key.',
}

export default function DemoPage() {
  return (
    <div className="pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-content mx-auto">
        {/* Header */}
        <span className="label-mono">Live demo</span>
        <h1 className="font-sans font-bold text-[clamp(36px,5vw,64px)] leading-tight tracking-[-0.03em] text-[var(--text-primary)] mt-4 text-balance max-w-2xl">
          Watch Hermes work a real brief.
        </h1>
        <p className="font-sans text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mt-4 max-w-xl">
          No signup. No API key. This is the actual model loop on a sample position.
        </p>

        {/* Demo brief card */}
        <div className="mt-12 max-w-3xl rounded-xl bg-[var(--bg-card)] border-t-2 border-t-[var(--accent-emerald)] border border-[var(--border)] overflow-hidden glow-card">
          {/* Input summary */}
          <div className="px-6 py-4 bg-[var(--bg-subtle)] border-b border-[var(--border)]">
            <span className="label-mono">Brief input</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              {[
                { label: 'Ticker', value: 'NVDA' },
                { label: 'Weight', value: '28% portfolio' },
                { label: 'Catalyst', value: 'Q2 Earnings' },
                { label: 'Days out', value: '11 days' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="label-mono text-[0.6rem]">{label}</span>
                  <p className="font-mono text-sm text-[var(--text-primary)] mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hermes output */}
          <div className="px-6 py-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ChessKnight size={20} className="text-[var(--accent-emerald)]" />
                <span className="label-mono">Hermes market brief</span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded border text-orange-400 bg-orange-400/10 border-orange-400/30">
                HIGH RISK
              </span>
            </div>

            <p className="font-sans text-base md:text-lg text-[var(--text-primary)] leading-relaxed">
              A 28% NVDA weight is now portfolio risk, not just single-name risk. Treat the earnings catalyst like an exposure event and size the hedge before you size the optimism.
            </p>

            <div>
              <span className="label-mono">Catalyst read</span>
              <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
                Q2 earnings in 11 days. Market has priced in significant upside; miss risk is asymmetric. The stock has moved 15%+ on four of the last six reports. Concentration at this weight means a 10% move is a 2.8% portfolio event.
              </p>
            </div>

            <div>
              <span className="label-mono">Hedge path</span>
              <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
                Reduce to 15–18% weight before the event, or hedge with near-dated puts. The hedge cost is asymmetric — the downside of not hedging exceeds the drag of hedging. Do not size the optimism.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border)]">
              <p className="font-mono text-xs text-[var(--code-green)]">
                OpenRouter → NVIDIA free lane &mdash; 1,847 tokens &mdash; 2.1s &mdash; route: free-lane
              </p>
            </div>
          </div>
        </div>

        {/* Route shown */}
        <div className="mt-8 p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] max-w-3xl">
          <span className="label-mono">Route audit</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
            {[
              { label: 'Model', value: 'nvidia/llama-3.1-nemotron-70b' },
              { label: 'Provider', value: 'OpenRouter' },
              { label: 'Lane', value: 'NVIDIA free route' },
              { label: 'Tokens', value: '1,847' },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="label-mono text-[0.6rem]">{label}</span>
                <p className="font-mono text-xs text-[var(--text-primary)] mt-0.5 break-all">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/hermes"
            className="font-sans text-sm font-medium px-6 py-3 rounded bg-[var(--accent-emerald)] text-white hover:bg-[var(--accent-emerald-dim)] transition-colors"
          >
            Open the real workspace &rarr;
          </Link>
          <Link
            href="/method"
            className="font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 transition-colors"
          >
            How the routing works
          </Link>
        </div>
      </div>
    </div>
  )
}
