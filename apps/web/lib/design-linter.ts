import { SYNTHIA_RULES } from '../design-system/synthia-rules'

export interface LintResult {
  violations: string[]
  score: number
  passed: boolean
}

export function lintPublicCopy(html: string): LintResult {
  const violations: string[] = []

  for (const term of SYNTHIA_RULES.forbiddenPublicTerms) {
    if (html.includes(term)) {
      violations.push(`Forbidden term found: "${term}"`)
    }
  }

  const score = Math.max(0, 10 - violations.length * 0.5)
  return {
    violations,
    score,
    passed: score >= SYNTHIA_RULES.qualityFloor,
  }
}

export function lintNavStructure(links: string[]): LintResult {
  const violations: string[] = []
  const requiredPrimary = ['analiz', 'izveštaj', 'watchlist', 'asistent', 'početak']
  const forbidden = ['models', 'modeli', 'skills', 'veštine', 'status', 'settings']

  for (const req of requiredPrimary) {
    if (!links.some((l) => l.toLowerCase().includes(req))) {
      violations.push(`Required primary nav item missing: "${req}"`)
    }
  }
  for (const forb of forbidden) {
    if (links.some((l) => l.toLowerCase().includes(forb))) {
      violations.push(`Forbidden primary nav item found: "${forb}"`)
    }
  }

  const score = Math.max(0, 10 - violations.length)
  return { violations, score, passed: score >= SYNTHIA_RULES.qualityFloor }
}
