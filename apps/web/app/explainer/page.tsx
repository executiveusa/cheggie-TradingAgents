'use client';

import { useState } from 'react';

type Lang = 'sr' | 'es' | 'en';

const copy = {
  sr: {
    title: 'Kako radi ChatGPT Trade?',
    intro:
      'ChatGPT Trade je vođeni AI trading asistent zasnovan na TradingAgents framework-u. Umesto jednog bota, simulira tim koji objašnjava zašto je signal dobar ili rizičan.',
    stepsTitle: 'Šta se dešava kada uneseš ticker?',
    steps: [
      'Agenti analiziraju fundamentalne podatke, sentiment, vesti i grafikon.',
      'Bullish i bearish istraživač ulaze u argumentovanu debatu.',
      'Trading agent predlaže ulaz, izlaz i veličinu pozicije.',
      'Risk menadžment proverava volatilnost i likvidnost pre finalne odluke.'
    ],
    whyTitle: 'Zašto je ovo korisno početnicima?',
    why: [
      'Jasna objašnjenja umesto komplikovanih dashboarda.',
      'Korak-po-korak proces koji možeš da preispitaš.',
      'Zdraviji pristup: kontrola rizika je deo svake preporuke.'
    ]
  },
  es: {
    title: '¿Cómo funciona ChatGPT Trade?',
    intro:
      'ChatGPT Trade es un asistente de trading con IA guiada, construido sobre TradingAgents. En lugar de un solo bot, simula un equipo que explica por qué una señal es buena o riesgosa.',
    stepsTitle: '¿Qué pasa cuando escribes un ticker?',
    steps: [
      'Los agentes analizan fundamentos, sentimiento, noticias y gráficos.',
      'Un investigador alcista y otro bajista debaten la oportunidad.',
      'El agente trader propone entrada, salida y tamaño de posición.',
      'Gestión de riesgo revisa volatilidad y liquidez antes de aprobar.'
    ],
    whyTitle: '¿Por qué ayuda a principiantes?',
    why: [
      'Explicaciones claras en lugar de paneles confusos.',
      'Proceso paso a paso que puedes revisar y cuestionar.',
      'Mentalidad más segura: el control de riesgo está en cada señal.'
    ]
  },
  en: {
    title: 'How does ChatGPT Trade work?',
    intro:
      'ChatGPT Trade is a guided AI trading assistant built on TradingAgents. Instead of a single bot opinion, it simulates a team that explains why a signal is strong or risky.',
    stepsTitle: 'What happens after you enter a ticker?',
    steps: [
      'Agents analyze fundamentals, sentiment, news, and charts.',
      'A bullish and bearish researcher debate the opportunity.',
      'A trader agent proposes entry, exit, and position sizing.',
      'Risk management checks volatility and liquidity before approval.'
    ],
    whyTitle: 'Why this helps beginners',
    why: [
      'Clear explanations instead of confusing dashboards.',
      'A step-by-step process you can review and challenge.',
      'Safer mindset: risk control is built into every signal.'
    ]
  }
} as const;

export default function ExplainerPage() {
  const [lang, setLang] = useState<Lang>('sr');
  const t = copy[lang];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-indigo-950">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold md:text-4xl">{t.title}</h1>
          <div className="inline-flex rounded-xl border border-white/10 bg-slate-800 p-1">
            {(['sr', 'es', 'en'] as Lang[]).map((key) => (
              <button
                key={key}
                onClick={() => setLang(key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium uppercase ${
                  lang === key ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-8 text-lg text-slate-300">{t.intro}</p>
        <h2 className="mb-2 text-2xl font-semibold">{t.stepsTitle}</h2>
        <ol className="mb-8 list-decimal space-y-2 pl-6 text-slate-300">
          {t.steps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>

        <h2 className="mb-2 text-2xl font-semibold">{t.whyTitle}</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-300">
          {t.why.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
