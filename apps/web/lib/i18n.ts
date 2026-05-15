export type Lang = 'sr' | 'en'

export const t = {
  nav: {
    analyze: { sr: 'Analiziraj', en: 'Analyze' },
    reports: { sr: 'Izveštaji', en: 'Reports' },
    watchlist: { sr: 'Praćenje', en: 'Watchlist' },
    models: { sr: 'Modeli', en: 'Models' },
    onboarding: { sr: 'Početak', en: 'Onboarding' },
    launchApp: { sr: 'Otvori aplikaciju', en: 'Launch App' },
    assistant: { sr: 'Asistent', en: 'Assistant' },
    skills: { sr: 'Veštine', en: 'Skills' },
    status: { sr: 'Status', en: 'Status' },
  },
  home: {
    eyebrow: { sr: 'AI trading desk za Balkan tržište', en: 'AI trading desk for Balkan markets' },
    hero: {
      sr: 'CheggieTrade pretvara tržišnu buku u jasan trading plan.',
      en: 'CheggieTrade turns market noise into a clear trading plan.',
    },
    heroSub: {
      sr: 'Više AI analitičara zajedno analizira tržište, proverava rizik i daje jasan izveštaj pre svake odluke.',
      en: 'Multiple AI analysts work together to analyse the market, check risk, and deliver a clear report before every decision.',
    },
    ctaPrimary: { sr: 'Pokreni analizu', en: 'Run Analysis' },
    ctaSecondary: { sr: 'Pogledaj demo', en: 'View Demo' },
    ctaTertiary: { sr: 'Vidi metod', en: 'See the Method' },
    statsLabel: { sr: 'Platforma u brojevima', en: 'Platform by numbers' },
    stats: [
      {
        stat: { sr: '6 agencija', en: '6 agents' },
        desc: { sr: 'Analitičar, istraživač, risk menadžer i drugi — svi rade zajedno', en: 'Analyst, researcher, risk manager and more — all working in concert' },
      },
      {
        stat: { sr: 'Brif u minutima', en: 'Brief in minutes' },
        desc: { sr: 'Od tikera do kompletnog tržišnog izveštaja za nekoliko minuta', en: 'From ticker to complete market report in minutes' },
      },
      {
        stat: { sr: 'Srpski & English', en: 'Serbian & English' },
        desc: { sr: 'Platforma podržava oba jezika bez restarta', en: 'Platform supports both languages without a restart' },
      },
    ],
    problemLabel: { sr: 'Zašto CheggieTrade', en: 'Why CheggieTrade' },
    problems: [
      {
        h: { sr: 'Tržište je preglasno za jednog tradera.', en: 'The market is too loud for one trader.' },
        b: { sr: 'Previše vesti, signala i mišljenja — malo stvarnog smisla. Trebate desk koji filtrira šum i stavlja rizik na prvo mesto.', en: 'Too many news, signals, and opinions — too little real meaning. You need a desk that filters noise and puts risk first.' },
      },
      {
        h: { sr: 'Nema istraživačkog tima iza vas.', en: 'There is no research team behind you.' },
        b: { sr: 'Institucije imaju analitičare, istraživače i risk menadžere. CheggieTrade vam daje isti kapacitet bez hiring budžeta.', en: 'Institutions have analysts, researchers, and risk managers. CheggieTrade gives you the same capacity without the hiring budget.' },
      },
      {
        h: { sr: 'Skriveni rizici uništavaju pozicije.', en: 'Hidden risks destroy positions.' },
        b: { sr: 'Koncentracijski rizik, loš tajming katalizatora, neadekvatna zaštita — platforma identifikuje ove probleme pre ulaska u poziciju.', en: 'Concentration risk, poor catalyst timing, inadequate hedging — the platform identifies these problems before you enter a position.' },
      },
    ],
    solutionLabel: { sr: 'Rešenje', en: 'The Solution' },
    solutionTitle: { sr: 'AI trading desk koji radi kao tim.', en: 'An AI trading desk that works like a team.' },
    solutionSub: { sr: 'Analitičar, istraživač, risk menadžer i usaglašenost — sve u jednom brifingu.', en: 'Analyst, researcher, risk manager, and compliance — all in one brief.' },
    steps: [
      {
        num: '01',
        title: { sr: 'Izaberi aktivu', en: 'Select the asset' },
        body: { sr: 'Unesite ticker ili naziv kompanije. Platforma prepoznaje akcije, ETF-ove i kripto.', en: 'Enter a ticker or company name. The platform recognises stocks, ETFs, and crypto.' },
      },
      {
        num: '02',
        title: { sr: 'Odaberi horizont i rizik', en: 'Set your horizon and risk' },
        body: { sr: 'Definiši vremenski okvir, veličinu pozicije i koji katalizator te zanima. Ovo oblikuje ceo brif.', en: 'Define the timeframe, position size, and which catalyst you care about. This shapes the whole brief.' },
      },
      {
        num: '03',
        title: { sr: 'Agenti analiziraju', en: 'Agents analyse' },
        body: { sr: 'Analitičar, istraživač i risk menadžer paralelno obrađuju vaš zahtev koristeći javne podatke i memoriju platforme.', en: 'Analyst, researcher, and risk manager process your request in parallel using public data and platform memory.' },
      },
      {
        num: '04',
        title: { sr: 'Debatuju bull vs bear', en: 'Bull vs bear debate' },
        body: { sr: 'Agenti iznose suprotstavljena mišljenja. Nema konsenzusa bez stvarne debate o riziku.', en: 'Agents present opposing views. No consensus without a real debate about risk.' },
      },
      {
        num: '05',
        title: { sr: 'Risk check', en: 'Risk check' },
        body: { sr: 'Risk menadžer proverava veličinu pozicije, koncentraciju i zaštitne puteve pre nego što brif bude finalizovan.', en: 'The risk manager checks position size, concentration, and hedge paths before the brief is finalised.' },
      },
      {
        num: '06',
        title: { sr: 'Dobijaš izveštaj', en: 'You receive the report' },
        body: { sr: 'Jasan brif: rizik, katalizator, put zaštite i preporuka. Evidencija čuva svaki zahtev.', en: 'A clear brief: risk, catalyst, hedge path, and recommendation. The audit trail stores every request.' },
      },
    ],
    useCasesLabel: { sr: 'Slučajevi upotrebe', en: 'Use Cases' },
    useCasesTitle: { sr: 'Ovaj proizvod rešava stvaran bol tradera, ne apstraktan AI teatar.', en: 'This product solves real trader pain, not abstract AI theater.' },
    useCases: [
      {
        h: { sr: 'Analiza akcija pre zarade', en: 'Stock analysis before earnings' },
        b: { sr: 'Unesite ticker pre objavljivanja rezultata. Platforma procenjuje da li je katalizator uračunat u cenu i predlaže zaštitu.', en: 'Enter the ticker before results day. The platform assesses whether the catalyst is priced in and suggests a hedge.' },
      },
      {
        h: { sr: 'Kripto pozicije na BTC/ETH', en: 'Crypto positions on BTC/ETH' },
        b: { sr: 'Proverite koncentraciju kriptoportfolija, korelaciju sa makro faktorima i optimalne izlazne tačke.', en: 'Check crypto portfolio concentration, correlation with macro factors, and optimal exit points.' },
      },
      {
        h: { sr: 'Telegram signali — provera pre akcije', en: 'Telegram signals — check before acting' },
        b: { sr: 'Zalepite signal iz Telegram grupe. Platforma ga analizira i daje nezavisno mišljenje o riziku.', en: 'Paste a signal from your Telegram group. The platform analyses it and gives an independent risk opinion.' },
      },
      {
        h: { sr: 'Upravljanje listom praćenja', en: 'Watchlist management' },
        b: { sr: 'Pratite više aktiva odjednom. Platforma pamti kontekst i upozorava na promene u riziku.', en: 'Track multiple assets at once. The platform remembers context and alerts on risk changes.' },
      },
      {
        h: { sr: 'Nedeljni pregled portfolija', en: 'Weekly portfolio review' },
        b: { sr: 'Jednom nedeljno zatražite sažetak svih pozicija. Identifikujte prekomerne koncentracije i zastarele teze.', en: 'Once a week, request a summary of all positions. Identify excessive concentrations and stale theses.' },
      },
      {
        h: { sr: 'Veličina pozicije pod ograničenjima', en: 'Position sizing under constraints' },
        b: { sr: 'Unesite kapital, stop udaljenost i tajming katalizatora. Platforma izračunava optimalnu veličinu pozicije.', en: 'Enter your capital, stop distance, and catalyst timing. The platform calculates the optimal position size.' },
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
