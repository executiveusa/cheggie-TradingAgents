'use client'

import { motion } from 'framer-motion'
import { fadeSlideUp } from '@/lib/animations'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

type FeatureCardProps = {
  title: string
  body: string
  index?: number
  variant?: 'default' | 'bordered-left'
}

export default function FeatureCard({
  title,
  body,
  index = 0,
  variant = 'default',
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeSlideUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`p-6 md:p-8 rounded-lg bg-[var(--bg-card)] ${
        variant === 'bordered-left'
          ? 'border-l-2 border-l-[var(--accent-emerald)] border border-[var(--border)]'
          : 'border border-[var(--border)]'
      }`}
    >
      <h3 className="font-sans text-base md:text-lg font-semibold text-[var(--text-primary)] leading-snug">
        {title}
      </h3>
      <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mt-3">
        {body}
      </p>
    </motion.div>
  )
}
