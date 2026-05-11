import Hero from '@/components/hero'
import ScrollStory from '@/components/scroll-story'
import FeatureCard from '@/components/feature-card'
import Link from 'next/link'

const STORY_STEPS = [
  {
    number: '01',
    title: 'Frame the market problem',
    body: 'Hermes starts with the position, catalyst, and downside. It does not waste time pretending every prompt is a blank slate.',
  },
  {
    number: '02',
    title: 'Rank the context that matters',
    body: 'Portfolio notes, watchlist details, prior instructions, and ticker-specific memory are scored before each request.',
  },
  {
    number: '03',
    title: 'Route through the healthiest model lane',
    body: 'The desk tries premium or free routes in order, then writes the exact provider result into the audit trail so the trader knows what really happened.',
  },
  {
    number: '04',
    title: 'Return a brief a trader can use',
    body: 'The answer should sound like a sharp market operator: risk first, setup second, and no fantasy about trades being executed.',
  },
]

const PAIN_CARDS = [
  {
    title: 'You do not need another fake oracle.',
    body: 'You need a desk that can explain concentration risk, invalidate bad sizing, and admit when the model route is degraded.',
  },
  {
    title: 'Most retail tooling shows output, not reasoning.',
    body: 'CHEGGIE TRADE turns the answer into a readable market brief so the trader can challenge the thesis before acting.',
  },
  {
    title: 'Token spend should go into judgment, not noise.',
    body: 'Hermes packs context, trims repeated memory, and keeps the prompt narrow so the model pays attention to the real setup.',
  },
]

const USE_CASE_CARDS = [
  {
    title: 'Concentration risk before earnings',
    body: 'Ask whether a single-name position is now portfolio risk. Hermes checks size, sector overlap, and known catalyst dates.',
  },
  {
    title: 'Position sizing under real constraints',
    body: 'Run capital, stop distance, and catalyst timing through one brief instead of three tabs and a spreadsheet.',
  },
  {
    title: 'Watchlist triage in one pass',
    body: 'Compare symbols on liquidity, catalyst quality, and risk before the market opens.',
  },
]

const OPERATOR_CARDS = [
  {
    title: 'Hermes operator layer',
    body: 'A product-facing market persona that stays concise, finance-literate, and explicit about uncertainty.',
  },
  {
    title: 'jCodeMunch-style prompt discipline',
    body: 'Ranked context, turn budgets, and compact session packing reduce waste before each provider request.',
  },
  {
    title: 'Browser harness ready',
    body: 'The operator stack is documented so Hermes can graduate into browser-driven workflows when the browser harness is connected.',
  },
  {
    title: 'Gateway plus provider flexibility',
    body: 'You can swing between direct providers, Synthia Gateway, and the backend without rebuilding the product story.',
  },
]

export default function Page() {
  return (
    <>
      {/* Section 1 — Hero */}
      <Hero />

      {/* Section 2 — Pain points */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-[var(--bg-subtle)]">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAIN_CARDS.map((card, i) => (
              <FeatureCard key={card.title} title={card.title} body={card.body} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Scroll story */}
      <ScrollStory
        steps={STORY_STEPS}
        sectionLabel="Scroll story"
        headline="The product tells the trade story in the right order."
        subtext="No fake certainty. No noisy dashboard theater. Just a tighter market brief from the moment the user opens the page."
      />

      {/* Section 4 — Use cases */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-[var(--bg-subtle)]">
        <div className="max-w-content mx-auto">
          <span className="label-mono">Use cases</span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mt-4 text-balance max-w-2xl">
            This product solves real trader pain, not abstract AI theater.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {USE_CASE_CARDS.map((card, i) => (
              <FeatureCard key={card.title} title={card.title} body={card.body} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Operator stack */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <span className="label-mono">Operator stack</span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mt-4 text-balance max-w-2xl">
            Built to scale into an autonomous desk.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {OPERATOR_CARDS.map((card, i) => (
              <FeatureCard key={card.title} title={card.title} body={card.body} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — CTA */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-[var(--bg-subtle)]">
        <div className="max-w-content mx-auto text-center flex flex-col items-center gap-6">
          <span className="label-mono">Next move</span>
          <h2 className="font-sans text-3xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight text-balance max-w-2xl">
            Put Hermes on a live brief and watch the route stack work.
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              href="/demo"
              className="font-sans text-sm font-medium px-6 py-3 rounded bg-[var(--accent-emerald)] text-white hover:bg-[var(--accent-emerald-dim)] transition-colors"
            >
              Watch the live demo
            </Link>
            <Link
              href="/hermes"
              className="font-sans text-sm font-medium px-6 py-3 rounded border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
            >
              Open the workspace
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
