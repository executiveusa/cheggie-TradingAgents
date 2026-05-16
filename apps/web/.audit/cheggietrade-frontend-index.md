# CheggieTrade Frontend Index
Generated: Sat May 16 13:02:08 UTC 2026

## Routes (app/ directories)
app
app/agents
app/analyze
app/api
app/api-docs
app/api/analyze
app/api/assistant
app/api/auth
app/api/auth/login
app/api/auth/signup
app/api/hermes
app/api/skills
app/assistant
app/auth
app/auth/callback
app/auth/login
app/auth/signup
app/browser
app/dashboard
app/demo
app/hermes
app/method
app/models
app/onboarding
app/operator
app/pricing
app/reports
app/settings
app/skills
app/status
app/watchlist

## Page files
app/agents/page.tsx
app/analyze/page.tsx
app/api-docs/page.tsx
app/assistant/page.tsx
app/auth/login/page.tsx
app/auth/signup/page.tsx
app/browser/page.tsx
app/dashboard/page.tsx
app/demo/page.tsx
app/hermes/page.tsx
app/method/page.tsx
app/models/page.tsx
app/onboarding/page.tsx
app/operator/page.tsx
app/page.tsx
app/pricing/page.tsx
app/reports/page.tsx
app/settings/page.tsx
app/skills/page.tsx
app/status/page.tsx
app/watchlist/page.tsx

## Components
components/footer.tsx
components/mobile-nav.tsx
components/nav.tsx
components/toast.tsx

## API Routes
app/api/analyze/route.ts
app/api/assistant/route.ts
app/api/auth/login/route.ts
app/api/auth/signup/route.ts
app/api/hermes/route.ts
app/api/skills/route.ts

## Design token files
./app/globals.css
./emerald-tablet.css

## i18n files
lib/i18n.ts

## Test files
./tests/e2e/acceptance.spec.ts

## Hooks
hooks/useBriefHistory.ts
hooks/useUser.ts
hooks/useWatchlist.ts

## Public assets
public/.gitkeep

## Redirects in next.config.js
  async redirects() {
    return [
      { source: '/hermes', destination: '/analyze', permanent: true },
      { source: '/demo', destination: '/analyze', permanent: true },
      { source: '/method', destination: '/api-docs', permanent: true },
      { source: '/operator', destination: '/agents', permanent: true },
    ]
  },
}

module.exports = nextConfig

## Package.json scripts
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "dependencies": {
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.0",
    "next": "14.2.0",
    "next-themes": "^0.3.0",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.60.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",

## Forbidden terms scan
### Checking for forbidden terms in app/ directory:
VIOLATION: 'Groq' found in: app/page.tsx
app/operator/page.tsx
app/method/page.tsx
app/models/page.tsx
app/analyze/page.tsx
app/onboarding/page.tsx
VIOLATION: 'Grok' found in: app/page.tsx
app/method/page.tsx
app/models/page.tsx
app/analyze/page.tsx
app/onboarding/page.tsx
VIOLATION: 'xAI' found in: app/page.tsx
app/operator/page.tsx
app/method/page.tsx
app/models/page.tsx
VIOLATION: 'OpenRouter' found in: app/page.tsx
app/operator/page.tsx
app/method/page.tsx
app/api/hermes/route.ts
app/api/analyze/route.ts
app/models/page.tsx
app/demo/page.tsx
app/analyze/page.tsx
VIOLATION: 'NVIDIA' found in: app/page.tsx
app/operator/page.tsx
app/api/hermes/route.ts
app/api/analyze/route.ts
app/method/page.tsx
app/demo/page.tsx
VIOLATION: 'gateway route' found in: app/method/page.tsx
VIOLATION: 'Hermes' found in: app/page.tsx
app/hermes/page.tsx
app/not-found.tsx
app/method/page.tsx
app/agents/page.tsx
app/operator/page.tsx
app/demo/page.tsx

## Legacy route check
### Routes that should redirect but may still exist as pages:
LEGACY PAGE EXISTS: app/hermes
LEGACY PAGE EXISTS: app/demo
LEGACY PAGE EXISTS: app/method
LEGACY PAGE EXISTS: app/operator

## Font usage
No forbidden fonts found
emerald-tablet.css
