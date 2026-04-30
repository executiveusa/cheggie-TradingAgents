'use client';
import { useState } from 'react';

const copy = {
  en: {
    title: 'ChatGPT Trade', subtitle: 'Agentic AI for Serbian traders in US markets', cta: 'Get Started'
  },
  sr: {
    title: 'ChatGPT Trade', subtitle: 'Agentička AI platforma za srpske tradere na US tržištu', cta: 'Počni'
  }
};

export default function Page() {
  const [lang, setLang] = useState<'en'|'sr'>('en');
  const [result, setResult] = useState<string>('');
  const t = copy[lang];
  const api = process.env.NEXT_PUBLIC_API_URL;

  return <main className="min-h-screen p-10">
    <button onClick={() => setLang(lang === 'en' ? 'sr' : 'en')}>{lang.toUpperCase()}</button>
    <h1>{t.title}</h1>
    <p>{t.subtitle}</p>
    <p>Starter: 2,990 RSD / 25 EUR</p>
    <button>{t.cta}</button>
    <section>
      <h2>Real-Time Market Analysis</h2><h2>Agentic Intelligence</h2><h2>Risk-managed decisions</h2>
    </section>
    <section>
      <button onClick={async () => {
        const res = await fetch(`${api}/api/analyze`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ticker:'NVDA', trade_date:'2025-01-15'})});
        setResult(JSON.stringify(await res.json(), null, 2));
      }}>Run Demo</button>
      <pre>{result}</pre>
    </section>
  </main>;
}
