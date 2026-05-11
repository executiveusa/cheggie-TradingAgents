'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type StatItem = {
  value: string
  label: string
  description: string
}

type StatBlockProps = {
  stats: StatItem[]
}

function CountUp({ target, isNumeric }: { target: string; isNumeric: boolean }) {
  const [display, setDisplay] = useState(isNumeric ? '0' : target)
  const ref = useRef(false)

  useEffect(() => {
    if (!isNumeric || ref.current) return
    ref.current = true
    const num = parseInt(target, 10)
    const duration = 1200
    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(String(Math.round(eased * num)))
      if (progress < 1) requestAnimationFrame(tick)
      else setDisplay(target)
    }
    requestAnimationFrame(tick)
  }, [target, isNumeric])

  return <>{display}</>
}

export default function StatBlock({ stats }: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
    >
      {stats.map(({ value, label, description }) => {
        const isNumeric = /^\d+$/.test(value)
        return (
          <div
            key={label}
            className="flex flex-col gap-1 p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]"
          >
            <span className="font-mono text-3xl font-medium text-[var(--accent-emerald)]">
              {isInView ? <CountUp target={value} isNumeric={isNumeric} /> : (isNumeric ? '0' : value)}
            </span>
            <span className="label-mono mt-1">{label}</span>
            <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
              {description}
            </p>
          </div>
        )
      })}
    </div>
  )
}
