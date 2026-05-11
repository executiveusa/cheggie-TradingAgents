export const metadata = {
  title: 'Operator Stack — CHEGGIE TRADE',
  description: 'Hermes operator system prompt structure, context ranking, route configuration, and browser harness docs.',
}

export default function OperatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">

      <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">Operator stack</p>
      <h1 className="text-5xl font-bold text-[var(--ct-text)] mb-4 leading-tight">
        How Hermes is configured as a market persona.
      </h1>
      <p className="text-lg text-[var(--ct-muted)] mb-16 max-w-xl">
        The operator layer is what turns a generic language model into a finance-literate market desk that sounds like a sharp operator.
      </p>

      <div className="flex flex-col gap-12">

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--ct-text)] mb-4">The system prompt architecture</h2>
          <div className="text-[var(--ct-muted)] space-y-4 leading-relaxed">
            <p>
              The Hermes system prompt has three layers. The first layer establishes the persona: Hermes is a market intelligence desk operator, not a general assistant. It speaks in brief, direct sentences. It leads every response with risk before opportunity.
            </p>
            <p>
              The second layer sets hard constraints. Hermes never claims a trade is executing. It never presents a price target as certain. When the model route is degraded or the answer quality is suspect, Hermes says so rather than papering over the problem.
            </p>
            <p>
              The third layer is format enforcement. Every brief must contain a risk read, a catalyst read, a hedge path if one exists, and a model note. This structure keeps the trader from having to extract meaning from prose.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--ct-text)] mb-4">Context ranking and turn budgets</h2>
          <div className="text-[var(--ct-muted)] space-y-4 leading-relaxed">
            <p>
              Before each request, Hermes scores every piece of available context against the current ticker and catalyst. Ticker-specific watchlist notes score highest. Portfolio-level constraints score second. General instructions and session history score lowest and are trimmed first when the context window is tight.
            </p>
            <p>
              Turn budgets prevent the session from accumulating noise across many exchanges. After a set number of turns, older exchanges are compressed into a summary and removed from the live context. This keeps each brief tight without losing the essential thread of the session.
            </p>
            <p>
              The result is a system that spends tokens on judgment rather than repetition. A trader who has been working the same ticker for four turns gets a response that reflects that history, not a blank-slate answer that ignores it.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--ct-text)] mb-4">Route configuration options</h2>
          <div className="text-[var(--ct-muted)] space-y-4 leading-relaxed">
            <p>
              The routing stack is configured through environment variables. Each lane has a corresponding key variable. When a key is missing, that lane is skipped and the next one is tried. The desk never fails silently — if all configured lanes fail, the response includes the exact failure reason.
            </p>
            <p>
              The auto route tries lanes in priority order: xAI first, then Groq, then OpenRouter on the NVIDIA free lane, then Gemini, then the Synthia gateway if one is configured, then the Python backend as a final fallback. An operator can override this order or force a specific lane from the route preference panel.
            </p>
            <p>
              The audit trail records the actual lane used, not the intended one. If xAI was preferred but fell back to Groq, the audit says Groq. This matters because different lanes have different latency and quality profiles that the trader should factor into how much weight they put on the answer.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--ct-text)] mb-4">Browser harness connection path</h2>
          <div className="text-[var(--ct-muted)] space-y-4 leading-relaxed">
            <p>
              The operator stack is structured so that Hermes can graduate from a brief desk into a browser-driven workflow when a harness is connected. The current surface exposes a stateless API route at /api/hermes that accepts a position brief and returns a structured response. A harness would extend this by subscribing to market events, running timed re-briefs, and pushing alerts without waiting for a user prompt.
            </p>
            <p>
              The system prompt architecture supports this extension. The persona constraints, format enforcement, and context ranking are all in the operator layer, not baked into the UI. Connecting a harness means adding a new entry point that feeds the same operator pipeline rather than rewriting the product.
            </p>
            <p>
              This path is documented here so that operators evaluating CHEGGIE TRADE as a platform base understand what is already wired up and what the next step looks like. The harness connection is not yet live in the current build.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
