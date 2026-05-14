'use client'

import { useState, useEffect } from 'react'
import type { Tier } from '@/lib/tier-config'

export interface AppUser {
  id: string
  email: string
  tier: Tier
  briefsUsed: number
  isDemo: boolean
}

const DEMO_USER: AppUser = {
  id: 'demo',
  email: 'demo@cheggie.trade',
  tier: 'free',
  briefsUsed: 0,
  isDemo: true,
}

export function useUser() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) {
      setUser(DEMO_USER)
      setLoading(false)
      return
    }

    // When Supabase is configured, attempt real session check
    async function loadSession() {
      try {
        const res = await fetch('/api/auth/session')
        if (res.ok) {
          const data = await res.json()
          setUser(data.user ?? DEMO_USER)
        } else {
          setUser(null)
        }
      } catch {
        setUser(DEMO_USER)
      } finally {
        setLoading(false)
      }
    }
    loadSession()
  }, [])

  function incrementBriefs() {
    setUser((u) => u ? { ...u, briefsUsed: u.briefsUsed + 1 } : u)
  }

  return { user, loading, incrementBriefs }
}
