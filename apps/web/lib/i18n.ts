export type Lang = 'sr' | 'en'

export const t = {
  nav: {
    analyze: { sr: 'Analiziraj', en: 'Analyze' },
    reports: { sr: 'Izveštaji', en: 'Reports' },
    watchlist: { sr: 'Praćenje', en: 'Watchlist' },
    models: { sr: 'Modeli', en: 'Models' },
    onboarding: { sr: 'Početak', en: 'Onboarding' },
    launchApp: { sr: 'Otvori aplikaciju', en: 'Launch App' },
  },
  home: {
    eyebrow: { sr: 'CHEGGIE TRADE', en: 'CHEGGIE TRADE' },
    hero: {
      sr: 'Tržišna inteligencija za trgovce koji žele pravi odgovor.',
      en: 'Market intelligence for traders who want the real answer.',
    },
    heroSub: {
      sr: 'CheggieTrade analizira koncentraciju, likvidnost, katalizatorski rizik i puteve zaštite — pre nego što zvuči sigurno. Šest ruta modela, potpuna evidencija.',
      en: 'CheggieTrade weighs concentration, liquidity, catalyst risk, and hedge paths before it ever sounds certain. Six model routes, full audit trail.',
    },
    ctaPrimary: { sr: 'Pokreni analizu', en: 'Run Analysis' },
    ctaSecondary: { sr: 'Pogledaj demo', en: 'View Demo' },
    ctaTertiary: { sr: 'Vidi metod', en: 'See the Method' },
    statsLabel: { sr: 'Platforma u brojevima', en: 'Platform by numbers' },
    stats: [
      {
        stat: { sr: '6 ruta', en: '6 routes' },
        desc: { sr: 'xAI, Groq, OpenRouter, Gemini, gateway, backend', en: 'xAI, Groq, OpenRouter, Gemini, gateway, backend' },
      },
      {
        stat: { sr: '1 evidencija', en: '1 audit' },
        desc: { sr: 'Svaki odgovor prijavljuje rutu koja ga je proizvela', en: 'Every answer reports the route that produced it' },
      },
      {
        stat: { sr: 'Kompresija', en: 'Compression' },
        desc: { sr: 'Kontekst sesije se sažima pre slanja modelu', en: 'Session context is compressed before it hits the model' },
      },
    ],
    problemLabel: { sr: 'Problem', en: 'The Problem' },
    problems: [
      {
        h: { sr: 'Ne treba vam još jedan lažni prorok.', en: 'You do not need another fake oracle.' },
        b: { sr: 'Treba vam desk koji može da objasni koncentracijski rizik, poništi loše pozicioniranje i prizna kada je ruta modela degradirana.', en: 'You need a desk that can explain concentration risk, invalidate bad sizing, and admit when the model route is degraded.' },
      },
      {
        h: { sr: 'Većina alata prikazuje rezultat, ne razmišljanje.', en: 'Most retail tooling shows output, not reasoning.' },
        b: { sr: 'CheggieTrade pretvara odgovor u čitljiv tržišni brifing, tako da trader može da ospori tezu pre akcije.', en: 'CheggieTrade turns the answer into a readable market brief so the trader can challenge the thesis before acting.' },
      },
      {
        h: { sr: 'Tokenski troškovi treba da idu u prosudbu, ne šum.', en: 'Token spend should go into judgment, not noise.' },
        b: { sr: 'Hermes pakuje kontekst, skraćuje ponavljajuću memoriju i drži prompt uzak, tako da model posveti pažnju stvarnom setapu.', en: 'Hermes packs context, trims repeated memory, and keeps the prompt narrow so the model pays attention to the real setup.' },
      },
    ],
    solutionLabel: { sr: 'Rešenje', en: 'The Solution' },
    solutionTitle: { sr: 'Platforma koja priča priču u pravom redosledu.', en: 'A platform that tells the trade story in the right order.' },
    solutionSub: { sr: 'Bez lažne sigurnosti. Bez bučnog dashboard teatra. Samo tešnji tržišni brifing.', en: 'No fake certainty. No noisy dashboard theater. Just a tighter market brief.' },
    steps: [
      {
        num: '01',
        title: { sr: 'Okviriši tržišni problem', en: 'Frame the market problem' },
        body: { sr: 'Analiza počinje sa pozicijom, katalizatorom i negativnim stranom. Ne gubi vreme praveći se da je svaki prompt prazan list.', en: 'Analysis starts with the position, catalyst, and downside. It does not waste time pretending every prompt is a blank slate.' },
      },
      {
        num: '02',
        title: { sr: 'Rangiraj relevantni kontekst', en: 'Rank the context that matters' },
        body: { sr: 'Beleške portfolija, detalji liste praćenja, prethodna uputstva i memorija specifična za ticker se boduju pre svakog zahteva.', en: 'Portfolio notes, watchlist details, prior instructions, and ticker-specific memory are scored before each request.' },
      },
      {
        num: '03',
        title: { sr: 'Ruta kroz najzdraviju modelsku liniju', en: 'Route through the healthiest model lane' },
        body: { sr: 'Desk pokušava premium ili besplatne rute po redu, zatim upisuje tačan rezultat provajdera u evidenciju.', en: 'The desk tries premium or free routes in order, then writes the exact provider result into the audit trail.' },
      },
      {
        num: '04',
        title: { sr: 'Vrati brifing koji trader može da koristi', en: 'Return a brief a trader can use' },
        body: { sr: 'Odgovor treba da zvuči kao iskusan tržišni operator: rizik prvi, setap drugi, bez fantazija o izvršenim transakcijama.', en: 'The answer should sound like a sharp market operator: risk first, setup second, no fantasy about trades being executed.' },
      },
    ],
    useCasesLabel: { sr: 'Slučajevi upotrebe', en: 'Use Cases' },
    useCasesTitle: { sr: 'Ovaj proizvod rešava stvaran bol tradera, ne apstraktan AI teatar.', en: 'This product solves real trader pain, not abstract AI theater.' },
    useCases: [
      {
        h: { sr: 'Koncentracijski rizik pre zarade', en: 'Concentration risk before earnings' },
        b: { sr: 'Pitajte da li pozicija sa jednim imenom sada predstavlja rizik portfolija. Hermes proverava veličinu, preklapanje sektora i poznate datume katalizatora.', en: 'Ask whether a single-name position is now portfolio risk. Hermes checks size, sector overlap, and known catalyst dates.' },
      },
      {
        h: { sr: 'Veličina pozicije pod stvarnim ograničenjima', en: 'Position sizing under real constraints' },
        b: { sr: 'Prođite kapital, stop distancu i tajming katalizatora kroz jedan brifing umesto tri kartice i tabele.', en: 'Run capital, stop distance, and catalyst timing through one brief instead of three tabs and a spreadsheet.' },
      },
      {
        h: { sr: 'Trijaza liste praćenja u jednom prolazu', en: 'Watchlist triage in one pass' },
        b: { sr: 'Uporedite simbole po likvidnosti, kvalitetu katalizatora i riziku pre otvaranja tržišta.', en: 'Compare symbols on liquidity, catalyst quality, and risk before the market opens.' },
      },
    ],
    ctaBoxTitle: { sr: 'Pokrenite analizu i vidite kako radi stack ruta.', en: 'Run an analysis and watch the route stack work.' },
    ctaBoxSub: { sr: 'Besplatno za početak. Bez kreditne kartice.', en: 'Free to start. No credit card required.' },
    disclaimer: {
      sr: 'CheggieTrade je informativni alat, ne investicioni savetnik. Ništa na ovoj platformi ne predstavlja finansijski savet. Uvek konsultujte licenciranog finansijskog savetnika pre donošenja investicionih odluka.',
      en: 'CheggieTrade is an informational tool, not an investment advisor. Nothing on this platform constitutes financial advice. Always consult a licensed financial advisor before making investment decisions.',
    },
  },
  analyze: {
    eyebrow: { sr: 'ANALIZA', en: 'ANALYZE' },
    title: { sr: 'Tržišni Brifing', en: 'Market Brief' },
    ticker: { sr: 'Ticker', en: 'Ticker' },
    posSize: { sr: 'Veličina pozicije', en: 'Position size' },
    catalyst: { sr: 'Katalizator', en: 'Catalyst' },
    downside: { sr: 'Negativni faktori', en: 'Downside notes' },
    downsidePlaceholder: { sr: 'Ključni rizici, stop nivoi, poništavanje...', en: 'Key risks, stop levels, invalidation...' },
    runBrief: { sr: 'Pokreni analizu', en: 'Run Brief' },
    running: { sr: 'Analizujem...', en: 'Briefing...' },
    route: { sr: 'Ruta', en: 'Route' },
    audit: { sr: 'Evidencija', en: 'Audit' },
    riskRead: { sr: 'Procena rizika', en: 'Risk read' },
    catalystRead: { sr: 'Analiza katalizatora', en: 'Catalyst read' },
    hedgePath: { sr: 'Put zaštite', en: 'Hedge path' },
    followUp: { sr: 'Postavi pitanje o ovom brifingu...', en: 'Ask a follow-up about this brief...' },
    askBtn: { sr: 'Pitaj', en: 'Ask' },
    emptyState: { sr: 'Pokrenite analizu da biste počeli.', en: 'Run a brief to begin.' },
    loading: { sr: 'ČITA BRIFING...', en: 'READING THE BRIEF...' },
    catalystOptions: {
      earnings: { sr: 'Zarada', en: 'Earnings' },
      macro: { sr: 'Makro događaj', en: 'Macro event' },
      technical: { sr: 'Tehnički setap', en: 'Technical setup' },
      custom: { sr: 'Prilagođeno', en: 'Custom' },
    },
  },
  models: {
    eyebrow: { sr: 'MODELI', en: 'MODELS' },
    title: { sr: 'Kompatibilnost provajdera', en: 'Provider Compatibility' },
    sub: { sr: 'CheggieTrade podržava šest ruta modela. Svaka ruta može da se konfiguriše ili zameni.', en: 'CheggieTrade supports six model routes. Each route is configurable and swappable.' },
  },
  onboarding: {
    eyebrow: { sr: 'POČETAK', en: 'GETTING STARTED' },
    title: { sr: 'Dobrodošli u CheggieTrade', en: 'Welcome to CheggieTrade' },
    sub: { sr: 'Naučite kako da koristite platformu za donošenje boljih tržišnih odluka.', en: 'Learn how to use the platform to make better market decisions.' },
  },
  agents: {
    eyebrow: { sr: 'AGENTI', en: 'AGENTS' },
    title: { sr: 'Registar agenata', en: 'Agent Registry' },
    sub: { sr: 'Opis agenata i veština dostupnih u sistemu.', en: 'Description of agents and skills available in the system.' },
  },
  apiDocs: {
    eyebrow: { sr: 'API DOKUMENTACIJA', en: 'API DOCS' },
    title: { sr: 'REST API Reference', en: 'REST API Reference' },
    sub: { sr: 'Integriši CheggieTrade u svoju platformu.', en: 'Integrate CheggieTrade into your platform.' },
  },
  footer: {
    tagline: { sr: 'Tržišna inteligencija sa dovoljno priče da se veruje pozivu.', en: 'Market intelligence with enough story to trust the call.' },
    disclaimer: {
      sr: 'Samo informativne svrhe. Nije investicioni savet.',
      en: 'For informational purposes only. Not investment advice.',
    },
    links: {
      analyze: { sr: 'Analiziraj', en: 'Analyze' },
      models: { sr: 'Modeli', en: 'Models' },
      onboarding: { sr: 'Početak', en: 'Onboarding' },
      agents: { sr: 'Agenti', en: 'Agents' },
      apiDocs: { sr: 'API Docs', en: 'API Docs' },
    },
  },
} as const

export function tr<T extends { sr: string; en: string }>(entry: T, lang: Lang): string {
  return entry[lang]
}
