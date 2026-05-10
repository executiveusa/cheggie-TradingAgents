# Zeus Orchestrator + Superpowers Implementation Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│         Aleksa's Zeus Master Dashboard                   │
│    (/aleksa) - Private orchestration console               │
│  - Real-time skill execution monitoring                    │
│  - Convergence analysis (all methods agree?)                │
│  - Tenant management + revenue dashboard                   │
│  - Skills marketplace                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│         Zeus Orchestrator (FastAPI Backend)              │
│         /apps/backend/zeus_api.py                        │
│  - Core: POST /hermes/analyze (main endpoint)             │
│  - Calls Superpowers skills in PARALLEL                   │
│  - Synthesizes decisions via convergence analyzer         │
│  - Stores outcomes for learning                           │
│  - Returns IC memo + audit trail                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌───────────────┐  ┌────────────────┐  ┌──────────────────┐
│ TradingAgents │  │ Anthropic      │  │ Risk Manager     │
│ Skill         │  │ Financial      │  │ Skill            │
│ (3 min)       │  │ Skills         │  │ (30 sec)         │
│               │  │ (60 sec each)  │  │                  │
│ /trading-     │  │ - /comps       │  │ /risk-assessment │
│  analysis     │  │ - /dcf         │  │                  │
│               │  │ - /lbo         │  │                  │
└───────────────┘  └────────────────┘  └──────────────────┘
        ↓                   ↓                   ↓
        └───────────────────┼───────────────────┘
                            ↓
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌──────────────────┐ ┌─────────────────┐ ┌─────────────┐
│ KYC/Compliance   │ │ GL Reconcile    │ │ Memory      │
│ (/compliance-    │ │ (/compliance-   │ │ (/memory-   │
│  kyc)            │ │  gl-reconcile)  │ │  store)     │
└──────────────────┘ └─────────────────┘ └─────────────┘
        ↓                   ↓                   ↓
        └───────────────────┼───────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Multi-Tenant White-Label Dashboard                        │
│    (/hermes?tenant=client-a)                              │
│  - Branded UI per tenant                                   │
│  - IC memo generation                                      │
│  - Compliance audit trail                                  │
│  - Alert channels (Telegram, Slack, Discord, Email)      │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure (What We Built)

```
apps/backend/
├── zeus_orchestrator.py      ⭐ Core: Skill classes + memory + audit
├── zeus_api.py               ⭐ FastAPI routes + orchestration logic
├── ZEUS_SKILLS_MANIFEST.md   📋 Skills registry + contracts

apps/web/
├── app/aleksa/page.tsx         ⭐ Aleksa's private dashboard
├── app/hermes/page.tsx         ⭐ White-label tenant dashboard
├── lib/tenants.ts              (existing: multi-tenant config)
└── app/layout.tsx              (existing: root layout)
```

---

## Superpowers Integration (How We Use It)

### 1. RED-GREEN-REFACTOR Cycle (TDD)

Each skill follows Superpowers TDD pattern:

```python
# RED: Failing test
def test_hermes_decide_when_all_methods_agree():
    skill_results = {
        "trading-analysis": SkillResult(recommendation="BUY", confidence=78),
        "valuation-dcf": SkillResult(intrinsic_value=155),
        "valuation-comps": SkillResult(valuation_midpoint=150),
    }
    decision = _synthesize_decision(skill_results)
    
    # ASSERT: Should recommend BUY with 75%+ confidence
    assert decision.recommendation == "BUY"
    assert decision.confidence >= 75

# GREEN: Minimal implementation
def _synthesize_decision(skill_results):
    # Only BUY if all methods agree
    consensus = [sr.output.get("recommendation") for sr in skill_results.values() if "recommendation" in sr.output]
    if len(set(consensus)) == 1 and consensus[0] == "BUY":
        return HermesDecision(recommendation="BUY", confidence=80)
    return HermesDecision(recommendation="HOLD", confidence=50)

# REFACTOR: Extract patterns, improve confidence calculation
def _synthesize_decision(skill_results):
    convergence = HermesConvergenceAnalyzer.analyze_valuations(skill_results)
    confidence = _calculate_confidence_from_convergence(convergence)
    
    return HermesDecision(
        recommendation=_determine_recommendation(skill_results),
        confidence=confidence,
        convergence_analysis=convergence
    )
```

### 2. Parallel Skill Execution

```python
# Superpowers enforces: Execute skills in parallel, not sequentially
@app.post("/hermes/analyze")
async def hermes_analyze(req: AnalysisRequest):
    # This is a MANDATORY skill pattern:
    # - Call all valuation skills in parallel (not one by one)
    # - Allow max 5 min timeout before synthesizing
    # - If skill times out, still proceed (graceful degradation)
    
    task_results = await asyncio.gather(
        _execute_trading_analysis(req.ticker),     # 180s
        _execute_valuation_comps(req.ticker),      # 60s
        _execute_valuation_dcf(req.ticker),        # 60s
        _execute_risk_assessment(req.ticker),      # 30s
        return_exceptions=True
    )
```

### 3. Systematic Debugging (Superpowers Skill)

When Zeus recommendation is wrong:

