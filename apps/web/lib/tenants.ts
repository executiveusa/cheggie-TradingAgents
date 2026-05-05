export type TenantTheme = { id: string; name: string; primary: string; background: string; text: string; defaultLang: 'sr'|'es'|'en'; voicePersona: 'coach'|'trader' };

export const tenantCatalog: TenantTheme[] = [
  { id: 'cheggie', name: 'Cheggie Srbija', primary: '#6366f1', background: '#0b1022', text: '#e2e8f0', defaultLang: 'sr', voicePersona: 'trader' },
  { id: 'madrid-alpha', name: 'Madrid Alpha', primary: '#f59e0b', background: '#121212', text: '#f8fafc', defaultLang: 'es', voicePersona: 'coach' },
  { id: 'nyc-pro', name: 'NYC Pro', primary: '#10b981', background: '#03120d', text: '#ecfeff', defaultLang: 'en', voicePersona: 'trader' }
];

export function getBrandTheme(tenantId: string): TenantTheme {
  return tenantCatalog.find((t) => t.id === tenantId) ?? tenantCatalog[0];
}
