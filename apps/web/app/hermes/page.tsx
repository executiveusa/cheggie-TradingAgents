'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ChessKnight from '@/components/chess-knight'
import ThemeToggle from '@/components/theme-toggle'

type RoutePreference = 'auto' | 'grok' | 'groq' | 'openrouter' | 'gemini'
type ContextMode = 'full' | 'lean' | 'minimal'
type CatalystType = 'earnings' | 'macro' | 'technical' | 'custom'
type RiskLevel = 'low' | 'moderate' | 'high' | 'critical'

type AuditEntry = {
  model: string
  tokens: number
  route: string
  time: number
}

type BriefMessage = {
  id: string
  type: 'user' | 'hermes'
  ticker?: string
  catalyst?: string
  content?: string
  risk?: RiskLevel
  catalystRead?: string
  hedgePath?: string
  modelNote?: string
  timestamp: Date
}

const DEMO_BRIEF: BriefMessage = {
  id: 'demo',
  type: 'hermes',
  ticker: 'NVDA',
  catalyst: 'earnings',
  risk: 'high',
  catalystRead:
    'Q2 earnings in 11 days. Market has priced in significant upside; miss risk is asymmetric.',
  hedgePath:
    'Reduce to 15–18% weight before the event, or hedge with near-dated puts. Do not size the optimism.',
  modelNote: 'OpenRouter → NVIDIA free lane — 1,847 tokens — 2.1s',
  content:
    'A 28% NVDA weight is now portfolio risk, not just single-name risk. Treat the earnings catalyst like an exposure event and size the hedge before you size the optimism.',
  timestamp: new Date(),
}

const RISK_COLORS: Record<RiskLevel, string> = {
  low: 'text-green-400 bg-green-400/10 border-green-400/30',
  moderate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  high: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  critical: 'text-red-400 bg-red-400/10 border-red-400/30',
}

