# Hermes Superpowers Skills Registry

This document defines all skills available to Hermes orchestrator following Superpowers framework.

## Skill Categories

### TIER 1: Core Financial Analysis (Parallel Execution)

#### /trading-analysis
**Calls:** TradingAgents Python engine
**Purpose:** Fundamental, sentiment, technical, and news analysis consensus
**Input:** `{ ticker, lookback_days, market_regime }`
**Output:** 
```json
{
  "recommendation": "BUY|SELL|HOLD",
  "confidence": 78,
  "fundamental_score": 75,
  "sentiment_score": 82,
  "technical_score": 70,
  "news_score": 81,
  "consensus": "BULLISH (4/4 analysts agree)",
  "key_risks": ["Fed policy", "competitive pressure"]
}
```

#### /valuation-comps
**Calls:** Anthropic Claude with /comps skill
**Purpose:** Find comparable companies, derive fair value range
**Input:** `{ ticker, industry, lookback_multiples }`
**Output:**
```json
{
  "comps": ["MSFT", "GOOGL", "META"],
  "valuation_low": 140,
  "valuation_high": 160,
  "valuation_midpoint": 150,
  "peer_multiples": {
    "ev_revenue": 8.5,
    "pe_ratio": 28,
    "price_book": 35
  }
}
```

#### /valuation-dcf
**Calls:** Anthropic Claude with /dcf skill
**Purpose:** Calculate intrinsic value from DCF model
**Input:** `{ ticker, historical_fcf, terminal_growth_rate }`
**Output:**
```json
{
  "intrinsic_value": 155,
  "upside_downside": "+5.5%",
  "wacc": 0.085,
  "terminal_growth": 0.025,
  "sensitivity_high": 175,
  "sensitivity_low": 135
}
```

#### /valuation-lbo
**Calls:** Anthropic Claude with /lbo skill
**Purpose:** Analyze leverage impact and LBO returns
**Input:** `{ ticker, target_leverage, holding_period }`
**Output:**
```json
{
  "transaction_value": 150,
  "leverage_ratio": 4.5,
  "moic": 2.8,
  "irr": 28,
  "debt_service_coverage": 1.6
}
```

---

### TIER 2: Risk & Compliance (Serial/Parallel Mix)

#### /risk-assessment
**Purpose:** Portfolio VAR, drawdown analysis, correlation monitoring
**Input:** `{ portfolio_positions, market_data, risk_limits }`
**Output:**
```json
{
  "var_95": 50000,
  "var_99": 75000,
  "max_drawdown_scenario": "-18%",
  "leverage_ratio": 1.2,
  "correlation_warnings": [],
  "position_limits_status": "OK",
  "approval_required": false
}
```

#### /compliance-kyc
**Purpose:** Know-your-customer screening for counterparties
**Input:** `{ entity_name, entity_type, country }`
**Output:**
```json
{
  "screening_status": "CLEAR",
  "risk_level": "LOW",
  "restrictions": [],
  "last_updated": "2026-05-09",
  "approval_required": false
}
```

#### /compliance-gl-reconcile
**Purpose:** Post-trade GL matching and break identification
**Input:** `{ trade_id, gl_entry_id, settlement_date }`
**Output:**
```json
{
  "reconciled": true,
  "status": "NO_BREAKS",
  "audit_timestamp": "2026-05-09T14:32:00Z",
  "settlement_confirmed": true
}
```

---

### TIER 3: Data Connectors (Async)

#### /fetch-market-data
**Purpose:** Real-time prices, intraday movements
**Calls:** Bloomberg, FactSet, or Yahoo Finance API
**Output:** `{ price, volume, day_range, 52w_range }`

#### /fetch-fundamentals
**Purpose:** Latest earnings, guidance, financial ratios
**Calls:** S&P Capital IQ or SEC EDGAR
**Output:** `{ eps, revenue, fcf, debt_to_equity, roe }`

