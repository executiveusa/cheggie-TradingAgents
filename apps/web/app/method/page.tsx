import Link from 'next/link'

export const metadata = {
  title: 'Method — CHEGGIE TRADE',
  description: 'How Hermes routes across 6 model lanes, packs context, and produces an audit trail on every brief.',
}

const LANES = [
  { name: 'xAI Grok', description: 'Primary premium route. Reuses stable session id for prompt-cache efficiency.', type: 'premium' },
  { name: 'Groq', description: 'Fast inference lane. Best for rapid reasoning when latency matters.', type: 'premium' },
  { name: 'OpenRouter → NVIDIA', description: 'Pinned to a known free NVIDIA lane that returns final-answer text, not reasoning-only output.', type: 'free' },
  { name: 'Gemini', description: 'Google fallback. Activates when xAI and Groq quota is exhausted.', type: 'fallback' },
  { name: 'Gateway', description: 'Synthia Gateway layer — enables provider swapping without rebuilding product logic.', type: 'fallback' },
  { name: 'Backend', description: 'Direct backend call as final safety net. Never fails silently.', type: 'fallback' },
]

const LANE_COLORS: Record<string, string> = {
  premium: 'bg-[var(--accent-emerald)] text-white',
  free: 'bg-[var(--bg-subtle)] text-[var(--accent-emerald)] border border-[var(--accent-emerald)]',
  fallback: 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]',
}

const AUDIT_EXAMPLE = `{
  "brief_id": "brf_20260510_nvda_0847",
  "ticker": "NVDA",
  "route_attempted": ["grok", "groq", "openrouter"],
  "route_used": "openrouter",
  "model": "nvidia/llama-3.1-nemotron-70b",
  "tokens_in": 1204,
  "tokens_out": 643,
  "total_tokens": 1847,
  "duration_ms": 2104,
  "context_mode": "lean",
  "context_items_ranked": 4,
  "context_items_included": 2,
  "confidence": "moderate",
  "timestamp": "2026-05-10T08:47:23Z"
}`

export default function MethodPage() {
  return (
    <div className="pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-content mx-auto flex flex-col gap-20">
        {/* Header */}
        <div>
          <span className="label-mono">Method</span>
          <h1 className="font-sans font-bold text-[clamp(36px,5vw,64px)] leading-tight tracking-[-0.03em] text-[var(--text-primary)] mt-4 text-balance max-w-2xl">
            How Hermes works.
          </h1>
          <p className="font-sans text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mt-4 max-w-xl">
            No invented claims. This is the actual routing stack, prompt discipline, and audit system behind every market brief.
          </p>
        </div>

        {/* Section 1 — 6-lane routing */}
        <section>
          <span className="label-mono">Section 1</span>
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-[var(--text-primary)] mt-3 mb-8 text-balance">
            The 6-lane routing stack
          </h2>
          <div className="flex flex-col gap-3">
            {LANES.map((lane, i) => (
              <div key={lane.name} className="flex items-start gap-5 p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                <div className="flex items-center gap-3 w-6 shrink-0">
                  <span className="font-mono text-xs text-[var(--accent-emerald)]">0{i + 1}</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="sm:w-52 shrink-0">
                    <span className="font-sans text-sm font-semibold text-[var(--text-primary)]">{lane.name}</span>
                  </div>
                  <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed flex-1">{lane.description}</p>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded shrink-0 self-start sm:self-auto ${LANE_COLORS[lane.type]}`}>
                    {lane.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — jCodeMunch */}
        <section>
          <span className="label-mono">Section 2</span>
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-[var(--text-primary)] mt-3 mb-6 text-balance">
            jCodeMunch-style prompt packing
          </h2>
          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8">
            Before every request, Hermes ranks available context by relevance and trims what the model does not need. The goal is to keep token spend inside the reasoning budget, not waste it on repeated memory.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
              <span className="label-mono text-[var(--text-secondary)]">Without packing</span>
              <div className="font-mono text-xs text-[var(--text-secondary)] mt-3 flex flex-col gap-1">
                <span>System prompt: 2,400 tokens</span>
                <span>Full session history: 8,200 tokens</span>
                <span>Portfolio context: 1,800 tokens</span>
                <span className="text-red-400 mt-2">Total: 12,400 tokens — 68% noise</span>
              </div>
            </div>
            <div className="p-5 rounded-lg bg-[var(--bg-card)] border-l-2 border-l-[var(--accent-emerald)] border border-[var(--border)]">
              <span className="label-mono">With lean packing</span>
              <div className="font-mono text-xs text-[var(--text-secondary)] mt-3 flex flex-col gap-1">
                <span>System prompt: 800 tokens</span>
                <span>Top-2 context items: 720 tokens</span>
                <span>Current position: 320 tokens</span>
                <span className="text-[var(--accent-emerald)] mt-2">Total: 1,840 tokens — all judgment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Audit trail */}
        <section>
          <span className="label-mono">Section 3</span>
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-[var(--text-primary)] mt-3 mb-6 text-balance">
            The audit trail anatomy
          </h2>
          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Every brief returns a structured audit entry. The trader knows exactly which model answered, which route was taken, how many tokens were spent, and how long it took.
          </p>
          <pre className="font-mono text-xs text-[var(--code-green)] bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-5 overflow-x-auto leading-relaxed">
            {AUDIT_EXAMPLE}
          </pre>
        </section>

        {/* Section 4 — Operator layer */}
        <section>
          <span className="label-mono">Section 4</span>
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-[var(--text-primary)] mt-3 mb-6 text-balance">
            The operator layer
          </h2>
          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Hermes stays persona-consistent through an operator system prompt that enforces three rules: finance-literate language, explicit uncertainty acknowledgment, and no fantasy about trade execution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Finance-literate voice', body: 'Every response uses trader vocabulary: concentration, catalyst, hedge path, downside. Not "AI insights" or "smart suggestions."' },
              { title: 'Explicit uncertainty', body: 'When the model route degrades or confidence is low, Hermes says so. It does not fill gaps with confident-sounding noise.' },
              { title: 'No execution fantasy', body: 'Hermes is a brief desk, not a bot. It never says "buy X" or implies trades will be executed. That is the operator constraint.' },
            ].map((card) => (
              <div key={card.title} className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                <h3 className="font-sans text-sm font-semibold text-[var(--text-primary)]">{card.title}</h3>
                <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mt-2">{card.body}</p>
              </div>
            ))}
          </div>
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
            href="/operator"
            className="font-sans text-sm font-medium px-6 py-3 rounded border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors self-start"
          >
            Operator stack docs
          </Link>
        </div>
      </div>
    </div>
  )
}
