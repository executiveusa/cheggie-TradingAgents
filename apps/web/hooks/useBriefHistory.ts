'use client'

import { useState, useEffect, useCallback } from 'react'

export interface BriefRecord {
  id: string
  ticker: string
  risk: string
  catalyst: string
  hedge: string
  model_note: string
  tokens: number
  time_ms: number
  mode: string
  timestamp: string
  route: string
}

const STORAGE_KEY = 'ct_brief_history'
const MAX_HISTORY = 50

export function useBriefHistory() {
  const [history, setHistory] = useState<BriefRecord[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setHistory(JSON.parse(raw))
    } catch {}
  }, [])

  const addBrief = useCallback((brief: Omit<BriefRecord, 'id'>) => {
    const record: BriefRecord = { ...brief, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` }
    setHistory((prev) => {
      const next = [record, ...prev].slice(0, MAX_HISTORY)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
    return record.id
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  return { history, addBrief, clearHistory }
}