function ConnectionStatus({ status }: { status: 'live' | 'connecting' | 'degraded' }) {
  const colors = { live: 'bg-green-400', connecting: 'bg-yellow-400', degraded: 'bg-red-400' }
  const labels = { live: 'Live', connecting: 'Connecting', degraded: 'Degraded' }
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${colors[status]} ${status === 'live' ? 'animate-pulse' : ''}`} />
      <span className="font-mono text-xs text-[var(--text-secondary)]">{labels[status]}</span>
    </div>
  )
}

function BriefCard({ msg }: { msg: BriefMessage }) {
  if (msg.type === 'user') {
    return (
      <div className="px-4 py-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)]">
        <span className="label-mono">Brief request</span>
        <p className="font-mono text-sm text-[var(--text-primary)] mt-1">
          {msg.ticker} &mdash; {msg.catalyst}
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden">
      <div className="border-b border-[var(--border)] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChessKnight size={18} className="text-[var(--accent-emerald)]" />
          <span className="label-mono">Hermes market brief</span>
        </div>
        {msg.risk && (
          <span className={`font-mono text-xs px-2 py-0.5 rounded border ${RISK_COLORS[msg.risk]}`}>
            {msg.risk.toUpperCase()} RISK
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col gap-4">
        <p className="font-sans text-sm md:text-base text-[var(--text-primary)] leading-relaxed">
          {msg.content}
        </p>
        {msg.catalystRead && (
          <div>
            <span className="label-mono">Catalyst read</span>
            <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mt-1">{msg.catalystRead}</p>
          </div>
        )}
        {msg.hedgePath && (
          <div>
            <span className="label-mono">Hedge path</span>
            <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mt-1">{msg.hedgePath}</p>
          </div>
        )}
        {msg.modelNote && (
          <p className="font-mono text-xs text-[var(--code-green)] border-t border-[var(--border)] pt-3 mt-1">
            {msg.modelNote}
          </p>
        )}
      </div>
    </div>
  )
}

export default function HermesPage() {
  const [ticker, setTicker] = useState('')
  const [size, setSize] = useState('')
  const [catalyst, setCatalyst] = useState<CatalystType>('earnings')
  const [downside, setDownside] = useState('')
  const [route, setRoute] = useState<RoutePreference>('auto')
  const [contextMode, setContextMode] = useState<ContextMode>('lean')
  const [followUp, setFollowUp] = useState('')
  const [messages, setMessages] = useState<BriefMessage[]>([DEMO_BRIEF])
  const [loading, setLoading] = useState(false)
  const [connectionStatus] = useState<'live' | 'connecting' | 'degraded'>('degraded')
  const [audit, setAudit] = useState<AuditEntry | null>({
    model: 'OpenRouter / nvidia/llama-3.1-nemotron-70b',
    tokens: 1847,
    route: 'free-lane',
    time: 2100,
  })
  const [routeBadge, setRouteBadge] = useState('OpenRouter → NVIDIA')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleBrief(e: React.FormEvent) {
    e.preventDefault()
    if (!ticker.trim()) return

    const userMsg: BriefMessage = {
      id: Date.now().toString(),
      type: 'user',
      ticker: ticker.toUpperCase(),
      catalyst,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch('/api/hermes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, size, catalyst, downside, context_mode: contextMode, route_preference: route }),
      })
      const data = await res.json()
      const hermesMsg: BriefMessage = {
        id: (Date.now() + 1).toString(),
        type: 'hermes',
        ticker: ticker.toUpperCase(),
        risk: data.risk ?? 'moderate',
        catalystRead: data.catalyst_read ?? '',
        hedgePath: data.hedge_path ?? '',
        content: data.brief ?? data.message ?? 'Brief returned no readable content.',
        modelNote: `${data.model_used ?? 'Unknown'} — ${data.tokens ?? 0} tokens — ${data.route ?? 'unknown route'}`,
        timestamp: new Date(),
      }
      setAudit({ model: data.model_used ?? '', tokens: data.tokens ?? 0, route: data.route ?? '', time: data.duration_ms ?? 0 })
      setRouteBadge(data.route ?? 'unknown')
      setMessages((prev) => [...prev, hermesMsg])
    } catch {
      // Graceful demo fallback
      const fallback: BriefMessage = {
        id: (Date.now() + 1).toString(),
        type: 'hermes',
        ticker: ticker.toUpperCase(),
        risk: 'moderate',
        content: `Hermes could not reach the backend for ${ticker.toUpperCase()}. The desk is running in demo mode. Connect NEXT_PUBLIC_API_URL to enable live routing.`,
        modelNote: 'Demo mode — backend unreachable',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallback])
    } finally {
      setLoading(false)
    }
  }

  async function handleFollowUp(e: React.FormEvent) {
    e.preventDefault()
    if (!followUp.trim()) return
    const userMsg: BriefMessage = {
      id: Date.now().toString(),
      type: 'user',
      ticker: followUp,
      catalyst: 'Follow-up query',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setFollowUp('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    const reply: BriefMessage = {
      id: (Date.now() + 1).toString(),
      type: 'hermes',
      content: 'Follow-up routing is available when the backend is connected. Running in demo mode.',
      modelNote: 'Demo mode',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, reply])
    setLoading(false)
  }

  function handleClear() {
    setMessages([])
    setAudit(null)
    setRouteBadge('—')
  }

  const ROUTE_OPTIONS: { value: RoutePreference; label: string }[] = [
    { value: 'auto', label: 'Auto' },
    { value: 'grok', label: 'Grok First' },
    { value: 'groq', label: 'Groq' },
    { value: 'openrouter', label: 'OpenRouter' },
    { value: 'gemini', label: 'Gemini' },
  ]

  const CONTEXT_OPTIONS: { value: ContextMode; label: string }[] = [
    { value: 'full', label: 'Full' },
    { value: 'lean', label: 'Lean' },
    { value: 'minimal', label: 'Minimal' },
  ]

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-base)]">
      {/* Minimal top bar */}
      <header className="h-16 flex items-center justify-between px-5 md:px-8 border-b border-[var(--border)] bg-[var(--bg-card)] shrink-0">
        <Link href="/" className="flex items-center gap-3 text-[var(--accent-emerald)] hover:opacity-80 transition-opacity">
          <ChessKnight size={28} />
          <span className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--text-primary)]">HERMES</span>
        </Link>

        <div className="flex items-center gap-4">
          <ConnectionStatus status={connectionStatus} />
          <span className="font-mono text-xs text-[var(--code-green)] hidden sm:block">{routeBadge}</span>
          <ThemeToggle />
        </div>
      </header>

      {/* Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — brief form */}
        <aside className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col border-r border-[var(--border)] bg-[var(--bg-card)] overflow-y-auto">
          <div className="p-5 flex flex-col gap-5 flex-1">
            <div>
              <span className="label-mono">Market Brief</span>

              <form onSubmit={handleBrief} className="flex flex-col gap-3 mt-4">
                <input
                  type="text"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  placeholder="Ticker (e.g. NVDA)"
                  className="font-mono text-lg w-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--accent-emerald)] transition-colors"
                />
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Position size ($ or %)"
                  className="font-sans text-sm w-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[var(--accent-emerald)] transition-colors"
                />
                <select
                  value={catalyst}
                  onChange={(e) => setCatalyst(e.target.value as CatalystType)}
                  className="font-sans text-sm w-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-primary)] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[var(--accent-emerald)] transition-colors"
                >
                  <option value="earnings">Earnings</option>
                  <option value="macro">Macro event</option>
                  <option value="technical">Technical</option>
                  <option value="custom">Custom</option>
                </select>
                <textarea
                  value={downside}
                  onChange={(e) => setDownside(e.target.value)}
                  placeholder="Downside notes (optional)"
                  rows={3}
                  className="font-sans text-sm w-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[var(--accent-emerald)] transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={loading || !ticker.trim()}
                  className="w-full font-sans text-sm font-medium py-2.5 rounded-lg bg-[var(--accent-emerald)] text-white hover:bg-[var(--accent-emerald-dim)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Brief Hermes
                </button>
              </form>
            </div>

            {/* Session controls */}
            <div className="flex flex-col gap-3">
              <span className="label-mono">Route preference</span>
              <div className="flex flex-wrap gap-1.5">
                {ROUTE_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setRoute(o.value)}
                    className={`font-mono text-xs px-2.5 py-1 rounded border transition-colors ${
                      route === o.value
                        ? 'border-[var(--accent-emerald)] text-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              <span className="label-mono mt-2">Context mode</span>
              <div className="flex gap-1.5">
                {CONTEXT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setContextMode(o.value)}
                    className={`font-mono text-xs px-2.5 py-1 rounded border transition-colors ${
                      contextMode === o.value
                        ? 'border-[var(--accent-emerald)] text-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleClear}
                className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] self-start transition-colors mt-1"
              >
                Clear session
              </button>
            </div>
          </div>

          {/* Audit panel */}
          <div className="border-t border-[var(--border)] p-5">
            <span className="label-mono">Audit trail</span>
            {audit ? (
              <div className="font-mono text-xs text-[var(--code-green)] mt-3 flex flex-col gap-1">
                <span>Model: {audit.model}</span>
                <span>Tokens: {audit.tokens.toLocaleString()}</span>
                <span>Route: {audit.route}</span>
                <span>Time: {audit.time}ms</span>
              </div>
            ) : (
              <p className="font-mono text-xs text-[var(--text-secondary)] mt-2">No brief submitted yet.</p>
            )}
          </div>
        </aside>

        {/* Right panel — output */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[var(--bg-base)]">
          <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 flex flex-col gap-4">
            {messages.map((msg) => (
              <BriefCard key={msg.id} msg={msg} />
            ))}

            {loading && (
              <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ChessKnight size={16} className="text-[var(--accent-emerald)]" />
                  <span className="font-mono text-xs text-[var(--text-secondary)] tracking-widest uppercase">
                    Hermes is reading the brief...
                  </span>
                </div>
                <div className="hermes-progress-bar rounded" />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Follow-up input bar */}
          <div className="border-t border-[var(--border)] px-5 md:px-8 py-4 bg-[var(--bg-card)]">
            <form onSubmit={handleFollowUp} className="flex gap-3">
              <input
                type="text"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                placeholder="Ask a follow-up question..."
                className="flex-1 font-sans text-sm bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[var(--accent-emerald)] transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !followUp.trim()}
                className="font-sans text-sm font-medium px-5 py-2.5 rounded-lg bg-[var(--accent-emerald)] text-white hover:bg-[var(--accent-emerald-dim)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                Ask Hermes
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
