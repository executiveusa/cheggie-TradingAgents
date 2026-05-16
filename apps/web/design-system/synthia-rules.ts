/**
 * Synthia Superdesign Rules
 * Source: https://github.com/executiveusa/synthia-superdesign
 * Note: Dedicated docs files (emerald-tablets.md, design-laws.md, taste.md) returned 404.
 * Rules inferred from README + CLAUDE.md project policy.
 *
 * Emerald Tablets (inferred):
 * 1. Every component must serve user outcomes, not expose internals.
 * 2. Typography is hierarchy — use the permitted type scale only.
 * 3. Color must communicate meaning, not decoration.
 * 4. Motion must guide attention, not entertain.
 * 5. Copy must be outcome-first; never expose technology stack names.
 * 6. Spacing must follow the 4px base grid — no arbitrary values.
 * 7. Quality floor is 8.5/10 — ship nothing below this threshold.
 * 8. Dark-first design with light mode as a first-class citizen.
 * 9. Anti-patterns must be actively avoided, not just deprioritized.
 * 10. Nav structure must match user mental model, not system architecture.
 */
export const SYNTHIA_RULES = {
  qualityFloor: 8.5,
  source: 'https://github.com/executiveusa/synthia-superdesign',
  typography: {
    permitted: ['Space Grotesk', 'JetBrains Mono', 'DM Sans', 'DM Mono', 'IBM Plex Sans'],
    forbidden: ['Inter', 'Roboto', 'Arial', 'Helvetica', 'Open Sans'],
  },
  spacing: {
    base: '4px',
    scale: ['4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '64px'],
  },
  color: {
    tokens: [
      '--ct-bg',
      '--ct-surface',
      '--ct-elevated',
      '--ct-text',
      '--ct-muted',
      '--ct-border',
      '--ct-emerald',
      '--ct-emerald-soft',
      '--ct-positive',
      '--ct-warning',
      '--ct-danger',
      '--ct-grid',
      '--ct-glow',
    ],
  },
  layout: {
    maxWidth: '1280px',
    gridBase: '40px',
  },
  motion: {
    permitted: ['fadeUp', 'slideIn', 'stagger', 'scaleIn'],
    forbidden: ['random gradients', 'meaningless animations', 'jarring transitions'],
  },
  antiPatterns: [
    'generic card grids',
    'default Tailwind template look',
    'cramped dashboards',
    'dev-tool UI exposed to users',
    'overexposed model routing',
    'AI toy aesthetic',
    'random gradients',
    'meaningless animations',
    'duplicated sections',
    'placeholder-looking layout',
    'marketing copy that describes internals instead of user outcomes',
    'tech stack names in hero',
    'model provider names in public copy',
  ],
  forbiddenPublicTerms: [
    'ChatGPT Trade',
    'GPT Trade',
    'Zeus',
    'TauricResearch',
    'TradingAgents',
    'Groq',
    'Grok',
    'xAI',
    'OpenRouter',
    'NVIDIA free lane',
    'prompt cache',
    'token spend',
    'gateway route',
    'model lane',
    'route preference',
    'Hermes',
  ],
} as const
