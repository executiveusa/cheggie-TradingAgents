'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'
import { t, tr } from '@/lib/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const { lang } = useLanguage()

  return (
    <div className="bg-[var(--bg)] bg-grid">

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-[3fr_2fr] gap-16 items-start"
        >
          <div>
            <motion.p variants={fadeUp} className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-6">
              {tr(t.home.eyebrow, lang)}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-bold leading-[1.0] tracking-tight text-[var(--text)] mb-8"
            >
              {tr(t.home.hero, lang)}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[var(--muted)] mb-10 max-w-xl leading-relaxed">
              {tr(t.home.heroSub, lang)}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-16">
              <Link
                href="/analyze"
                className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors"
              >
                {tr(t.home.ctaPrimary, lang)}
              </Link>
              <Link
                href="/demo"
                className="rounded-xl border border-[var(--border)] px-6 py-3 font-semibold text-[var(--text)] hover:border-[var(--accent)] transition-colors"
              >
                {tr(t.home.ctaSecondary, lang)}
              </Link>
              <Link
                href="/method"
                className="px-6 py-3 text-[var(--muted)] hover:text-[var(--text)] underline-offset-4 hover:underline transition-colors"
              >
                {tr(t.home.ctaTertiary, lang)}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={stagger} className="grid grid-cols-3 gap-4">
              {t.home.stats.map((s, i) => (
                <Card key={i}>
                  <p className="text-2xl font-bold text-[var(--text)] mb-1 font-mono">{tr(s.stat, lang)}</p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{tr(s.desc, lang)}</p>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Right preview card */}
          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sticky top-24"
          >
            <div className="flex items-center gap-3 mb-6">
              <CTLogo className="h-9 w-9 text-[var(--accent)] animate-glow" />
              <span className="font-mono text-xs tracking-[0.18em] text-[var(--accent)] uppercase">CheggieTrade</span>
            </div>
            <p className="font-mono text-xs text-[var(--accent)] mb-4 tracking-wider">
              {lang === 'sr' ? 'Pregled živog deska' : 'Live desk preview'}
            </p>
            <p className="text-2xl font-bold text-[var(--text)] mb-8 leading-snug">
              {lang === 'sr'
                ? 'Hermes meri koncentraciju, likvidnost, rizik katalizatora i puteve zaštite pre nego što ikada zvuči sigurno.'
                : 'Hermes weighs concentration, liquidity, catalyst risk, and hedge paths before it ever sounds certain.'}
            </p>

            {[
              {
                title: lang === 'sr' ? 'Grok prvi kada je konfigurisan' : 'Grok first when configured',
                body: lang === 'sr'
                  ? 'Desk može da rutira kroz xAI i ponovo koristi stabilni session id za bolje ponašanje keširanje prompta.'
                  : 'The desk can route through xAI and reuse a stable session id for better prompt-cache behavior.',
              },
              {
                title: lang === 'sr' ? 'Groq za brzinu' : 'Groq for speed',
                body: lang === 'sr'
                  ? 'Groq ostaje u lancu za brzo rezonovanje kada je dostupan kompatibilan ključ.'
                  : 'Groq stays in the chain for fast reasoning when a compatible key is available.',
              },
              {
                title: lang === 'sr' ? 'OpenRouter zakačen za besplatnu NVIDIA liniju' : 'OpenRouter pinned to a free NVIDIA lane',
                body: lang === 'sr'
                  ? 'Podrazumevani OpenRouter model je poznata NVIDIA besplatna ruta.'
                  : 'The default OpenRouter model is a known NVIDIA free route for actual final-answer text.',
              },
            ].map((f) => (
              <div key={f.title} className="border-l-2 border-[var(--accent)] pl-4 mb-5">
                <p className="font-semibold text-[var(--text)] text-sm mb-1">{f.title}</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{f.body}</p>
              </div>
            ))}

            <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--elevated)] p-4">
              <p className="font-mono text-xs text-[var(--accent)] mb-2">
                {lang === 'sr' ? 'Primer tržišnog brifinga' : 'Sample market brief'}
              </p>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {lang === 'sr'
                  ? '28% težina NVDA je sada rizik portfolija, ne samo rizik jednog imena. Tretira katalizator zarade kao događaj ekspozicije i veliči zaštitu pre veličanja optimizma.'
                  : 'A 28% NVDA weight is now portfolio risk, not just single-name risk. Treat the earnings catalyst like an exposure event and size the hedge before you size the optimism.'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-10"
        >
          {tr(t.home.problemLabel, lang)}
        </motion.p>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {t.home.problems.map((c, i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold text-[var(--text)] mb-3 leading-snug">{tr(c.h, lang)}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{tr(c.b, lang)}</p>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* SOLUTION / STEPS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-16">
          <div className="lg:sticky lg:top-32 h-fit">
            <p className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
              {tr(t.home.solutionLabel, lang)}
            </p>
            <h2 className="text-4xl font-bold text-[var(--text)] leading-tight mb-4">
              {tr(t.home.solutionTitle, lang)}
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              {tr(t.home.solutionSub, lang)}
            </p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-6"
          >
            {t.home.steps.map((s, i) => (
              <Card key={i}>
                <p className="font-mono text-xs text-[var(--accent)] mb-3 tracking-widest">{s.num}</p>
                <h3 className="text-xl font-bold text-[var(--text)] mb-3">{tr(s.title, lang)}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{tr(s.body, lang)}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
          {tr(t.home.useCasesLabel, lang)}
        </p>
        <h2 className="text-4xl font-bold text-[var(--text)] mb-12 leading-tight max-w-2xl">
          {tr(t.home.useCasesTitle, lang)}
        </h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {t.home.useCases.map((c, i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold text-[var(--text)] mb-3 leading-snug">{tr(c.h, lang)}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{tr(c.b, lang)}</p>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* CTA BOX */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12">
          <p className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
            {lang === 'sr' ? 'Sledeći korak' : 'Next step'}
          </p>
          <h2 className="text-4xl font-bold text-[var(--text)] mb-4 leading-tight max-w-2xl">
            {tr(t.home.ctaBoxTitle, lang)}
          </h2>
          <p className="text-[var(--muted)] mb-10">
            {tr(t.home.ctaBoxSub, lang)}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/analyze"
              className="rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors"
            >
              {tr(t.home.ctaPrimary, lang)}
            </Link>
            <Link
              href="/onboarding"
              className="rounded-xl border border-[var(--border)] px-8 py-4 font-semibold text-[var(--text)] hover:border-[var(--accent)] transition-colors"
            >
              {tr(t.nav.onboarding, lang)}
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <p className="text-xs text-[var(--muted)] opacity-60 leading-relaxed border-t border-[var(--border)] pt-8">
          {tr(t.home.disclaimer, lang)}
        </p>
      </section>

    </div>
  )
}
