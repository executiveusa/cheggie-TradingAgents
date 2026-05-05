'use client';
import { useState } from 'react';
import { tenantCatalog } from '../../lib/tenants';

export default function AdminPage() {
  const [tenantId, setTenantId] = useState(tenantCatalog[0].id);
  const tenant = tenantCatalog.find((t) => t.id === tenantId)!;

  return <main className="min-h-screen bg-slate-950 p-6 text-slate-100"><div className="mx-auto max-w-3xl rounded-2xl border border-white/20 p-6">
    <h1 className="text-2xl font-bold">White-label Control Plane</h1>
    <select value={tenantId} onChange={(e)=>setTenantId(e.target.value)} className="mt-3 rounded bg-slate-800 p-2">{tenantCatalog.map((t)=><option key={t.id} value={t.id}>{t.name}</option>)}</select>
    <div className="mt-4 grid gap-2 text-sm">
      <p>Default language: {tenant.defaultLang}</p>
      <p>Voice persona: {tenant.voicePersona}</p>
      <p>Primary color: {tenant.primary}</p>
      <p>Background: {tenant.background}</p>
    </div>
  </div></main>;
}
