'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { wordReveal, fadeSlideUp, staggerContainer } from '@/lib/animations'
import ChessKnight from './chess-knight'
import StatBlock from './stat-block'
import FeatureCard from './feature-card'

const HEADLINE_WORDS = ['A', 'market', 'desk', 'built', 'for', 'the', 'trader', 'who', 'still', 'wants', 'the', 'why.']

const STATS = [
  { value: '6', label: '6 lanes', description: 'xAI, Groq, OpenRouter, Gemini, gateway, backend' },
  { value: '1', label: '1 audit', description: 'Every answer reports the route that produced it' },
  { value: 'Lean', label: 'Lean pack', description: 'Session context is compressed before it hits the model' },
]

const PREVIEW_FEATURES = [
  {
    title: 'Grok first when configured',
    body: 'The desk can route through xAI and reuse a stable session id for better prompt-cache behavior.',
  },
  {
    title: 'Groq for speed',
    body: 'Groq stays in the chain for fast reasoning when a compatible key is available.',
  },
  {
    title: 'OpenRouter pinned to a free NVIDIA lane',
    body: 'The default OpenRouter model is a known NVIDIA free route so the product gets actual final-answer text instead of a drifting reasoning-only free model.',
  },
  {
    title: 'Gemini, gateway, and backend safety net',
    body: 'The app keeps a truthful fallback path instead of failing silently when quotas or keys go bad.',
  },
]

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10">
      <div className="max-w-content mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left column */}
          <div className="lg:w-3/5">
            <span className="label-mono">CHEGGIE TRADE</span>

            {/* Word-reveal headline */}
            <motion.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="font-sans font-bold text-[clamp(48px,8vw,104px)] leading-[0.93] tracking-[-0.03em] text-[var(--text-primary)] mt-6 text-balance"
            >
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordReveal}
                  className="inline-block mr-[0.22em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              variants={fadeSlideUp}
              custom={0}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
              className="font-sans text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mt-7 max-w-xl"
            >
              CHEGGIE TRADE gives you one place to brief a setup, route across live models, and read an answer that sounds like a sharp operator instead of a hype bot.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeSlideUp}
              custom={0}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.85 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <Link
                href="/hermes"
                className="font-sans text-sm font-medium px-5 py-2.5 rounded bg-[var(--accent-emerald)] text-white hover:bg-[var(--accent-emerald-dim)] transition-colors"
              >
                Open Hermes
              </Link>
              <Link
                href="/demo"
                className="font-sans text-sm font-medium px-5 py-2.5 rounded border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
              >
                Run live demo
              </Link>
              <Link
                href="/method"
                className="font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--accent-emerald)] underline underline-offset-4 transition-colors"
              >
                See the method
              </Link>
            </motion.div>

            {/* Stats */}
            <StatBlock stats={STATS} />
          </div>

          {/* Right column — live desk preview card */}
          <motion.div
            variants={fadeSlideUp}
            custom={0}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="lg:w-2/5 w-full"
          >
            <div className="rounded-xl bg-[var(--bg-card)] border-t-2 border-t-[var(--accent-emerald)] border border-[var(--border)] p-6 md:p-8 glow-card">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4">
                <ChessKnight size={24} className="text-[var(--accent-emerald)]" />
                <span className="label-mono">Live desk preview</span>
              </div>

              <p className="font-sans text-lg md:text-xl font-semibold text-[var(--text-primary)] leading-snug mb-6">
                Hermes weighs concentration,
                liquidity, catalyst risk,
                and hedge paths before
                it ever sounds certain.
              </p>

              {/* Feature list */}
              <div className="flex flex-col gap-4">
                {PREVIEW_FEATURES.map((f, i) => (
                  <FeatureCard key={f.title} title={f.title} body={f.body} index={i} variant="bordered-left" />
                ))}
              </div>

              {/* Sample market brief */}
              <div className="mt-6 p-5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)]">
                <span className="label-mono">Sample market brief</span>
                <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
                  A 28% NVDA weight is now portfolio risk, not just single-name risk. Treat the earnings catalyst like an exposure event and size the hedge before you size the optimism.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
