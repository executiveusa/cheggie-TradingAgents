interface AgentProfileProps {
  confidence?: number;
}

export function AgentProfile({ confidence = 87 }: AgentProfileProps) {
  return (
    <section className="rounded-3xl border border-white/20 bg-black/10 p-6" aria-label="ZEUS agent profile">
      <h2 className="text-2xl font-bold">ZEUS Agent Profile</h2>
      <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
        <div><dt className="opacity-70">Agent Name</dt><dd className="font-semibold">ZEUS</dd></div>
        <div><dt className="opacity-70">Designation</dt><dd className="font-semibold">Trading Desk Reasoning Engine</dd></div>
        <div><dt className="opacity-70">Primary Function</dt><dd className="font-semibold">Risk-first market brief generation</dd></div>
        <div><dt className="opacity-70">Routing Stack</dt><dd className="font-semibold">xAI (Grok) → Groq → OpenRouter → Gemini fallback</dd></div>
        <div><dt className="opacity-70">Trust Model</dt><dd className="font-semibold">Transparent routing + audit trail</dd></div>
        <div><dt className="opacity-70">Confidence Display</dt><dd className="font-semibold">Confidence: {confidence}%</dd></div>
        <div className="md:col-span-2"><dt className="opacity-70">Browser Capability</dt><dd className="font-semibold">Live research and real-time market data lookup</dd></div>
      </dl>
    </section>
  );
}
