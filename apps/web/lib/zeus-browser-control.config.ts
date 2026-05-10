export const ZEUS_BROWSER_CONFIG = {
  sandboxMode: true,
  readOnlyFinancialAPIs: true,
  allowedDataSources: [
    'finance.yahoo.com',
    'api.tradingview.com',
    'data.nasdaq.com',
    'api.polygon.io',
    'news.ycombinator.com',
    'seeking-alpha.com'
  ],
  chromeDevTools: {
    enabled: true,
    adminOnly: true,
    captureMetrics: ['latency', 'errorRate', 'tokenConsumption'],
    exportFormat: 'json'
  },
  playwright: {
    headless: true,
    timeout: 30000,
    maxRetries: 3
  },
  rateLimits: {
    requestsPerMinute: 60,
    browserSessionTimeout: 3600,
    concurrentBrowsers: 1
  }
} as const;
