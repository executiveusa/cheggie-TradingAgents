export type Tier = 'free' | 'pro' | 'team'

export const TIER_LIMITS = {
  free: {
    briefs: 10,
    routes: ['auto'] as string[],
    skills: [] as string[],
    watchlistSize: 5,
    history: false,
    export: false,
    alerts: 0,
    apiAccess: false,
  },
  pro: {
    briefs: Infinity,
    routes: ['auto', 'gateway', 'grok', 'groq', 'openrouter', 'gemini'] as string[],
    skills: ['/comps', '/dcf', '/earnings-analysis', '/sector-overview'] as string[],
    watchlistSize: 20,
    history: true,
    export: true,
    alerts: 10,
    apiAccess: false,
  },
  team: {
    briefs: Infinity,
    routes: ['auto', 'gateway', 'grok', 'groq', 'openrouter', 'gemini'] as string[],
    skills: 'all' as const,
    watchlistSize: 100,
    history: true,
    export: true,
    alerts: Infinity,
    apiAccess: true,
  },
} as const

export const TIER_LABELS: Record<Tier, { sr: string; en: string }> = {
  free: { sr: 'Besplatno', en: 'Free' },
  pro: { sr: 'Pro', en: 'Pro' },
  team: { sr: 'Tim', en: 'Team' },
}

export const TIER_PRICES: Record<Tier, { monthly: number; annual: number }> = {
  free: { monthly: 0, annual: 0 },
  pro: { monthly: 29, annual: 19 },
  team: { monthly: 99, annual: 69 },
}

export function canUseRoute(tier: Tier, route: string): boolean {
  const limits = TIER_LIMITS[tier]
  return (limits.routes as readonly string[]).includes(route)
}

export function canUseSkill(tier: Tier, skill: string): boolean {
  const limits = TIER_LIMITS[tier]
  if (limits.skills === 'all') return true
  return (limits.skills as string[]).includes(skill)
}

export function briefsRemaining(tier: Tier, used: number): number {
  const limit = TIER_LIMITS[tier].briefs
  return limit === Infinity ? Infinity : Math.max(0, limit - used)
}
