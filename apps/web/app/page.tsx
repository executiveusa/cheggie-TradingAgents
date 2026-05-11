'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ChessKnightSVG } from '@/lib/logo'
import { wordReveal, fadeUp, staggerContainer, slideInRight, cardEntrance } from '@/lib/animations'

function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={wordReveal}
          custom={i}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

function AnimCard({ children, i = 0 }: { children: React.ReactNode; i?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={cardEntrance}
      custom={i}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-8"
    >
      {children}
    </motion.div>
  )
}

function StoryStep({ num, title, body, i }: { num: string; title: string; body: string; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={slideInRight}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: i * 0.1 }}
      className="rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-8"
    >
      <p className="font-mono text-xs text-[var(--ct-emerald)] mb-3 tracking-widest">{num}</p>
      <h3 className="text-xl font-bold text-[var(--ct-text)] mb-3">{title}</h3>
      <p className="text-[var(--ct-muted)] leading-relaxed">{body}</p>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef(null)

  return (
    <div className="bg-[var(--ct-bg)]">

      {/* ── HERO ── */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-start">

          {/* Left */}
          <div>
            <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-6">
              CHEGGIE TRADE
            </p>
            <h1 ref={heroRef} className="text-6xl lg:text-8xl font-bold leading-[0.92] tracking-tight text-[var(--ct-text)] mb-8">
              <WordReveal text="A market desk built for the trader who still wants the why." />
            </h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              className="text-lg text-[var(--ct-muted)] mb-10 max-w-lg leading-relaxed"
            >
              CHEGGIE TRADE gives you one place to brief a setup, route across live models, and read an answer that sounds like a sharp operator instead of a hype bot.
            </motion.p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 1 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link href="/hermes"
                className="rounded-xl bg-[var(--ct-emerald)] px-6 py-3 font-semibold text-black hover:bg-[var(--ct-emerald-dim)] transition-colors">
                Open Hermes
              </Link>
              <Link href="/demo"
                className="rounded-xl border border-[var(--ct-border)] px-6 py-3 font-semibold text-[var(--ct-text)] hover:border-[var(--ct-emerald)] transition-colors">
                Run live demo
              </Link>
              <Link href="/method"
                className="px-6 py-3 text-[var(--ct-muted)] hover:text-[var(--ct-text)] underline-offset-4 hover:underline transition-colors">
                See the method
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { stat: '6 lanes', desc: 'xAI, Groq, OpenRouter, Gemini, gateway, backend' },
                { stat: '1 audit', desc: 'Every answer reports the route that produced it' },
                { stat: 'Lean pack', desc: 'Session context is compressed before it hits the model' },
              ].map((s, i) => (
                <AnimCard key={s.stat} i={i}>
                  <p className="text-2xl font-bold text-[var(--ct-text)] mb-1">{s.stat}</p>
                  <p className="text-xs text-[var(--ct-muted)]">{s.desc}</p>
                </AnimCard>
              ))}
            </div>
          </div>

          {/* Right — Live desk preview card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="rounded-3xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-8 sticky top-24"
          >
            <div className="flex items-center gap-3 mb-6">
              <ChessKnightSVG className="h-10 w-10 text-[var(--ct-emerald)]" />
              <p className="font-mono text-xs tracking-widest text-[var(--ct-emerald)] uppercase">CHEGGIE TRADE</p>
            </div>
            <p className="font-mono text-xs text-[var(--ct-emerald)] mb-4">Live desk preview</p>
            <p className="text-2xl font-bold text-[var(--ct-text)] mb-8 leading-snug">
              Hermes weighs concentration, liquidity, catalyst risk, and hedge paths before it ever sounds certain.
            </p>

            {[
              { title: 'Grok first when configured', body: 'The desk can route through xAI and reuse a stable session id for better prompt-cache behavior.' },
              { title: 'Groq for speed', body: 'Groq stays in the chain for fast reasoning when a compatible key is available.' },
              { title: 'OpenRouter pinned to a free NVIDIA lane', body: 'The default OpenRouter model is a known NVIDIA free route so the product gets actual final-answer text instead of a drifting reasoning-only free model.' },
              { title: 'Gemini, gateway, and backend safety net', body: 'The app keeps a truthful fallback path instead of failing silently when quotas or keys go bad.' },
            ].map((f) => (
              <div key={f.title} className="border-l-2 border-[var(--ct-emerald)] pl-4 mb-5">
                <p className="font-semibold text-[var(--ct-text)] text-sm mb-1">{f.title}</p>
                <p className="text-xs text-[var(--ct-muted)] leading-relaxed">{f.body}</p>
              </div>
            ))}

            <div className="mt-6 rounded-xl border border-[var(--ct-border)] bg-[var(--ct-subtle)] p-4">
              <p className="font-mono text-xs text-[var(--ct-emerald)] mb-2">Sample market brief</p>
              <p className="text-sm text-[var(--ct-muted)] leading-relaxed">
                A 28% NVDA weight is now portfolio risk, not just single-name risk. Treat the earnings catalyst like an exposure event and size the hedge before you size the optimism.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { h: 'You do not need another fake oracle.', b: 'You need a desk that can explain concentration risk, invalidate bad sizing, and admit when the model route is degraded.' },
            { h: 'Most retail tooling shows output, not reasoning.', b: 'CHEGGIE TRADE turns the answer into a readable market brief so the trader can challenge the thesis before acting.' },
            { h: 'Token spend should go into judgment, not noise.', b: 'Hermes packs context, trims repeated memory, and keeps the prompt narrow so the model pays attention to the real setup.' },
          ].map((c, i) => (
            <AnimCard key={c.h} i={i}>
              <h3 className="text-lg font-bold text-[var(--ct-text)] mb-3 leading-snug">{c.h}</h3>
              <p className="text-sm text-[var(--ct-muted)] leading-relaxed">{c.b}</p>
            </AnimCard>
          ))}
        </div>
      </section>

      {/* ── SCROLL STORY ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-16">
          <div className="lg:sticky lg:top-32 h-fit">
            <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">Scroll story</p>
            <h2 className="text-4xl font-bold text-[var(--ct-text)] leading-tight mb-4">
              The product tells the trade story in the right order.
            </h2>
            <p className="text-[var(--ct-muted)]">
              No fake certainty. No noisy dashboard theater. Just a tighter market brief from the moment the user opens the page.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { num: '01', title: 'Frame the market problem', body: 'Hermes starts with the position, catalyst, and downside. It does not waste time pretending every prompt is a blank slate.' },
              { num: '02', title: 'Rank the context that matters', body: 'Portfolio notes, watchlist details, prior instructions, and ticker-specific memory are scored before each request.' },
              { num: '03', title: 'Route through the healthiest model lane', body: 'The desk tries premium or free routes in order, then writes the exact provider result into the audit trail so the trader knows what really happened.' },
              { num: '04', title: 'Return a brief a trader can use', body: 'The answer should sound like a sharp market operator: risk first, setup second, and no fantasy about trades being executed.' },
            ].map((s, i) => <StoryStep key={s.num} {...s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">Use cases</p>
        <h2 className="text-4xl font-bold text-[var(--ct-text)] mb-12 leading-tight max-w-2xl">
          This product solves real trader pain, not abstract AI theater.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { h: 'Concentration risk before earnings', b: 'Ask whether a single-name position is now portfolio risk. Hermes checks size, sector overlap, and known catalyst dates.' },
            { h: 'Position sizing under real constraints', b: 'Run capital, stop distance, and catalyst timing through one brief instead of three tabs and a spreadsheet.' },
            { h: 'Watchlist triage in one pass', b: 'Compare symbols on liquidity, catalyst quality, and risk before the market opens.' },
          ].map((c, i) => (
            <AnimCard key={c.h} i={i}>
              <h3 className="text-lg font-bold text-[var(--ct-text)] mb-3 leading-snug">{c.h}</h3>
              <p className="text-sm text-[var(--ct-muted)] leading-relaxed">{c.b}</p>
            </AnimCard>
          ))}
        </div>
      </section>

      {/* ── OPERATOR STACK ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">Operator stack</p>
        <h2 className="text-4xl font-bold text-[var(--ct-text)] mb-12 leading-tight max-w-2xl">
          Built to scale into an autonomous desk.
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { h: 'Hermes operator layer', b: 'A product-facing market persona that stays concise, finance-literate, and explicit about uncertainty.' },
            { h: 'jCodeMunch-style prompt discipline', b: 'Ranked context, turn budgets, and compact session packing reduce waste before each provider request.' },
            { h: 'Browser harness ready', b: 'The operator stack is documented so Hermes can graduate into browser-driven workflows when the browser harness is connected.' },
            { h: 'Gateway plus provider flexibility', b: 'You can swing between direct providers, Synthia Gateway, and the backend without rebuilding the product story.' },
          ].map((c, i) => (
            <AnimCard key={c.h} i={i}>
              <h3 className="text-lg font-bold text-[var(--ct-text)] mb-3">{c.h}</h3>
              <p className="text-sm text-[var(--ct-muted)] leading-relaxed">{c.b}</p>
            </AnimCard>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-12">
          <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">Next move</p>
          <h2 className="text-4xl font-bold text-[var(--ct-text)] mb-8 leading-tight max-w-2xl">
            Put Hermes on a live brief and watch the route stack work.
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/demo"
              className="rounded-xl bg-[var(--ct-emerald)] px-8 py-4 font-semibold text-black hover:bg-[var(--ct-emerald-dim)] transition-colors">
              Watch the live demo
            </Link>
            <Link href="/hermes"
              className="rounded-xl border border-[var(--ct-border)] px-8 py-4 font-semibold text-[var(--ct-text)] hover:border-[var(--ct-emerald)] transition-colors">
              Open the workspace
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
