'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getBrandTheme, tenantCatalog } from '../lib/tenants';

type Lang = 'sr' | 'es' | 'en';

const copy = {
  sr: {
    badge: 'Za mlade tradere',
    title: 'ChatGPT Trade Control Plane',
    subtitle: 'White-label AI platforma za trgovanje: brendiranje, glas, audit i bezbedni DB upiti.',
    cta: 'Otvori asistenta',
    explainer: 'Kako radi',
    admin: 'Tenant kontrolni panel',
    themes: 'Teme po tenantu',
    metrics: ['Brendiranje bez koda', 'Audit trag svake preporuke', 'Glasovni AI sa personama']
  },
  es: {
    badge: 'Para traders jóvenes',
    title: 'ChatGPT Trade Control Plane',
    subtitle: 'Plataforma IA white-label: marca, voz, auditoría y consultas DB seguras.',
    cta: 'Abrir asistente',
    explainer: 'Cómo funciona',
    admin: 'Panel tenant',
    themes: 'Temas por tenant',
    metrics: ['Branding sin código', 'Traza de auditoría por señal', 'IA de voz con personas']
  },
  en: {
    badge: 'Built for young traders',
    title: 'ChatGPT Trade Control Plane',
    subtitle: 'White-label AI trading platform with branding, voice, audit trails, and safe DB querying.',
    cta: 'Open assistant',
    explainer: 'How it works',
    admin: 'Tenant console',
    themes: 'Tenant themes',
    metrics: ['No-code branding', 'Audit trail on every signal', 'Voice AI with personas']
  }
} as const;

export default function Page() {
  const [lang, setLang] = useState<Lang>('sr');
  const [tenantId, setTenantId] = useState('cheggie');
  const t = useMemo(() => copy[lang], [lang]);
  const theme = getBrandTheme(tenantId);

  return (
    <main style={{ background: theme.background, color: theme.text }} className="min-h-screen p-6 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/20 p-4">
          <h1 className="text-xl font-bold tracking-wide">{t.title}</h1>
          <div className="flex gap-2">
            {(['sr', 'es', 'en'] as Lang[]).map((key) => (
              <button key={key} onClick={() => setLang(key)} className="rounded-lg px-4 py-2 text-sm font-semibold uppercase" style={{ background: lang === key ? theme.primary : 'transparent' }}>{key}</button>
            ))}
          </div>
        </header>

        <section className="rounded-3xl border border-white/20 p-8">
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: theme.primary }}>{t.badge}</span>
          <p className="mt-3 text-lg opacity-90">{t.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-xl px-5 py-3 font-semibold" style={{ background: theme.primary }} href="/assistant">{t.cta}</Link>
            <Link className="rounded-xl border border-white/20 px-5 py-3 font-semibold" href="/explainer">{t.explainer}</Link>
            <Link className="rounded-xl border border-white/20 px-5 py-3 font-semibold" href="/admin">{t.admin}</Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {t.metrics.map((m) => <article key={m} className="rounded-2xl border border-white/20 p-5">{m}</article>)}
        </section>

        <section className="rounded-3xl border border-white/20 p-6">
          <h2 className="mb-2 text-xl font-semibold">{t.themes}</h2>
          <select value={tenantId} onChange={(e) => setTenantId(e.target.value)} className="rounded border border-white/30 bg-transparent p-2">
            {tenantCatalog.map((tenant) => <option key={tenant.id} value={tenant.id} className="text-black">{tenant.name}</option>)}
          </select>
        </section>
      </div>
    </main>
  );
}
