'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeSlideRight } from '@/lib/animations'

type StoryStep = {
  number: string
  title: string
  body: string
}

type ScrollStoryProps = {
  steps: StoryStep[]
  sectionLabel: string
  headline: string
  subtext: string
}

function StoryStepCard({ step, index }: { step: StoryStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeSlideRight}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="flex gap-6 p-6 md:p-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]"
    >
      <span className="font-mono text-xs font-medium text-[var(--accent-emerald)] shrink-0 pt-1 tracking-widest">
        {step.number}
      </span>
      <div>
        <h3 className="font-sans text-base md:text-lg font-semibold text-[var(--text-primary)] leading-snug">
          {step.title}
        </h3>
        <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mt-2">
          {step.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function ScrollStory({ steps, sectionLabel, headline, subtext }: ScrollStoryProps) {
  return (
    <section className="w-full py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-content mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left sticky panel */}
          <div className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start">
            <span className="label-mono">{sectionLabel}</span>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mt-4 text-balance">
              {headline}
            </h2>
            <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed mt-4">
              {subtext}
            </p>
          </div>

          {/* Right scrolling steps */}
          <div className="lg:w-3/5 flex flex-col gap-4">
            {steps.map((step, i) => (
              <StoryStepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
