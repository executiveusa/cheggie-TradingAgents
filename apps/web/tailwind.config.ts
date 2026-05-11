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
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        // Emerald Tablet palette — dark mode
        'bg-base': 'var(--bg-base)',
        'bg-card': 'var(--bg-card)',
        'bg-subtle': 'var(--bg-subtle)',
        'accent-emerald': 'var(--accent-emerald)',
        'accent-emerald-dim': 'var(--accent-emerald-dim)',
        'accent-green-label': 'var(--accent-green-label)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-emerald': 'var(--border)',
        'code-green': 'var(--code-green)',
      },
      maxWidth: {
        content: '1200px',
      },
      letterSpacing: {
        label: '0.12em',
      },
    },
  },
  plugins: [],
}

export default config
