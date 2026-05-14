'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CTLogo } from '@/lib/logo'
import { useLanguage } from '@/lib/language-context'

function LoginForm() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabaseEnabled = !!process.env.NEXT_PUBLIC_SUPABASE_URL

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabaseEnabled) {
      window.location.href = next
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        window.location.href = next
      } else {
        const d = await res.json()
        setError(d.error || (lang === 'sr' ? 'Prijava nije uspela.' : 'Login failed.'))
      }
    } catch {
      setError(lang === 'sr' ? 'Mrežna greška. Pokušajte ponovo.' : 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
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
            {lang === 'sr' ? 'Prijavite se' : 'Sign in'}
          </h1>
          <p className="text-sm text-[var(--muted)] mb-8">
            {lang === 'sr' ? 'Dobrodošli nazad u CheggieTrade.' : 'Welcome back to CheggieTrade.'}
          </p>

          {!supabaseEnabled && (
            <div className="rounded-xl bg-[var(--elevated)] border border-[var(--border)] p-4 mb-6">
              <p className="text-xs text-[var(--muted)]">
                {lang === 'sr'
                  ? 'Auth nije konfigurisan. Klik na prijavljivanje vas vodi direktno.'
                  : 'Auth not configured. Clicking sign in takes you directly.'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5">
                {lang === 'sr' ? 'Email' : 'Email'}
              </label>
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
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-[var(--danger)]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? (lang === 'sr' ? 'Prijavljivanje...' : 'Signing in...')
                : (lang === 'sr' ? 'Prijavite se' : 'Sign in')}
            </button>
          </form>

          <p className="text-sm text-[var(--muted)] mt-6 text-center">
            {lang === 'sr' ? 'Nemate nalog? ' : "Don't have an account? "}
            <Link href="/auth/signup" className="text-[var(--accent)] hover:underline">
              {lang === 'sr' ? 'Registrujte se' : 'Sign up'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
