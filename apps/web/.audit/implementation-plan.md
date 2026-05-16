# Implementation Plan
Generated: 2026-05-16

## Files to Change (in order)

### 5a. apps/web/next.config.js
- Fix /hermes → /assistant (was /analyze)
- Fix /method → /#how-it-works (was /api-docs)
- Fix /operator → /assistant (was /agents)
- Add /zeus → /

### 5b. apps/web/middleware.ts
- Middleware already correct: only protects /dashboard /reports /watchlist /settings
- No changes needed (public paths already pass through)

### 5c. apps/web/lib/i18n.ts
- Fix eyebrow.sr = 'AI trading desk za Balkan tržište'
- Fix hero.sr = 'CheggieTrade pretvara tržišnu buku u jasan trading plan.'
- Fix heroSub.sr = 'Više AI analitičara zajedno analizira tržište, proverava rizik i daje jasan izveštaj pre svake odluke.'
- Fix ctaSecondary.sr = 'Kako radi' / ctaSecondary.en = 'How it works'
- Remove ctaTertiary (or repurpose)
- Fix stats[0].desc: remove xAI/Groq/OpenRouter/gateway — use agent count
- Fix stats[1].desc: remove route mention
- Fix stats[2].desc: remove prompt cache reference
- Fix problems[2].b: remove "Hermes" → replace with "Platforma"
- Add nav.assistant entry
- Remove nav.models from primary

### 5d. apps/web/app/page.tsx
- Fix secondary CTA href="/demo" → href="/#how-it-works"
- Remove tertiary CTA (href="/method")
- Fix right preview card: remove Hermes, Grok, Groq, OpenRouter, NVIDIA references
- Replace with agent roles: Analyst, Researcher, Risk Manager
- Add id="how-it-works" to steps/solution section

### 5e. apps/web/components/nav.tsx
- Remove /models from primary links
- Remove /pricing from primary links (keep in footer)
- Add /assistant link with 'Asistent'/'Assistant' label

### 5f. Legacy pages — replace with redirect components
- apps/web/app/hermes/page.tsx → redirect component to /assistant
- apps/web/app/demo/page.tsx → redirect component to /analyze
- apps/web/app/method/page.tsx → redirect component to /#how-it-works
- apps/web/app/operator/page.tsx → redirect component to /assistant

### 5g. apps/web/lib/design-linter.ts — create new file

### 5h. apps/web/tests/e2e/acceptance.spec.ts — add new tests

### 6. apps/web/scripts/design-audit.ts — create new file
