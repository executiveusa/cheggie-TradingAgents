'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">
            <span className="text-emerald-500">⚡</span> Zeus
          </div>
          <div className="flex items-center gap-6">
            <Link href="/aleksa" className="text-sm hover:text-emerald-400 transition">Dashboard</Link>
            <Link href="/assistant" className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition">
              Launch Zeus
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-8 inline-block">
            <div className="px-4 py-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
              AI Trading Analysis
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Ask Zeus to
            <br />
            <span className="text-emerald-400">make your trades</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Simple chat interface. Zeus analyzes 6 different ways. Trading + valuation + risk + compliance. One clear answer: buy, sell, or hold.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/aleksa" className="px-6 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition text-center">
              Try Zeus Now
            </Link>
            <Link href="/explainer" className="px-6 py-4 rounded-lg border border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 font-semibold transition text-center">
              See How It Works
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div>
              <div className="text-3xl font-bold text-emerald-400">6</div>
              <div className="text-sm text-slate-400">Analysis methods</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">78%</div>
              <div className="text-sm text-slate-400">Avg confidence</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">∞</div>
              <div className="text-sm text-slate-400">Learn from results</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Zeus Does */}
      <section className="relative px-6 py-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Here&apos;s What Happens</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-1 -top-12 text-6xl font-bold text-slate-700">1</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-emerald-500/50 transition">
                <h3 className="text-xl font-bold mb-3">You Ask</h3>
                <p className="text-slate-400">Simple question: &quot;Should I buy NVDA?&quot;</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-1 -top-12 text-6xl font-bold text-slate-700">2</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-emerald-500/50 transition">
                <h3 className="text-xl font-bold mb-3">Zeus Analyzes</h3>
                <p className="text-slate-400">Trading signals + Comps + DCF + Risk + KYC + GL reconcile</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-1 -top-12 text-6xl font-bold text-slate-700">3</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-emerald-500/50 transition">
                <h3 className="text-xl font-bold mb-3">You Execute</h3>
                <p className="text-slate-400">Clear recommendation + confidence + next steps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="relative px-6 py-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Use Zeus</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-emerald-400 text-2xl flex-shrink-0">✓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">No More Guessing</h3>
                <p className="text-slate-400">All analysis methods converge on one answer. No confusion.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-emerald-400 text-2xl flex-shrink-0">✓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Institutional Grade</h3>
                <p className="text-slate-400">Every decision logged. Audit trails for compliance.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-emerald-400 text-2xl flex-shrink-0">✓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Gets Smarter</h3>
                <p className="text-slate-400">Zeus learns from outcomes. Detects new patterns automatically.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-emerald-400 text-2xl flex-shrink-0">✓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">White-Label Ready</h3>
                <p className="text-slate-400">Full branding control. Your logo, your pricing, your customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 border-t border-white/10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Trade Better?</h2>
          <p className="text-slate-300 text-lg mb-8">Start asking Zeus about your trades today. Simple. Clear. Profitable.</p>
          <Link href="/aleksa" className="inline-block px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition">
            Open Zeus Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12 text-center text-slate-500 text-sm">
        <p>Zeus Agent • AI Financial Analysis Platform • Built for traders</p>
      </footer>
    </main>
  );
}
