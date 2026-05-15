'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'

interface BrowserSession {
  id: string
  status: 'running' | 'awaiting_approval' | 'idle'
  current_url: string
  pending_action?: { type: string; description: string }
}

export default function BrowserPage() {
  const { lang } = useLanguage()
  const [session, setSession] = useState<BrowserSession | null>(null)
  const [starting, setStarting] = useState(false)

  async function startSession() {
    setStarting(true)
    try {
      const res = await fetch('/api/browser/session', { method: 'POST' })
      const data = await res.json()
      setSession(data)
    } catch {
      setSession({ id: 'demo-session', status: 'idle', current_url: 'about:blank' })
    } finally {
      setStarting(false)
    }
  }

  async function handleAction(approve: boolean) {
    if (!session) return
    try {
      await fetch('/api/browser/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session.id, approved: approve }),
      })
      setSession(prev => prev ? { ...prev, status: 'running', pending_action: undefined } : prev)
    } catch {}
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">
        {lang === 'sr' ? 'KONTROLA PREGLEDAČA' : 'BROWSER CONTROL'}
      </p>
      <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
        {lang === 'sr' ? 'Agent pregledač' : 'Agent browser'}
      </h1>
      <p className="text-[var(--muted)] mb-12 max-w-xl leading-relaxed">
        {lang === 'sr'
          ? 'Pokrenite sesiju pregledača kojom upravlja agent. Rizične akcije zahtevaju vaše odobrenje.'
          : 'Start a browser session controlled by the agent. Risky actions require your approval.'}
      </p>

      {!session ? (
        <button
          onClick={startSession}
          disabled={starting}
          className="rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-40"
        >
          {starting
            ? (lang === 'sr' ? 'Pokrećem...' : 'Starting...')
            : (lang === 'sr' ? 'Pokreni sesiju' : 'Start session')}
        </button>
      ) : (
        <div className="space-y-4">
          {/* Session status */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                {lang === 'sr' ? 'Aktivna sesija' : 'Active session'}
              </p>
              <span className={`font-mono text-xs px-3 py-1 rounded border ${
                session.status === 'running' ? 'text-[var(--positive)] border-[var(--positive)]/30 bg-[var(--positive)]/10' :
                session.status === 'awaiting_approval' ? 'text-[var(--warning)] border-[var(--warning)]/30 bg-[var(--warning)]/10' :
                'text-[var(--muted)] border-[var(--border)]'
              }`}>
                {session.status === 'running' ? (lang === 'sr' ? 'AKTIVAN' : 'RUNNING') :
                 session.status === 'awaiting_approval' ? (lang === 'sr' ? 'ČEKA ODOBRENJE' : 'AWAITING APPROVAL') :
                 (lang === 'sr' ? 'NEAKTIVAN' : 'IDLE')}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] font-mono">{session.current_url}</p>
          </div>

          {/* Screenshot placeholder */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] aspect-video flex items-center justify-center">
            <p className="text-[var(--muted)] text-sm">
              {lang === 'sr' ? 'Snimak ekrana se učitava...' : 'Screenshot loading...'}
            </p>
          </div>

          {/* Pending action approval */}
          {session.pending_action && (
            <div className="rounded-2xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 p-6">
              <p className="font-mono text-xs text-[var(--warning)] tracking-widest uppercase mb-3">
                {lang === 'sr' ? 'AKCIJA ZAHTEVA ODOBRENJE' : 'ACTION REQUIRES APPROVAL'}
              </p>
              <p className="text-[var(--text)] mb-2 font-semibold">{session.pending_action.type}</p>
              <p className="text-sm text-[var(--muted)] mb-6">{session.pending_action.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(true)}
                  className="rounded-xl bg-[var(--accent)] px-6 py-2.5 font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors"
                >
                  {lang === 'sr' ? 'Odobri' : 'Approve'}
                </button>
                <button
                  onClick={() => handleAction(false)}
                  className="rounded-xl border border-[var(--danger)]/30 text-[var(--danger)] px-6 py-2.5 font-semibold hover:bg-[var(--danger)]/10 transition-colors"
                >
                  {lang === 'sr' ? 'Odbij' : 'Deny'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