#### /fetch-sentiment
**Purpose:** News sentiment, analyst ratings, social signals
**Calls:** Alternative data providers (Stocktwits, analyst consensus)
**Output:** `{ news_sentiment_score, analyst_rating, social_mentions }`

---

### TIER 4: Reporting (Serial, High-Quality Output)

#### /report-ic-memo
**Purpose:** Auto-generate Investment Committee memo
**Input:** `{ decision, convergence_analysis, risk_assessment }`
**Output:**
```markdown
# Investment Committee Memo

**Date:** 2026-05-09
**Recommendation:** BUY NVDA
**Confidence:** 78%

## Executive Summary
All valuation methods converge on fair value of $153-155...

## Analysis Convergence
- Trading Agents: BUY (78% confidence)
- Comps Analysis: $150-160 fair value
- DCF Model: $155 intrinsic value
- Risk Assessment: ACCEPTABLE

## Trade Rationale
[Full reasoning here]

## Risks
[Key risks listed]

## Approval
[Signature blocks]
```

#### /report-morning-note
**Purpose:** Daily market commentary with Hermes insights
**Output:** Markdown report suitable for investor distribution

#### /report-trade-log
**Purpose:** Execution audit trail (SEC-compliant)
**Output:** CSV with decision → execution → actual P&L

---

### TIER 5: Learning & Memory (Async)

#### /memory-store-outcome
**Purpose:** Log actual P&L vs Hermes prediction for learning
**Input:** `{ recommendation_id, ticker, predicted_return, actual_return, market_regime }`
**Triggers:** Automatic regime detection if accuracy <60%

#### /memory-retrieve
**Purpose:** Query Hermes memory for historical patterns
**Input:** `{ query_type, market_regime, time_period }`
**Output:** Similar past decisions, success rates, learned patterns

---

## Execution Flow (Superpowers Orchestration)

```
User Query → Hermes Agent
    ↓
[PHASE 1: Parallel Analysis - 3 min timeout]
├─ /trading-analysis (180s)
├─ /valuation-comps (60s)
├─ /valuation-dcf (60s)
└─ /valuation-lbo (45s)
    ↓
[PHASE 2: Convergence Analysis]
   Combine results, calculate confidence
    ↓
[PHASE 3: Risk & Compliance Check]
├─ /risk-assessment (30s)
├─ /compliance-kyc (45s)
└─ /compliance-gl-reconcile (30s)
    ↓
[PHASE 4: Final Decision Synthesis]
   Generate recommendation with reasoning
    ↓
[PHASE 5: Reporting & Memory]
├─ /report-ic-memo (async)
└─ /memory-store-outcome (async)
    ↓
User receives decision with full audit trail
```

---

## Superpowers TDD Integration

Each skill MUST have:
1. **Spec**: Clear input/output contract (above)
2. **Red test**: Failing test for desired behavior
3. **Green code**: Minimal implementation to pass
4. **Refactor**: Extract patterns, optimize
5. **Verify**: Confirm output matches contract

Example test:
```python
def test_trading_analysis_returns_valid_recommendation():
    result = skills["/trading-analysis"]({
        "ticker": "NVDA",
        "lookback_days": 90
    })
    assert result["recommendation"] in ["BUY", "SELL", "HOLD"]
    assert 0 <= result["confidence"] <= 100
```

---

## Revenue Model: Skills Marketplace

Skills can be registered as marketplace items:
```json
{
  "skill": "/custom-sentiment-model",
  "creator": "aleksa",
  "accuracy_on_backtests": 0.82,
  "monthly_subscriptions": 5,
  "monthly_revenue": 2500,
  "aleksa_revenue_share": "70%",
  "creator_revenue_share": "30%"
}
```

---

## Integration Checklist

- [x] Hermes orchestrator class defined
- [x] Skills manifest created
- [x] Memory system designed
- [x] Convergence analyzer ready
- [ ] FastAPI backend routes
- [ ] TradingAgents bridge
- [ ] Anthropic Claude integration
- [ ] Dashboard WebSocket updates
- [ ] Database schema for memory + audit
- [ ] Multi-tenant isolation
