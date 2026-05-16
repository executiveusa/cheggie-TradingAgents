import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32">
      <div className="rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-12">
        <p className="font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase mb-4">Page not found</p>
        <h1 className="text-4xl font-bold text-[var(--ct-text)] mb-4">This page is not on the board.</h1>
        <p className="text-[var(--ct-muted)] mb-8">
          The page you asked for is outside the current CheggieTrade surface. Head back to the main desk and keep moving from there.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="rounded-xl bg-[var(--ct-emerald)] px-6 py-3 font-semibold text-black">Back to overview</Link>
          <Link href="/analyze" className="rounded-xl border border-[var(--ct-border)] px-6 py-3 font-semibold text-[var(--ct-text)]">Run an analysis</Link>
          <Link href="/assistant" className="rounded-xl border border-[var(--ct-border)] px-6 py-3 font-semibold text-[var(--ct-text)]">Open assistant</Link>
        </div>
      </div>
    </div>
  )
}
