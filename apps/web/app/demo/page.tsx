import Link from 'next/link'

export const metadata = {
  title: 'Live Demo — CHEGGIE TRADE',
  description: 'Watch Hermes work a real brief. No signup, no API key.',
}

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">

      <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">Live demo</p>
      <h1 className="text-5xl font-bold text-[var(--ct-text)] mb-4 leading-tight">
        Watch Hermes work a real brief.
      </h1>
      <p className="text-lg text-[var(--ct-muted)] mb-12 max-w-xl">
        No signup. No API key. This is the actual model loop on a sample position.
      </p>

      {/* Demo brief card */}
      <div className="rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-8 mb-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="font-mono font-bold text-[var(--ct-emerald)] text-xl">NVDA</span>
          <span className="px-2 py-0.5 rounded-full border border-[var(--ct-border)] text-xs text-[var(--ct-muted)]">
            Earnings
          </span>
          <span className="px-2 py-0.5 rounded-full border border-[var(--ct-border)] text-xs text-[var(--ct-muted)]">
            28% portfolio weight
          </span>
          <span className="ml-auto font-mono text-xs text-[var(--ct-muted)]">Q2 earnings in 11 days</span>
        </div>

        {/* Risk read */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-[var(--ct-muted)] uppercase tracking-wider mb-2">Risk read</p>
          <span className="inline-block px-3 py-1 rounded-full border border-red-500/30 bg-red-500/20 text-red-400 text-xs font-bold">
            HIGH
          </span>
        </div>

        {/* Catalyst read */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-[var(--ct-muted)] uppercase tracking-wider mb-2">Catalyst read</p>
          <p className="text-sm text-[var(--ct-text)] leading-relaxed">
            Earnings catalyst is real but priced. The position size makes this an exposure event, not a trade thesis.
          </p>
        </div>

        {/* Hedge path */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-[var(--ct-muted)] uppercase tracking-wider mb-2">Hedge path</p>
          <p className="text-sm text-[var(--ct-text)] leading-relaxed">
            Size down to 15% before the print or buy put spread 30 days out.
          </p>
        </div>

        {/* Model note */}
        <div className="mt-6 pt-4 border-t border-[var(--ct-border)]">
          <p className="font-mono text-xs text-[var(--ct-muted)]">
            OpenRouter → NVIDIA free lane | 1,847 tokens | 4.2s
          </p>
        </div>
      </div>

      <Link
        href="/hermes"
        className="inline-block rounded-xl bg-[var(--ct-emerald)] px-8 py-4 font-semibold text-black hover:bg-[var(--ct-emerald-dim)] transition-colors"
      >
        Open the real workspace →
      </Link>
    </div>
  )
}
