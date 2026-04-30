export default function ExplainerPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-slate-100 bg-slate-950 min-h-screen">
      <h1 className="mb-4 text-4xl font-bold">What is ChatGPT Trade?</h1>
      <p className="mb-6 text-slate-300">
        ChatGPT Trade is a guided AI trading assistant built on top of the open-source TradingAgents framework.
        Instead of one bot giving one opinion, it simulates a small trading team so beginners can understand the “why” behind a recommendation.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">What happens after you enter a stock ticker?</h2>
      <ol className="mb-6 list-decimal pl-6 text-slate-300 space-y-2">
        <li>Analysts review company fundamentals, market sentiment, news, and charts.</li>
        <li>A bullish and bearish researcher debate the opportunity.</li>
        <li>A trader agent proposes action and position sizing.</li>
        <li>Risk management checks volatility/liquidity before final approval.</li>
      </ol>
      <h2 className="mb-2 text-2xl font-semibold">Why this helps non-technical users</h2>
      <ul className="list-disc pl-6 text-slate-300 space-y-2">
        <li>Clear explanations instead of confusing technical dashboards.</li>
        <li>A step-by-step decision process you can read and challenge.</li>
        <li>A safer mindset: risk checks are built into every recommendation.</li>
      </ul>
    </main>
  );
}
