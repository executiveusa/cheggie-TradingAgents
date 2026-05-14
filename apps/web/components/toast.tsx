'use client'

import { useEffect, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
}

let _dispatch: ((t: ToastMessage) => void) | null = null

export function toast(message: string, type: ToastType = 'info') {
  if (_dispatch) {
    _dispatch({ id: `${Date.now()}`, message, type })
  }
}

const typeStyles: Record<ToastType, string> = {
  success: 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]',
  error: 'border-[var(--danger)] bg-red-500/10 text-red-400',
  info: 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)]',
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    _dispatch = (t) => {
      setToasts((prev) => [...prev, t])
      setTimeout(() => {
        setToasts((prev) => prev.filter((p) => p.id !== t.id))
      }, 3500)
    }
    return () => { _dispatch = null }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`rounded-xl border px-4 py-3 text-sm font-medium shadow-lg animate-fade-in max-w-xs ${typeStyles[t.type]}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
