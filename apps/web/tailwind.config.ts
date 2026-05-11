import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ct-bg': 'var(--ct-bg)',
        'ct-card': 'var(--ct-card)',
        'ct-emerald': 'var(--ct-emerald)',
        'ct-emerald-dim': 'var(--ct-emerald-dim)',
        'ct-text': 'var(--ct-text)',
        'ct-muted': 'var(--ct-muted)',
        'ct-border': 'var(--ct-border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
