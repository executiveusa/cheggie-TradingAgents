'use client';

import { useMemo, useState } from 'react';

type Lang = 'en' | 'sr';

const copy = {
  en: {
    badge: 'For first-time AI-assisted traders',
    headline: 'ChatGPT Trade explains the market like a full team, not a random signal.',
    subheadline:
      'You type a stock ticker. Our AI team analyzes fundamentals, sentiment, news, and charts, then debates bull vs. bear before giving a clear, risk-checked recommendation.',
    cta: 'Try a Free Demo',
    sectionTitle: 'How it works (in plain English)',
    steps: [
      '1) Four specialist analysts review the stock from different angles.',
      '2) A bullish and bearish researcher challenge each other in a short debate.',
      '3) A trader proposes a move and a risk manager checks safety.',
      '4) A portfolio manager gives final approval with reasons you can read.'
    ],
    whyTitle: 'Why people like this approach',
    why: [
      'You can see the reasoning, not just a black-box “buy/sell.”',
      'It reduces decision paralysis when too much market info is flying around.',
      'It keeps risk review in the loop before any final recommendation.'
    ],
    pricing: 'Simple pricing: Starter 2,990 RSD / 25 EUR per month',
    disclaimer:
      'Educational tool only. Not financial advice. Always make your own final decision.',
    langSwitch: 'Srpski',
    demo: 'Run NVDA Demo',
    loading: 'Running analysis…',
    testimonials: 'Testimonials (coming soon)'
  },
  sr: {
    badge: 'Za tradere koji kreću sa AI podrškom',
    headline: 'ChatGPT Trade objašnjava tržište kao ceo tim, ne kao nasumičan signal.',
    subheadline:
      'Unesite ticker akcije. Naš AI tim analizira fundament, sentiment, vesti i tehniku, zatim vodi bull vs. bear debatu pre jasne preporuke sa kontrolom rizika.',
    cta: 'Isprobaj besplatan demo',
    sectionTitle: 'Kako radi (bez tehničkog žargona)',
    steps: [
      '1) Četiri specijalista analiziraju akciju iz različitih uglova.',
      '2) Bull i bear istraživač se sučeljavaju u kratkoj debati.',
      '3) Trader predlaže potez, a risk menadžer proverava bezbednost.',
      '4) Portfolio menadžer daje finalno odobrenje uz objašnjenje.'
    ],
    whyTitle: 'Zašto je ovaj pristup koristan',
    why: [
      'Vidite objašnjenje odluke, ne samo “buy/sell” bez konteksta.',
      'Smanjuje konfuziju kada ima previše informacija na tržištu.',
      'Kontrola rizika je deo procesa pre finalne preporuke.'
    ],
    pricing: 'Jednostavna cena: Starter 2.990 RSD / 25 EUR mesečno',
    disclaimer:
      'Edukativni alat. Nije finansijski savet. Konačnu odluku donosite vi.',
    langSwitch: 'English',
    demo: 'Pokreni NVDA demo',
    loading: 'Analiza je u toku…',
    testimonials: 'Utisci korisnika (uskoro)'
  }
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const t = useMemo(() => copy[lang], [lang]);

  const runDemo = async () => {
    try {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: 'NVDA', trade_date: '2025-01-15' })
      });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(JSON.stringify({ error: String(error) }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <p className="rounded-full border border-slate-700 px-4 py-2 text-sm">{t.badge}</p>
          <button className="rounded-md border border-slate-600 px-3 py-2" onClick={() => setLang(lang === 'en' ? 'sr' : 'en')}>
            {t.langSwitch}
          </button>
        </div>

        <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">{t.headline}</h1>
        <p className="mb-6 max-w-3xl text-lg text-slate-300">{t.subheadline}</p>

        <div className="mb-12 flex flex-wrap gap-3">
          <button className="rounded-md bg-emerald-500 px-5 py-3 font-semibold text-slate-950" onClick={runDemo}>
            {isLoading ? t.loading : t.demo}
          </button>
          <button className="rounded-md border border-slate-600 px-5 py-3">{t.cta}</button>
        </div>

        <h2 className="mb-3 text-2xl font-semibold">{t.sectionTitle}</h2>
        <ul className="mb-10 list-disc space-y-2 pl-6 text-slate-300">
          {t.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        <h2 className="mb-3 text-2xl font-semibold">{t.whyTitle}</h2>
        <ul className="mb-10 list-disc space-y-2 pl-6 text-slate-300">
          {t.why.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mb-8 rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="mb-2 font-medium">{t.pricing}</p>
          <p className="text-sm text-slate-400">{t.disclaimer}</p>
        </div>

        <div className="mb-8 rounded-lg border border-slate-800 bg-black/30 p-4">
          <h3 className="mb-2 font-semibold">API Demo Output</h3>
          <pre className="overflow-auto text-xs text-emerald-300">{result || '{ }'}</pre>
        </div>

        <footer className="border-t border-slate-800 pt-6 text-sm text-slate-400">
          <p>{t.testimonials}</p>
        </footer>
      </section>
    </main>
  );
}
