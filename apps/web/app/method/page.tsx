export const metadata = {
  title: 'Method — CHEGGIE TRADE',
  description: 'How Hermes routes across 6 model lanes, packs context, and produces an audit trail on every brief.',
}

const lanes = [
  { name: 'xAI / Grok', color: 'border-[var(--ct-emerald)] bg-[var(--ct-emerald)]/10', note: 'First choice when an xAI key is configured — reuses stable session IDs for better prompt-cache behavior.' },
  { name: 'Groq', color: 'border-blue-500 bg-blue-500/10', note: 'Fast inference lane for reasoning when a compatible Groq key is available.' },
  { name: 'OpenRouter (NVIDIA free)', color: 'border-purple-500 bg-purple-500/10', note: 'Pinned to a known NVIDIA free route to guarantee final-answer text instead of a drifting reasoning-only model.' },
  { name: 'Gemini', color: 'border-teal-500 bg-teal-500/10', note: 'Google Gemini lane for multimodal or fallback coverage when other keys are exhausted.' },
  { name: 'Synthia Gateway', color: 'border-amber-500 bg-amber-500/10', note: 'Operator-configured gateway route for managed deployments that need key abstraction.' },
  { name: 'Backend fallback', color: 'border-gray-500 bg-gray-500/10', note: 'Final safety net that routes through the Python tradingagents backend when all other lanes fail.' },
]

export default function MethodPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">

      <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">How it works</p>
      <h1 className="text-5xl font-bold text-[var(--ct-text)] mb-4 leading-tight">
        The 6-lane routing stack and the prompt discipline behind it.
      </h1>
      <p className="text-lg text-[var(--ct-muted)] mb-16 max-w-xl">
        Every brief Hermes runs goes through the same stack: route selection, context packing, model call, audit write.
      </p>

      {/* Section 1 — Model lanes */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--ct-text)] mb-6">The model lanes</h2>
        <div className="flex flex-col gap-3">
          {lanes.map((lane) => (
            <div key={lane.name} className={`rounded-xl border-l-4 ${lane.color} px-6 py-4`}>
              <p className="font-semibold text-[var(--ct-text)] mb-1">{lane.name}</p>
              <p className="text-sm text-[var(--ct-muted)]">{lane.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 — jCodeMunch prompt packing */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--ct-text)] mb-4">jCodeMunch prompt packing</h2>
        <p className="text-[var(--ct-muted)] mb-6">
          Hermes ranks context by relevance score before every request. Watchlist notes beat generic instructions. Prior decisions beat session history.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-red-500/20 bg-[var(--ct-card)] p-6">
            <p className="font-mono text-xs text-red-400 tracking-widest uppercase mb-3">Before — ~4,000 tokens</p>
            <pre className="font-mono text-xs text-[var(--ct-muted)] whitespace-pre-wrap leading-relaxed">{`System: You are a helpful AI assistant.
Here are all the user's prior notes:
[entire session history]
[all watchlist entries]
[all portfolio notes]
[general trading instructions]
[repeated context from last 10 turns]

User: What should I do with NVDA?`}</pre>
          </div>
          <div className="rounded-2xl border border-[var(--ct-emerald)]/30 bg-[var(--ct-card)] p-6">
            <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-3">After — ~900 tokens</p>
            <pre className="font-mono text-xs text-[var(--ct-muted)] whitespace-pre-wrap leading-relaxed">{`System: Market desk operator.
Risk first. No trade execution.

Context (ranked):
[NVDA watchlist note, score 0.92]
[Earnings catalyst, score 0.88]
[Portfolio weight 28%, score 0.85]

User: NVDA 28%, earnings in 11 days.
Brief the risk.`}</pre>
          </div>
        </div>
      </section>

      {/* Section 3 — Audit trail */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--ct-text)] mb-4">The audit trail</h2>
        <p className="text-[var(--ct-muted)] mb-6">
          Every brief writes the exact provider and token count so the trader knows what really produced the answer.
        </p>
        <div className="rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-6">
          <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">Sample audit log</p>
          <pre className="font-mono text-xs text-[var(--ct-code)] leading-relaxed">{`Route:   OpenRouter → meta-llama/llama-3.1-405b-instruct:free
Tokens:  847 prompt / 312 completion
Time:    3.8s
Session: ctx_abc123
Mode:    demo`}</pre>
        </div>
      </section>

      {/* Section 4 — Operator layer */}
      <section>
        <h2 className="text-2xl font-bold text-[var(--ct-text)] mb-4">The operator layer</h2>
        <div className="rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-8">
          <p className="text-[var(--ct-muted)] leading-relaxed">
            Hermes stays concise, finance-literate, and explicit about uncertainty. It never pretends a trade is executing. It never claims certainty it does not have. The operator system prompt enforces a brief format: risk first, setup second, hedge path third, model note last.
          </p>
        </div>
      </section>

    </div>
  )
}
