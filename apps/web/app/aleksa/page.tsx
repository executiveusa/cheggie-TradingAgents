/**
 * Aleksa's Hermes Master Dashboard
 * Private orchestration console with Emerald Tablet design
 * Shows convergence of all analysis methods in real-time
 */

'use client';

import { useState, useEffect, useRef } from 'react';

// Emerald Tablet Design Tokens
const EMERALD_DESIGN = {
  colors: {
    primary: '#10b981',      // Emerald
    secondary: '#1e293b',    // Deep slate
    accent: '#f59e0b',       // Gold
    success: '#22c55e',      // Green
    warning: '#ef4444',      // Red
    neutral: '#f8fafc'       // Off-white
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Fira Code', monospace"
  }
};

interface SkillResult {
  skill_name: string;
  status: 'success' | 'pending' | 'failed';
  output: Record<string, any>;
  execution_time_ms: number;
  error?: string;
}

interface HermesDecision {
  recommendation: string;
  confidence: number;
  convergence_analysis: {
    convergence_score: number;
    valuations: Record<string, any>;
    all_methods_agree: boolean;
  };
  audit_log: string[];
  skill_results: SkillResult[];
}

export default function AleksaHermesDashboard() {
  const [selectedTicker, setSelectedTicker] = useState('NVDA');
  const [decision, setDecision] = useState<HermesDecision | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('convergence');
  const wsRef = useRef<WebSocket | null>(null);

  // Connect to WebSocket for real-time skill updates
  useEffect(() => {
    const tenantId = 'aleksa';
    wsRef.current = new WebSocket(`ws://localhost:8000/hermes/ws/${tenantId}`);
    
    wsRef.current.onmessage = (event) => {
      const update = JSON.parse(event.data);
      // Handle skill progress updates
      console.log('[Hermes WebSocket]', update);
    };

    return () => wsRef.current?.close();
  }, []);

  // Fetch analysis from Hermes
  const analyzeStock = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/hermes/analyze?tenant_id=aleksa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `Analyze ${selectedTicker} for trading signal`,
          ticker: selectedTicker,
          lookback_days: 90,
          user_id: 'aleksa'
        })
      });

      const data = await response.json();
      if (data.success) {
        setDecision(data as HermesDecision);
      }
    } catch (error) {
      console.error('[Hermes Error]', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: EMERALD_DESIGN.colors.neutral }} className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 style={{ color: EMERALD_DESIGN.colors.secondary, fontFamily: EMERALD_DESIGN.fonts.heading }} 
                  className="text-3xl font-bold">
                ⟐ Hermes Master Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Aleksa's Private Orchestration Console</p>
            </div>
            <div style={{ background: EMERALD_DESIGN.colors.primary }} className="rounded-lg px-4 py-2 text-white text-sm">
              Live • Connected to 4 Skill Engines
            </div>
          </div>
        </header>

        {/* Control Panel */}
        <section style={{ background: 'white', borderColor: EMERALD_DESIGN.colors.primary }} 
                 className="rounded-xl border-2 p-6 mb-6 shadow-md">
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold mb-2">Select Ticker</label>
              <input
                type="text"
                value={selectedTicker}
                onChange={(e) => setSelectedTicker(e.target.value.toUpperCase())}
                style={{ borderColor: EMERALD_DESIGN.colors.primary }}
                className="border-2 rounded-lg px-4 py-2 font-mono text-lg w-32"
                placeholder="NVDA"
              />
            </div>
            <button
              onClick={analyzeStock}
              disabled={loading}
              style={{ 
                background: EMERALD_DESIGN.colors.primary,
                opacity: loading ? 0.6 : 1
              }}
              className="text-white font-semibold px-6 py-2 rounded-lg disabled:cursor-not-allowed transition-opacity"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b-2" style={{ borderColor: EMERALD_DESIGN.colors.secondary }}>
          {['convergence', 'skills', 'memory', 'compliance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                color: activeTab === tab ? EMERALD_DESIGN.colors.primary : '#64748b',
                borderBottom: activeTab === tab ? `3px solid ${EMERALD_DESIGN.colors.primary}` : 'none'
              }}
              className="px-4 py-3 font-semibold capitalize transition-colors"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Panels */}
        {decision && (
          <>
            {/* TAB 1: CONVERGENCE ANALYSIS */}
            {activeTab === 'convergence' && <ConvergencePanel decision={decision} />}

            {/* TAB 2: SKILL RESULTS */}
            {activeTab === 'skills' && <SkillsPanel decision={decision} />}

            {/* TAB 3: LEARNING MEMORY */}
            {activeTab === 'memory' && <MemoryPanel />}

            {/* TAB 4: COMPLIANCE & AUDIT */}
            {activeTab === 'compliance' && <CompliancePanel decision={decision} />}
          </>
        )}

        {!decision && !loading && (
          <div className="text-center py-16">
            <p style={{ color: EMERALD_DESIGN.colors.secondary }} className="text-lg font-semibold mb-4">
              Select a ticker and click Analyze to begin orchestration
            </p>
            <p className="text-slate-500">Hermes will call all skills in parallel and synthesize a decision</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Panel 1: Convergence Analysis
 * Shows how all valuation methods agree or diverge
 */
function ConvergencePanel({ decision }: { decision: HermesDecision }) {
  const convergence = decision.convergence_analysis;

  return (
    <div className="space-y-6">
      {/* Main Recommendation Card */}
      <div 
        style={{
          background: decision.recommendation === 'BUY' ? '#dcfce7' : '#fee2e2',
          borderColor: decision.recommendation === 'BUY' ? '#22c55e' : '#ef4444'
        }}
        className="border-2 rounded-xl p-8 shadow-lg"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-600 mb-2">HERMES DECISION</p>
            <h2 style={{ color: decision.recommendation === 'BUY' ? '#16a34a' : '#dc2626' }} 
                className="text-4xl font-bold">
              {decision.recommendation}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600 mb-2">Confidence</p>
            <p className="text-3xl font-bold" style={{ color: '#f59e0b' }}>
              {decision.confidence}%
            </p>
          </div>
        </div>
        <div className="text-slate-700 font-semibold">
          All {Object.keys(convergence.valuations).length} valuation methods agree: {convergence.all_methods_agree ? '✓ YES' : '✗ NO'}
        </div>
      </div>

      {/* Convergence Gauge */}
      <div style={{ background: 'white', borderColor: '#e2e8f0' }} className="border-2 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-bold mb-4">Convergence Score</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div style={{ background: '#e2e8f0' }} className="h-8 rounded-full overflow-hidden">
              <div
                style={{ 
                  width: `${convergence.convergence_score}%`,
                  background: convergence.convergence_score > 75 ? '#22c55e' : 
                             convergence.convergence_score > 50 ? '#f59e0b' : '#ef4444'
                }}
                className="h-full transition-all duration-500"
              />
            </div>
          </div>
          <span className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
            {convergence.convergence_score.toFixed(0)}%
          </span>
        </div>
        <p className="text-sm text-slate-600 mt-3">
          {convergence.convergence_score > 75 ? '✓ Strong consensus across methods' :
           convergence.convergence_score > 50 ? '◐ Moderate agreement' :
           '✗ Methods diverge - caution advised'}
        </p>
      </div>

      {/* Valuation Methods Comparison */}
      <div style={{ background: 'white', borderColor: '#e2e8f0' }} className="border-2 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-bold mb-4">Valuation Methods</h3>
        <div className="space-y-3">
          {Object.entries(convergence.valuations).map(([method, data]: [string, any]) => (
            <div key={method} className="flex justify-between items-center p-3 rounded-lg" style={{ background: '#f1f5f9' }}>
              <span className="font-semibold capitalize">{method}</span>
              <span style={{ color: '#10b981' }} className="font-bold">
                ${data.midpoint || data.intrinsic_value || data.transaction_value || '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Panel 2: Individual Skill Results
 * Shows execution status and output from each skill
 */
function SkillsPanel({ decision }: { decision: HermesDecision }) {
  return (
    <div className="grid gap-4">
      {decision.skill_results.map((skill) => (
        <div 
          key={skill.skill_name}
          style={{
            background: 'white',
            borderColor: skill.status === 'success' ? '#22c55e' : 
                        skill.status === 'pending' ? '#f59e0b' : '#ef4444'
          }}
          className="border-2 rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-bold capitalize">{skill.skill_name.replace('-', ' ')}</h4>
              <p className="text-xs text-slate-500 mt-1">Execution: {skill.execution_time_ms.toFixed(0)}ms</p>
            </div>
            <span
              style={{
                background: skill.status === 'success' ? '#dcfce7' :
                           skill.status === 'pending' ? '#fef3c7' : '#fee2e2'
              }}
              className="px-3 py-1 rounded-full text-xs font-bold"
            >
              {skill.status.toUpperCase()}
            </span>
          </div>
          {skill.status === 'success' && (
            <pre style={{ fontFamily: EMERALD_DESIGN.fonts.mono }} className="text-xs bg-slate-100 p-3 rounded max-h-32 overflow-auto">
              {JSON.stringify(skill.output, null, 2)}
            </pre>
          )}
          {skill.error && (
            <p className="text-sm text-red-600 mt-2">Error: {skill.error}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Panel 3: Learning Memory
 * Shows what Hermes has learned over time
 */
function MemoryPanel() {
  const [memory, setMemory] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/hermes/memory/summary?tenant_id=aleksa')
      .then(r => r.json())
      .then(setMemory);
  }, []);

  if (!memory) return <div>Loading memory...</div>;

  return (
    <div className="space-y-4">
      <div style={{ background: 'white', borderColor: '#e2e8f0' }} className="border-2 rounded-lg p-4 shadow-md">
        <h3 className="font-bold mb-2">Learning Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-slate-600">Total Trades</p>
            <p className="text-2xl font-bold">{memory.total_trades}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Win Rate</p>
            <p className="text-2xl font-bold">{(memory.win_rate * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Avg Return</p>
            <p className="text-2xl font-bold">{(memory.avg_return * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', borderColor: '#e2e8f0' }} className="border-2 rounded-lg p-4 shadow-md">
        <h3 className="font-bold mb-3">Learned Patterns</h3>
        <div className="space-y-2">
          {Object.entries(memory.learned_patterns).map(([name, pattern]: [string, any]) => (
            <div key={name} className="p-2 rounded bg-slate-100">
              <span className="font-semibold text-sm">{name}</span>
              <span className="text-xs text-slate-600 ml-2">Accuracy: {(pattern.accuracy * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Panel 4: Compliance & Audit Trail
 * Full transparency on every decision
 */
function CompliancePanel({ decision }: { decision: HermesDecision }) {
  return (
    <div style={{ background: 'white', borderColor: '#e2e8f0' }} className="border-2 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-bold mb-4">Audit Trail</h3>
      <div style={{ fontFamily: EMERALD_DESIGN.fonts.mono }} className="space-y-2 text-sm">
        {decision.audit_log.map((log, i) => (
          <div key={i} className="p-2 rounded" style={{ background: '#f1f5f9' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
