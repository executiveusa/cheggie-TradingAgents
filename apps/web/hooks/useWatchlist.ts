'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'ct_watchlist'
const MAX_TICKERS = 50

export function useWatchlist() {
  const [tickers, setTickers] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTickers(JSON.parse(raw))
    } catch {}
    setLoaded(true)
  }, [])

  const persist = (next: string[]) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }

  const add = useCallback((sym: string) => {
    const upper = sym.trim().toUpperCase()
    if (!upper) return false
    setTickers((prev) => {
      if (prev.includes(upper) || prev.length >= MAX_TICKERS) return prev
      const next = [...prev, upper]
      persist(next)
      return next
    })
    return true
  }, [])

  const remove = useCallback((sym: string) => {
    setTickers((prev) => {
      const next = prev.filter((t) => t !== sym)
      persist(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setTickers([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  return { tickers, add, remove, clear, loaded }
}
