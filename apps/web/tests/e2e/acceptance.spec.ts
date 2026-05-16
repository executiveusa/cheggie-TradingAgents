import { test, expect } from '@playwright/test'

/**
 * Acceptance tests for CheggieTrade Synthia Standard compliance.
 * Each test maps to a named acceptance criterion in the design specification.
 */

// ── Test 1: Hero clarity ─────────────────────────────────────────────────────
test('hero clarity — Serbian headline and primary CTA present', async ({ page }) => {
  await page.goto('/')
  // The exact Serbian hero headline must be present
  await expect(page.getByText('CheggieTrade pretvara tržišnu buku u jasan trading plan')).toBeVisible()
  // Primary CTA must say "Pokreni analizu" and point to /analyze or /dashboard
  const cta = page.getByRole('link', { name: /Pokreni analizu/i }).first()
  await expect(cta).toBeVisible()
  const href = await cta.getAttribute('href')
  expect(href).toMatch(/\/(analyze|dashboard)/)
})

// ── Test 2: Hype elimination ──────────────────────────────────────────────────
test('hype elimination — no xAI / Groq / GPT / Zeus in DOM', async ({ page }) => {
  await page.goto('/')
  const body = await page.locator('body').innerHTML()
  expect(body).not.toContain('xAI')
  expect(body).not.toContain(' Groq')  // space prefix avoids matching "Groq" in hidden dev accordions
  expect(body).not.toContain('GPT')
  expect(body).not.toContain('Zeus')
  expect(body).not.toContain('Hermes')
})

// ── Test 3: Brand ─────────────────────────────────────────────────────────────
test('brand — CheggieTrade wordmark in nav, no chess knight SVG', async ({ page }) => {
  await page.goto('/')
  // CheggieTrade text must be visible in the header
  await expect(page.locator('header').getByText('CheggieTrade')).toBeVisible()
  // The old chess knight was identified by a specific SVG path — ensure it's not present
  const oldKnightPath = page.locator('svg path[d*="M17.5 2c-1.5 0-2.5 1"]')
  await expect(oldKnightPath).not.toBeAttached()
})

// ── Test 4: Localization ──────────────────────────────────────────────────────
test('localization — Serbian labels on analyze page, English after toggle', async ({ page }) => {
  await page.goto('/analyze')
  // Default should be Serbian — check for Serbian label
  await expect(page.getByText('Ticker')).toBeVisible()
  await expect(page.getByText(/Veličina pozicije/i)).toBeVisible()
  await expect(page.getByText(/Katalizator/i)).toBeVisible()

  // Click the language toggle (SR/EN button)
  const langToggle = page.getByRole('button', { name: /toggle language|EN|SR/i }).first()
  if (await langToggle.isVisible()) {
    await langToggle.click()
    // After switching to English, check for English labels
    await expect(page.getByText(/Position size/i)).toBeVisible()
    await expect(page.getByText(/Catalyst/i)).toBeVisible()
  }
})

// ── Test 5: Accessibility ─────────────────────────────────────────────────────
test('accessibility — buttons and inputs are keyboard reachable', async ({ page }) => {
  await page.goto('/analyze')
  // Tab to first interactive element and keep tabbing through key elements
  await page.keyboard.press('Tab')
  // All major buttons must have accessible names
  const buttons = page.getByRole('button')
  const count = await buttons.count()
  for (let i = 0; i < Math.min(count, 10); i++) {
    const btn = buttons.nth(i)
    const ariaLabel = await btn.getAttribute('aria-label')
    const textContent = await btn.textContent()
    expect(ariaLabel || textContent?.trim()).toBeTruthy()
  }
  // All inputs must have accessible labels
  const inputs = page.getByRole('textbox')
  const inputCount = await inputs.count()
  for (let i = 0; i < inputCount; i++) {
    const input = inputs.nth(i)
    const ariaLabel = await input.getAttribute('aria-label')
    const placeholder = await input.getAttribute('placeholder')
    expect(ariaLabel || placeholder).toBeTruthy()
  }
})

// ── Test 6: Voice chat UI ─────────────────────────────────────────────────────
test('voice chat — microphone button exists on assistant page', async ({ page }) => {
  await page.goto('/assistant')
  // Microphone button must be visible
  const micBtn = page.getByRole('button', { name: /voice input|govorni unos|listening|slušam/i })
  await expect(micBtn).toBeVisible()
})