```python
# Superpowers: systematic-debugging skill
# 4-phase root cause process:

# PHASE 1: What was the recommendation and why?
decision_id = "2026-05-09-nvda-buy"
decision = load_from_audit_trail(decision_id)
print("Recommendation:", decision.recommendation)
print("Convergence score:", decision.convergence_analysis["convergence_score"])

# PHASE 2: Which skill was wrong?
for skill_result in decision.skill_results:
    if skill_result.status == "failed":
        print(f"FAILED: {skill_result.skill_name}")

# PHASE 3: Defense-in-depth - Did we have fallback?
if convergence_score < 50:
    print("ALERT: Low convergence should have triggered 'HOLD' recommendation")

# PHASE 4: Condition-based-waiting - Monitor regime change
if market_regime_changed and accuracy < 60%:
    print("REGIME CHANGE DETECTED - Zeus should have adapted")
    hermes.memory.detect_regime_change(new_regime, triggered_by=["trading-analysis"])
```

### 4. Code Review Before Merging (Superpowers Skill)

```
requesting-code-review skill enforces:
✓ Does output match the skill contract? (spec compliance)
✓ Is convergence calculated correctly? (code quality)
✓ Does audit trail capture everything? (compliance)
✓ Is memory updated on success? (learning)

receiving-code-review skill:
- If review finds issues → Update code and re-test
- If review passes → Merge and auto-deploy
```

---

## Running Zeus (Local Development)

### Start Backend

```bash
cd apps/backend

# Install dependencies
pip install fastapi uvicorn pydantic

# Run Zeus FastAPI server
python zeus_api.py
# Server runs at http://localhost:8000
# API docs at http://localhost:8000/docs
```

### Start Frontend

```bash
cd apps/web

# Install dependencies
npm install

# Run Next.js dev server
npm run dev
# Open http://localhost:3000/aleksa (Aleksa dashboard)
# Open http://localhost:3000/zeus (white-label dashboard)
```

### Test Zeus Orchestrator

```bash
# Option 1: Direct API call
curl -X POST http://localhost:8000/hermes/analyze?tenant_id=aleksa \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Should I buy NVDA?",
    "ticker": "NVDA",
    "lookback_days": 90
  }'

# Option 2: Via Aleksa dashboard
# Go to http://localhost:3000/aleksa
# Enter NVDA, click Analyze
# Watch skills execute in real-time via WebSocket

# Option 3: Check audit trail (compliance)
curl http://localhost:8000/hermes/audit-trail?tenant_id=aleksa&days=30

# Option 4: Query learned patterns
curl http://localhost:8000/hermes/memory/summary?tenant_id=aleksa
```

---

## Revenue Model Integration

### Tier 1: Platform Licensing (Aleksa)
- **Cost:** $5k-50k/month per tenant
- **Included:** Zeus orchestrator + 5 white-label seats
- **Support:** Email support, quarterly reviews

### Tier 2: Premium Features
- **AI-Generated IC Memos:** +$2k/month
- **Multi-Channel Alerts (Telegram, Slack):** +$1k/month
- **Compliance Reporting Module:** +$3k/month

### Tier 3: Skills Marketplace
- Zeus discovers new trading patterns
- Pattern becomes a skill
- Aleksa earns 70% of licensing revenue
- Creator earns 30%

**Example:**
```json
{
  "skill": "sector-rotation-detector",
  "creator": "aleksa",
  "accuracy_on_backtests": 0.84,
  "current_subscriptions": 12,
  "monthly_revenue": "$3,600",
  "aleksa_share": "$2,520 (70%)",
  "creator_share": "$1,080 (30%)"
}
```

---

## Deployment Strategy

### Phase 1: MVP (This Week)
- [x] Zeus orchestrator built
- [x] Superpowers skills manifest created
- [ ] TradingAgents bridge tested
- [ ] Aleksa dashboard live
- [ ] First white-label tenant onboarded

### Phase 2: Hardening (Week 2)
- [ ] Database + persistence layer
- [ ] Multi-tenant isolation (RLS)
- [ ] Anthropic skills fully integrated
- [ ] IC memo PDF generation

### Phase 3: Go-To-Market (Week 3)
- [ ] Slack bot + Telegram bot integration
- [ ] Skills marketplace UI
- [ ] Revenue dashboard
- [ ] Customer onboarding playbook

### Phase 4: Scale (Week 4+)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Monitoring + observability (Sentry, PostHog)
- [ ] Auto-scaling (Vercel edge functions)
- [ ] Multi-region deployment

---

## Next Steps (Exact Commands)

```bash
# 1. Start backend orchestrator
cd /vercel/share/v0-project/apps/backend
python zeus_api.py &

# 2. Connect to TradingAgents service
# (Must be running separately on port 8001)
# Update NEXT_PUBLIC_API_URL in frontend .env

# 3. Start frontend
cd /vercel/share/v0-project/apps/web
npm run dev &

# 4. Test the full system
curl -X POST http://localhost:8000/hermes/analyze?tenant_id=aleksa \
  -H "Content-Type: application/json" \
  -d '{"query": "Test", "ticker": "NVDA", "lookback_days": 90}'

# 5. Open dashboards
# Aleksa: http://localhost:3000/aleksa
# White-label: http://localhost:3000/hermes?tenant=client-a
```

---

## Key Design Principles (Superpowers-Driven)

| Principle | Implementation |
|-----------|-----------------|
| **Test-Driven** | RED-GREEN-REFACTOR cycle for each skill |
| **Systematic** | No guessing; debug methodically |
| **Simple** | YAGNI (don't build features nobody needs) |
| **Verified** | Every claim backed by audit log |
| **Parallel** | Skills execute together, not sequentially |
| **Learnable** | Zeus stores outcomes → improves over time |
| **Compliant** | Full audit trail for SEC/FCA |
| **Scalable** | Per-tenant isolation for 1000s of clients |

