'use client';

import { useMemo, useState } from 'react';

type Lang = 'sr'|'es'|'en';
type Persona = 'coach'|'trader';

const copy = {
  sr: { title: 'Glasovni AI asistent', placeholder: 'Pitaj za portfolio, rizik ili performanse…', send: 'Pošalji', speak: 'Govori', memory: 'Kontekst', audit: 'Audit / Obrazloženje' },
  es: { title: 'Asistente IA de voz', placeholder: 'Pregunta por cartera, riesgo o rendimiento…', send: 'Enviar', speak: 'Hablar', memory: 'Contexto', audit: 'Auditoría / Explicación' },
  en: { title: 'Voice AI assistant', placeholder: 'Ask about portfolio, risk, or performance…', send: 'Send', speak: 'Speak', memory: 'Context', audit: 'Audit / Explainability' }
} as const;

export default function AssistantPage() {
  const [lang, setLang] = useState<Lang>('sr');
  const [persona, setPersona] = useState<Persona>('trader');
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [memory, setMemory] = useState<string[]>(['Risk profile: medium', 'Watchlist: NVDA, MSFT']);
  const [audit, setAudit] = useState<string[]>([]);
  const t = useMemo(() => copy[lang], [lang]);

  const submit = async () => {
    const res = await fetch('/api/assistant', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ query, lang, persona, memory }) });
    const data = await res.json();
    setAnswer(data.answer ?? data.error ?? 'No response');
    setAudit(data.audit ?? []);
  };

  return <main className="min-h-screen bg-slate-950 p-5 text-slate-100"><div className="mx-auto max-w-4xl rounded-2xl border border-white/20 p-5">
    <h1 className="text-2xl font-bold">{t.title}</h1>
    <div className="mt-3 flex flex-wrap gap-2">{(['sr','es','en'] as Lang[]).map(k=><button key={k} onClick={()=>setLang(k)} className="rounded bg-indigo-500 px-3 py-1 uppercase">{k}</button>)}</div>
    <div className="mt-3 flex gap-2"><select value={persona} onChange={(e)=>setPersona(e.target.value as Persona)} className="rounded bg-slate-800 p-2"><option value="trader">Trader mode</option><option value="coach">Coach mode</option></select>
    <button onClick={()=>setMemory((m)=>[...m, 'Session note: prefers tight stops'])} className="rounded bg-slate-700 px-3">+ Memory</button></div>
    <textarea value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={t.placeholder} className="mt-3 h-24 w-full rounded bg-slate-800 p-3"/>
    <button onClick={submit} className="mt-2 rounded bg-emerald-500 px-4 py-2 text-black">{t.send}</button>

    <h2 className="mt-5 font-semibold">{t.memory}</h2><ul className="list-disc pl-6 text-sm">{memory.map((m)=><li key={m}>{m}</li>)}</ul>
    <h2 className="mt-5 font-semibold">{t.audit}</h2><ul className="list-disc pl-6 text-sm">{audit.map((a)=> <li key={a}>{a}</li>)}</ul>
    <pre className="mt-3 rounded bg-black/40 p-3 text-sm">{answer}</pre>
  </div></main>;
}
