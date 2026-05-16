# CheggieTrade Frontend Violations
Generated: 2026-05-16

## Summary: 27 total violations across 12 categories

---

## 1. Forbidden Public Terms in UI (CRITICAL)
- **Groq** exposed in: app/page.tsx (stats card desc), app/analyze/page.tsx (route label), app/onboarding/page.tsx
- **Grok** exposed in: app/page.tsx (right preview card bullets), app/analyze/page.tsx (route label), app/onboarding/page.tsx
- **xAI** exposed in: app/page.tsx (right preview card bullets + stats), app/method/page.tsx, app/models/page.tsx
- **OpenRouter** exposed in: app/page.tsx (preview card bullets + stats desc), app/analyze/page.tsx, app/models/page.tsx, app/demo/page.tsx
- **NVIDIA** exposed in: app/page.tsx (right preview card), app/method/page.tsx, app/demo/page.tsx
- **Hermes** exposed in: app/page.tsx (right preview card title + problem bullets), lib/i18n.ts (problems[2].b), app/hermes/page.tsx, app/not-found.tsx
- **gateway route** exposed in: app/method/page.tsx

## 2. Hero Copy Mismatch
- Current hero.sr = 'Tržišna inteligencija za trgovce koji žele pravi odgovor.'
- Required hero.sr = 'CheggieTrade pretvara tržišnu buku u jasan trading plan.'
- Current eyebrow.sr = 'CHEGGIE TRADE' (should be 'AI trading desk za Balkan tržište')
- Current heroSub.sr exposes "Šest ruta modela" (forbidden internal detail)
- Required heroSub.sr = 'Više AI analitičara zajedno analizira tržište, proverava rizik i daje jasan izveštaj pre svake odluke.'

## 3. Nav Structure
- VIOLATION: /models in primary nav (should be removed)
- VIOLATION: /pricing in primary nav (non-standard)
- VIOLATION: /assistant missing from primary nav (required)
- VIOLATION: nav.watchlist missing as first-class entry (reports/watchlist present but no assistant)

## 4. Legacy Pages as Standalone (not redirects)
- app/hermes/page.tsx exists (should be deleted/replaced by redirect only)
- app/demo/page.tsx exists (should be deleted/replaced by redirect only)
- app/method/page.tsx exists (should be deleted/replaced by redirect only)
- app/operator/page.tsx exists (should be deleted/replaced by redirect only)

## 5. Redirect Destinations Wrong
- /hermes → /analyze (should be /assistant)
- /method → /api-docs (should be /#how-it-works)
- /operator → /agents (should be /assistant)
- /zeus → / (missing entirely)

## 6. Homepage Secondary CTA
- href="/demo" (should be /#how-it-works)
- href="/method" (tertiary, should be removed or merged)

## 7. Right Preview Card — Forbidden Content
- Title: "Hermes meri..." (forbidden: Hermes)
- Bullet 1: "Grok first when configured" (forbidden: Grok)
- Bullet 2: "Groq for speed" (forbidden: Groq)
- Bullet 3: "OpenRouter pinned to a free NVIDIA lane" (forbidden: OpenRouter + NVIDIA)

## 8. Stats Cards — Forbidden Content
- stat[0].desc: "xAI, Groq, OpenRouter, Gemini, gateway, backend" (forbidden multiple terms)
- stat[2].desc: "prompt-cache behavior" (via problems bullet — forbidden: prompt cache)

## 9. Problem Section
- problems[2].b references "Hermes" (forbidden)
- Token spend reference in problems[2].b

## 10. How-It-Works Anchor Missing
- No section with id="how-it-works" found in app/page.tsx
- Steps section has no id anchor

## 11. i18n Missing Entries
- nav.assistant missing (no entry)
- ctaSecondary should be 'Kako radi'/'How it works' (currently 'Pogledaj demo'/'View Demo')
- ctaTertiary pointing to /method (should be removed or changed)

## 12. analyze/page.tsx — Internal Route Selectors Exposed
- ROUTES array and ROUTE_LABELS expose 'grok', 'groq', 'openrouter', 'gateway' to users
- These are internal routing terms that violate anti-patterns policy
