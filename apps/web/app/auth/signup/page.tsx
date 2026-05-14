'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'

export default function SignupPage() {
  const { lang } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const supabaseEnabled = !!process.env.NEXT_PUBLIC_SUPABASE_URL

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabaseEnabled) {
      setDone(true)
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        setDone(true)
      } else {
        const d = await res.json()
        setError(d.error || (lang === 'sr' ? 'Registracija nije uspela.' : 'Signup failed.'))
      }
    } catch {
      setError(lang === 'sr' ? 'Mrežna greška. Pokušajte ponovo.' : 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] bg-grid px-6">
        <div className="w-full max-w-sm text-center">
          <CTLogo className="h-12 w-12 text-[var(--accent)] mx-auto mb-6 animate-glow" />
          <h1 className="text-2xl font-bold text-[var(--text)] mb-3">
            {lang === 'sr' ? 'Proverite email' : 'Check your email'}
          </h1>
          <p className="text-[var(--muted)] mb-8">
            {supabaseEnabled
              ? (lang === 'sr' ? 'Poslali smo vam link za potvrdu.' : "We've sent you a confirmation link.")
              : (lang === 'sr' ? 'Demo mode — registracija simulirana.' : 'Demo mode — signup simulated.')}
          </p>
          <Link href="/auth/login" className="text-[var(--accent)] hover:underline text-sm">
            {lang === 'sr' ? '← Prijavite se' : '← Back to login'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] bg-grid px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 text-[var(--accent)] mb-10 justify-center">
          <CTLogo className="h-9 w-9 animate-glow" />
          <span className="font-mono text-sm font-bold tracking-[0.15em] uppercase">CheggieTrade</span>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h1 className="text-2xl font-bold text-[var(--text)] mb-2">
            {lang === 'sr' ? 'Kreirajte nalog' : 'Create account'}
          </h1>
          <p className="text-sm text-[var(--muted)] mb-8">
            {lang === 'sr' ? 'Počnite sa 10 besplatnih analiza.' : 'Start with 10 free analyses.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vas@email.com"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5">
                {lang === 'sr' ? 'Lozinka' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={8}
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>

            {error && <p className="text-xs text-[var(--danger)]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? (lang === 'sr' ? 'Registrovanje...' : 'Creating account...')
                : (lang === 'sr' ? 'Kreirajte nalog' : 'Create account')}
            </button>
          </form>

          <p className="text-sm text-[var(--muted)] mt-6 text-center">
            {lang === 'sr' ? 'Imate nalog? ' : 'Have an account? '}
            <Link href="/auth/login" className="text-[var(--accent)] hover:underline">
              {lang === 'sr' ? 'Prijavite se' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