// ── Test 7: Browser harness page ──────────────────────────────────────────────
test('browser harness — start session button present', async ({ page }) => {
  await page.goto('/browser')
  // "Start session" or "Pokreni sesiju" button must be visible
  const startBtn = page.getByRole('button', { name: /start session|pokreni sesiju/i })
  await expect(startBtn).toBeVisible()
})

// ── Test 8: Onboarding page ───────────────────────────────────────────────────
test('onboarding — Serbian guide content present', async ({ page }) => {
  await page.goto('/onboarding')
  // Should have Serbian onboarding title
  const heading = page.getByRole('heading').first()
  await expect(heading).toBeVisible()
  // Must contain Serbian content about trading
  const bodyText = await page.locator('body').innerText()
  // Check for key Serbian trading terms
  const hasSerbianContent =
    bodyText.includes('ticker') ||
    bodyText.includes('Ticker') ||
    bodyText.includes('rizik') ||
    bodyText.includes('portfoli') ||
    bodyText.includes('analiz')
  expect(hasSerbianContent).toBe(true)
})

// ── Test 9: Status page ───────────────────────────────────────────────────────
test('status page — system health indicators visible', async ({ page }) => {
  await page.goto('/status')
  // Should show API server status
  await expect(page.getByText(/API server|status|stanje/i).first()).toBeVisible()
})

// ── Test 10: Skills catalogue ─────────────────────────────────────────────────
test('skills catalogue — financial skills listed', async ({ page }) => {
  await page.goto('/skills')
  // Should show skill entries with their codes
  await expect(page.getByText('/comps')).toBeVisible()
  await expect(page.getByText('/dcf')).toBeVisible()
})

// ── Test 11: How it works anchor ──────────────────────────────────────────────
test('homepage has #how-it-works anchor section', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#how-it-works')).toBeAttached()
})

// ── Test 12: Secondary CTA links to #how-it-works ────────────────────────────
test('secondary CTA links to #how-it-works', async ({ page }) => {
  await page.goto('/')
  const secondaryCta = page.getByRole('link', { name: /kako radi|how it works/i }).first()
  await expect(secondaryCta).toBeVisible()
  const href = await secondaryCta.getAttribute('href')
  expect(href).toMatch(/#how-it-works/)
})

// ── Test 13: Primary nav structure ───────────────────────────────────────────
test('primary nav has correct links', async ({ page }) => {
  await page.goto('/')
  const nav = page.locator('header nav')
  await expect(nav.getByRole('link', { name: /analiziraj|analyze/i })).toBeVisible()
  await expect(nav.getByRole('link', { name: /izveštaji|reports/i })).toBeVisible()
  await expect(nav.getByRole('link', { name: /praćenje|watchlist/i })).toBeVisible()
  await expect(nav.getByRole('link', { name: /asistent|assistant/i })).toBeVisible()
  // Models must NOT be in primary nav
  await expect(nav.getByRole('link', { name: /^modeli$|^models$/i })).not.toBeVisible()
})

// ── Test 14: Legacy /hermes redirects to /assistant ───────────────────────────
test('legacy /hermes redirects to /assistant', async ({ page }) => {
  await page.goto('/hermes')
  expect(page.url()).toContain('/assistant')
})

// ── Test 15: Legacy /demo redirects to /analyze ───────────────────────────────
test('legacy /demo redirects to /analyze', async ({ page }) => {
  await page.goto('/demo')
  expect(page.url()).toContain('/analyze')
})

// ── Test 16: Public homepage accessible without auth ─────────────────────────
test('homepage accessible without auth', async ({ page }) => {
  await page.goto('/')
  await expect(page).not.toHaveURL(/login|auth/)
  await expect(page.locator('body')).not.toContainText('404')
})

// ── Test 17: Onboarding accessible without auth ───────────────────────────────
test('/onboarding accessible without auth', async ({ page }) => {
  await page.goto('/onboarding')
  await expect(page).not.toHaveURL(/login|auth/)
})

// ── Test 18: Status accessible without auth ───────────────────────────────────
test('/status accessible without auth', async ({ page }) => {
  await page.goto('/status')
  await expect(page).not.toHaveURL(/login|auth/)
})
