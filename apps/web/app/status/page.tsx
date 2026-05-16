'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'

interface SystemStatus {
  api: 'online' | 'offline' | 'checking'
  demo_mode: boolean
  model_routes: { name: string; available: boolean }[]
}

export default function StatusPage() {
  const { lang } = useLanguage()
  const [status, setStatus] = useState<SystemStatus>({
    api: 'checking',
    demo_mode: true,
    model_routes: [
      { name: 'auto', available: false },
      { name: 'gateway', available: false },
      { name: 'groq', available: false },
      { name: 'openrouter', available: false },
      { name: 'gemini', available: false },
    ],
  })

  useEffect(() => {
    fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker: 'PING' }),
    })
      .then(r => r.json())
      .then(d => {
        setStatus(prev => ({
          ...prev,
          api: (d.mode === 'demo' || d.mode === 'demo-fallback') ? 'offline' : 'online',
          demo_mode: d.mode === 'demo' || d.mode === 'demo-fallback',
        }))
      })
      .catch(() => setStatus(prev => ({ ...prev, api: 'offline' })))
  }, [])

  const statusColor = { online: 'var(--positive)', offline: 'var(--danger)', checking: 'var(--warning)' }[status.api]
  const statusLabel = {
    online: lang === 'sr' ? 'Online' : 'Online',
    offline: lang === 'sr' ? 'Offline' : 'Offline',
    checking: lang === 'sr' ? 'Proveravam...' : 'Checking...',
  }[status.api]

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
        {lang === 'sr' ? 'STATUS SISTEMA' : 'SYSTEM STATUS'}
      </p>
      <h1 className="text-4xl font-bold text-[var(--text)] mb-12">
        {lang === 'sr' ? 'Stanje platforme' : 'Platform health'}
      </h1>

      <div className="space-y-4">
        {/* API status */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-[var(--text)] mb-1">
              {lang === 'sr' ? 'API server' : 'API server'}
            </p>
            <p className="text-sm text-[var(--muted)]">
              {lang === 'sr' ? 'Python / FastAPI pozadinski servis' : 'Python / FastAPI backend service'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: statusColor }} />
            <span className="font-mono text-sm" style={{ color: statusColor }}>{statusLabel}</span>
          </div>
        </div>

        {/* Demo mode */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-[var(--text)] mb-1">
              {lang === 'sr' ? 'Režim rada' : 'Operating mode'}
            </p>
            <p className="text-sm text-[var(--muted)]">
              {lang === 'sr'
                ? status.demo_mode ? 'Demo — AI ključevi nisu konfigurisani' : 'Live — AI ključevi konfigurisani'
                : status.demo_mode ? 'Demo — AI keys not configured' : 'Live — AI keys configured'}
            </p>
          </div>
          <span className={`font-mono text-xs px-3 py-1 rounded-lg border ${
            status.demo_mode
              ? 'text-[var(--warning)] border-[var(--warning)]/30 bg-[var(--warning)]/10'
              : 'text-[var(--positive)] border-[var(--positive)]/30 bg-[var(--positive)]/10'
          }`}>
            {status.demo_mode ? 'DEMO' : 'LIVE'}
          </span>
        </div>

        {/* Info card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--elevated)] p-6">
          <p className="font-mono text-xs text-[var(--accent)] mb-3 tracking-widest">
            {lang === 'sr' ? 'KAKO AKTIVIRATI LIVE REŽIM' : 'HOW TO ACTIVATE LIVE MODE'}
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            {lang === 'sr'
              ? 'Konfigurišite API ključeve za AI provajdera u .env fajlu i pokrenite API server. Demo brif ostaje dostupan bez ključeva.'
              : 'Configure AI provider API keys in your .env file and start the API server. A demo brief remains available without keys.'}
          </p>
        </div>
      </div>
    </div>
  )
}
