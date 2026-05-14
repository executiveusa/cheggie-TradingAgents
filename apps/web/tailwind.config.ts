import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        positive: 'var(--positive)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        // legacy aliases
        'ct-bg': 'var(--bg)',
        'ct-card': 'var(--surface)',
        'ct-emerald': 'var(--accent)',
        'ct-emerald-dim': 'var(--accent-dim)',
        'ct-text': 'var(--text)',
        'ct-muted': 'var(--muted)',
        'ct-border': 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
export default config
