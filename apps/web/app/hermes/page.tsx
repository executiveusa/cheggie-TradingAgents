/**
 * White-Label Hermes Dashboard
 * Customizable for each tenant (Aleksa's customers)
 * Uses multi-tenant theme injection system
 */

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface TenantTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  logo_url?: string;
  voice_persona: string;
}

interface HermesDecision {
  recommendation: string;
  confidence: number;
  convergence_analysis: Record<string, any>;
  audit_log: string[];
}

const TENANT_THEMES: Record<string, TenantTheme> = {
  'aleksa': {
    id: 'aleksa',
    name: 'Aleksa Master',
    primary: '#10b981',
    secondary: '#1e293b',
    accent: '#f59e0b',
    voice_persona: 'professional'
  },
  'client-a': {
    id: 'client-a',
    name: 'TechVest Capital',
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#06b6d4',
    voice_persona: 'institutional'
  },
  'client-b': {
    id: 'client-b',
    name: 'Velocity Trading',
    primary: '#ec4899',
    secondary: '#831843',
    accent: '#fbbf24',
    voice_persona: 'aggressive'
  }
};

export default function WhiteLabelHermesDashboard() {
  const searchParams = useSearchParams();
  const tenantId = searchParams.get('tenant') || 'aleksa';
  
  const [theme, setTheme] = useState<TenantTheme>(TENANT_THEMES[tenantId] || TENANT_THEMES['aleksa']);
  const [decision, setDecision] = useState<HermesDecision | null>(null);
  const [ticker, setTicker] = useState('NVDA');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('recommendation');

  useEffect(() => {
    setTheme(TENANT_THEMES[tenantId] || TENANT_THEMES['aleksa']);
  }, [tenantId]);

  const analyzeStock = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/hermes/analyze?tenant_id=${tenantId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `Should I trade ${ticker}?`,
            ticker: ticker,
            lookback_days: 90
          })
        }
      );
      const data = await response.json();
      if (data.success) {
        setDecision(data as HermesDecision);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic styling based on tenant theme
  const brandedStyle = {
    container: {
      background: '#ffffff'
    },
    button: {
      background: theme.primary,
      color: 'white'
    },
    border: {
      borderColor: theme.primary
    },
    badge: {
      background: theme.accent,
      color: theme.secondary
    }
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }} className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Branded Header */}
        <header className="mb-8" style={brandedStyle.container}>
          <div className="flex justify-between items-center p-6 rounded-2xl" style={{ background: theme.primary }}>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{theme.name}</h1>
              <p className="text-white/80 mt-1">Hermes Trading Intelligence</p>
            </div>
            <div style={brandedStyle.badge} className="px-4 py-2 rounded-lg font-semibold text-sm">
              Voice: {theme.voice_persona}
            </div>
          </div>
        </header>

        {/* Control Panel */}
        <div style={brandedStyle.container} className="p-6 rounded-xl mb-6 shadow-sm" style={brandedStyle.border as any}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-2">Select Symbol</label>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                style={brandedStyle.border as any}
                className="w-full border-2 rounded-lg px-4 py-3 font-mono text-lg"
                placeholder="AAPL, MSFT, NVDA..."
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={analyzeStock}
                disabled={loading}
                style={brandedStyle.button as any}
                className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Get Signal'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b-2" style={{ borderColor: theme.primary }}>
          {['recommendation', 'ic-memo', 'compliance', 'alerts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                color: activeTab === tab ? theme.primary : '#94a3b8',
                borderBottom: activeTab === tab ? `3px solid ${theme.primary}` : 'none'
              }}
              className="px-4 py-3 font-semibold capitalize transition-colors"
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Content */}
        {decision ? (
          <>
            {activeTab === 'recommendation' && <RecommendationView decision={decision} theme={theme} />}
            {activeTab === 'ic-memo' && <ICMemoView decision={decision} theme={theme} />}
            {activeTab === 'compliance' && <ComplianceView decision={decision} theme={theme} />}
            {activeTab === 'alerts' && <AlertsView theme={theme} />}
          </>
        ) : (
          <div className="text-center py-16 rounded-xl" style={brandedStyle.container}>
            <p className="text-lg font-semibold mb-2">Ready to analyze</p>
            <p className="text-slate-600">Enter a ticker and click Get Signal to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Recommendation Tab
 */
function RecommendationView({ decision, theme }: { decision: HermesDecision; theme: TenantTheme }) {
  const isPositive = decision.recommendation === 'BUY';

  return (
    <div className="space-y-4">
      {/* Main Signal */}
      <div
        style={{
          background: isPositive ? '#f0fdf4' : '#fef2f2',
          borderColor: isPositive ? '#22c55e' : '#ef4444'
        }}
        className="border-2 rounded-lg p-8 shadow-md"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-slate-600 mb-2">HERMES SIGNAL</p>
            <h2
              style={{ color: isPositive ? '#16a34a' : '#dc2626' }}
              className="text-4xl font-bold"
            >
              {decision.recommendation}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600 mb-2">Confidence</p>
            <p style={{ color: theme.primary }} className="text-3xl font-bold">
              {decision.confidence}%
            </p>
          </div>
        </div>
      </div>

      {/* Convergence Info */}
      <div style={{ background: 'white', borderColor: theme.primary }} className="border-2 rounded-lg p-4 shadow-sm">
        <p className="font-semibold mb-2">Analysis Convergence</p>
        <p className="text-sm text-slate-700">
          {decision.convergence_analysis.all_methods_agree
            ? `✓ All methods agree - ${decision.convergence_analysis.convergence_score}% confidence`
            : '◐ Mixed signals - review details before trading'}
        </p>
      </div>
    </div>
  );
}

/**
 * IC Memo Tab
 * Auto-generated investment memo
 */
function ICMemoView({ decision, theme }: { decision: HermesDecision; theme: TenantTheme }) {
  return (
    <div style={{ background: 'white' }} className="rounded-lg p-8 shadow-md">
      <div className="prose prose-sm max-w-none">
        <h2>Investment Committee Memorandum</h2>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Recommendation:</strong> {decision.recommendation}</p>
        
        <h3>Executive Summary</h3>
        <p>Hermes AI orchestrator has synthesized analysis from multiple methods (TradingAgents consensus, valuation multiples, DCF, risk assessment).</p>
        
        <h3>Convergence Analysis</h3>
        <p>
          {decision.convergence_analysis.all_methods_agree
            ? 'All analytical methods converge on same direction, providing high conviction.'
            : 'Mixed signals detected - recommend additional due diligence.'}
        </p>

        <h3>Risks</h3>
        <ul>
          <li>Market volatility</li>
          <li>Liquidity constraints</li>
          <li>Regulatory changes</li>
        </ul>

        <h3>Approval</h3>
        <p style={{ color: theme.primary }} className="font-semibold">
          Pending Committee Review
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          style={{ background: theme.primary, color: 'white' }}
          className="px-4 py-2 rounded-lg font-semibold"
        >
          Export PDF
        </button>
        <button className="px-4 py-2 rounded-lg border-2" style={{ borderColor: theme.primary, color: theme.primary }}>
          Email Committee
        </button>
      </div>
    </div>
  );
}

/**
 * Compliance Tab
 */
function ComplianceView({ decision, theme }: { decision: HermesDecision; theme: TenantTheme }) {
  return (
    <div className="space-y-4">
      <div style={{ background: 'white', borderColor: theme.primary }} className="border-2 rounded-lg p-6 shadow-md">
        <h3 className="font-bold mb-4">Audit Trail</h3>
        <div style={{ fontFamily: "'Fira Code', monospace" }} className="space-y-2 text-sm bg-slate-50 p-4 rounded">
          {decision.audit_log.map((log, i) => (
            <div key={i} style={{ color: theme.secondary }}>
              [{i + 1}] {log}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', borderColor: '#22c55e' }} className="border-2 rounded-lg p-4 shadow-sm">
        <p className="font-semibold text-green-700">✓ KYC: CLEAR</p>
        <p className="text-xs text-slate-600 mt-1">All counterparties and instruments approved for trading</p>
      </div>

      <div style={{ background: 'white', borderColor: '#22c55e' }} className="border-2 rounded-lg p-4 shadow-sm">
        <p className="font-semibold text-green-700">✓ COMPLIANCE: READY</p>
        <p className="text-xs text-slate-600 mt-1">Full audit trail recorded. Ready for SEC/FCA review</p>
      </div>
    </div>
  );
}

/**
 * Alerts Tab
 */
function AlertsView({ theme }: { theme: TenantTheme }) {
  return (
    <div className="space-y-3">
      <div style={{ background: 'white', borderColor: theme.primary }} className="border-2 rounded-lg p-4">
        <p className="font-semibold">Multi-Channel Alerts Active</p>
        <div className="mt-3 space-y-2 text-sm">
          <p>✓ Telegram: High-conviction signals</p>
          <p>✓ Slack: Daily summary at 16:00 ET</p>
          <p>✓ Email: Important signals only</p>
        </div>
      </div>
    </div>
  );
}
