import Link from 'next/link'

export const metadata = {
  title: 'Operator Stack — CHEGGIE TRADE',
  description: 'Hermes operator system prompt structure, context ranking, route configuration, and browser harness docs.',
}

const SYSTEM_PROMPT_STRUCTURE = `You are Hermes, the market desk agent for CHEGGIE TRADE.

## Identity
You are a finance-literate market operator. You reason about positions,
catalysts, and risk. You do not execute trades. You do not pretend certainty
you do not have.

## Voice rules
- Lead with risk assessment, not recommendation
- Use trader vocabulary: concentration, catalyst, hedge path, downside
- Acknowledge model degradation explicitly when confidence is low
- Never use phrases like "exciting opportunity" or "sure thing"

## Context protocol
- Always read the ranked context items before responding
- If context contradicts the query, flag it
- If no relevant context exists, say so — do not fill with noise

## Output structure
1. Risk level: LOW / MODERATE / HIGH / CRITICAL
2. Catalyst read
3. Hedge path (if applicable)
4. Model note: which route answered and why`

export default function OperatorPage() {
  return (
    <div className="pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-content mx-auto flex flex-col gap-16">
        {/* Header */}
        <div>
          <span className="label-mono">Operator stack</span>
          <h1 className="font-sans font-bold text-[clamp(36px,5vw,64px)] leading-tight tracking-[-0.03em] text-[var(--text-primary)] mt-4 text-balance max-w-2xl">
            How Hermes stays Hermes.
          </h1>
          <p className="font-sans text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mt-4 max-w-xl">
            The operator layer is what keeps Hermes persona-consistent across model routes, session resets, and provider failures.
          </p>
        </div>

        {/* System prompt */}
        <section>
          <span className="label-mono">Hermes system prompt structure</span>
          <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mt-2 mb-5 max-w-2xl">
            This is the operator system prompt that every request packs at the top of the context window. It is compact by design — every token here competes with position context.
          </p>
          <pre className="font-mono text-xs text-[var(--code-green)] bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-5 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {SYSTEM_PROMPT_STRUCTURE}
          </pre>
        </section>

        {/* Context ranking */}
        <section>
          <span className="label-mono">Context ranking algorithm</span>
          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed mt-2 mb-6 max-w-2xl">
            Before each request, available context items are scored and the top N are included. The scoring is deterministic, not AI-driven, to avoid circular reasoning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { rank: '1st', label: 'Current position data', detail: 'Ticker, size, entry, stop, catalyst date — always included.' },
              { rank: '2nd', label: 'Recent instructions', detail: 'Any explicit trader notes from the last 3 turns.' },
              { rank: '3rd', label: 'Watchlist context', detail: 'Sector peers and correlated names if they add signal.' },
              { rank: '4th', label: 'Portfolio memory', detail: 'Prior briefs on the same ticker, trimmed to key conclusions.' },
            ].map((item) => (
              <div key={item.rank} className="flex gap-4 p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                <span className="font-mono text-xs text-[var(--accent-emerald)] shrink-0 pt-0.5">{item.rank}</span>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-[var(--text-primary)]">{item.label}</h3>
                  <p className="font-sans text-sm text-[var(--text-secondary)] mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Route configuration */}
        <section>
          <span className="label-mono">Route configuration</span>
          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed mt-2 mb-6 max-w-2xl">
            Set environment variables in your Vercel project to enable each lane. Missing keys are skipped gracefully — the desk moves to the next lane.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs text-[var(--text-secondary)] border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 pr-6 text-[var(--accent-green-label)] label-mono">Env var</th>
                  <th className="text-left py-2 pr-6 text-[var(--accent-green-label)] label-mono">Lane</th>
                  <th className="text-left py-2 text-[var(--accent-green-label)] label-mono">Required?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { var: 'XAI_API_KEY', lane: 'xAI Grok', required: 'Optional — enables premium route' },
                  { var: 'GROQ_API_KEY', lane: 'Groq', required: 'Optional — enables speed lane' },
                  { var: 'OPENROUTER_API_KEY', lane: 'OpenRouter / NVIDIA', required: 'Optional — free lane available without key' },
                  { var: 'GEMINI_API_KEY', lane: 'Gemini fallback', required: 'Optional — activates when others fail' },
                  { var: 'NEXT_PUBLIC_API_URL', lane: 'Backend', required: 'Optional — enables backend proxy' },
                ].map((row) => (
                  <tr key={row.var} className="border-b border-[var(--border)]/50">
                    <td className="py-2.5 pr-6 text-[var(--code-green)]">{row.var}</td>
                    <td className="py-2.5 pr-6 text-[var(--text-primary)]">{row.lane}</td>
                    <td className="py-2.5 text-[var(--text-secondary)]">{row.required}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Session budget */}
        <section>
          <span className="label-mono">Session budget guidelines</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { mode: 'Full', tokens: '~8,000', note: 'All context items included. Use for complex multi-ticker briefs.' },
              { mode: 'Lean', tokens: '~2,000', note: 'Top-2 context items. Default for single-position briefs.' },
              { mode: 'Minimal', tokens: '~800', note: 'System prompt + current position only. Maximum speed.' },
            ].map((m) => (
              <div key={m.mode} className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-sm font-semibold text-[var(--text-primary)]">{m.mode}</span>
                  <span className="font-mono text-xs text-[var(--accent-emerald)]">{m.tokens}</span>
                </div>
                <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed">{m.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Browser harness */}
        <section>
          <span className="label-mono">Browser harness</span>
          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed mt-2 max-w-2xl">
            The operator stack is documented so Hermes can graduate into browser-driven workflows. When the browser harness is connected, Hermes can navigate brokerage interfaces, pull live quote data, and submit structured briefs automatically. That integration is not shipped yet — the docs here are the contract it will fulfill.
          </p>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/hermes"
            className="font-sans text-sm font-medium px-6 py-3 rounded bg-[var(--accent-emerald)] text-white hover:bg-[var(--accent-emerald-dim)] transition-colors self-start"
          >
            Open Hermes
          </Link>
          <Link
            href="/method"
            className="font-sans text-sm font-medium px-6 py-3 rounded border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors self-start"
          >
            See the method
          </Link>
        </div>
      </div>
    </div>
  )
}
