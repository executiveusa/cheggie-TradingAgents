# Hermes Database Schema & Operations

## Overview

The Hermes orchestrator uses Supabase (PostgreSQL) as the primary database with complete multi-tenant isolation, Row-Level Security (RLS), and audit trails for institutional compliance.

## Schema Structure

### Core Tables

#### 1. **tenants** - White-label customer accounts
```sql
- id (UUID, PK)
- name (TEXT UNIQUE) - Customer name
- slug (TEXT UNIQUE) - URL-friendly identifier
- owner_email (TEXT) - Primary contact
- branding (JSONB) - Custom colors, logos
- api_key (TEXT UNIQUE) - API authentication
- monthly_fee_cents (INTEGER) - Billing amount
- is_active (BOOLEAN) - Account status
```

**Master Tenant:** Aleksa Master (slug: aleksa-master) is auto-created as tenant `00000000-0000-0000-0000-000000000001`

---

#### 2. **users** - Traders within each tenant
```sql
- id (UUID, PK)
- tenant_id (UUID, FK → tenants)
- auth_id (TEXT) - Auth0/Supabase user ID
- email (TEXT)
- role (TEXT) - trader, analyst, admin
- is_aleksa (BOOLEAN) - Aleksa platform admin
- created_at, updated_at
```

---

#### 3. **trading_decisions** - Main analysis requests
```sql
- id (UUID, PK)
- tenant_id (UUID, FK)
- user_id (UUID, FK → users)
- ticker (TEXT) - Stock symbol
- query (TEXT) - User question/request
- decision_type (ENUM) - BUY, SELL, HOLD, ANALYZE
- confidence_score (FLOAT 0-1) - Hermes confidence
- convergence_score (FLOAT 0-1) - How much methods agree
- status (ENUM) - pending, analyzing, completed, failed
- metadata (JSONB) - Additional context
- completed_at (TIMESTAMP)
```

---

#### 4. **skill_results** - Individual skill execution (8 skills tracked)
```sql
- id (UUID, PK)
- trading_decision_id (UUID, FK)
- tenant_id (UUID, FK)
- skill_name (ENUM) - trading_agents, anthropic_comps, anthropic_dcf, 
                       anthropic_earnings, risk_check, kyc_check, 
                       gl_reconcile, ic_memo
- status (ENUM) - pending, running, completed, failed
- result (JSONB) - Skill output
- confidence (FLOAT) - Skill-specific confidence
- execution_time_ms (INTEGER)
- error_message (TEXT)
```

---

#### 5. **convergence_analysis** - Cross-skill comparison
```sql
- id (UUID, PK)
- trading_decision_id (UUID, FK)
- tenant_id (UUID, FK)
- trading_agents_decision (TEXT) - BUY/SELL/HOLD
- trading_agents_confidence (FLOAT)
- valuation_range_low (FLOAT) - From comps + DCF
- valuation_range_high (FLOAT)
- valuation_method (TEXT) - comps, dcf, earnings
- all_methods_agree (BOOLEAN)
- convergence_percentage (FLOAT) - 0-100%
- final_recommendation (TEXT)
- rationale (TEXT)
```

---

#### 6. **hermes_memory** - Learning system (audit-trailed)
```sql
- id (UUID, PK)
- tenant_id (UUID, FK)
- memory_type (ENUM) - trade_outcome, regime_detected, pattern_learned,
                        performance_metric, risk_event, audit_log
- ticker (TEXT)
- content (JSONB) - Memory data
- confidence (FLOAT) - Confidence in memory
- is_active (BOOLEAN)
- created_at, updated_at
```

**Example Memory:** Hermes detects "tech sector shows positive sentiment on earnings beats" after 5 trades

---

#### 7. **trade_outcomes** - Track actual P&L
```sql
- id (UUID, PK)
- trading_decision_id (UUID, FK)
- tenant_id (UUID, FK)
- execution_price (FLOAT)
- current_price (FLOAT)
- quantity (INTEGER)
- entry_date, exit_date (TIMESTAMP)
- pnl_dollars (FLOAT)
- pnl_percentage (FLOAT)
- status (ENUM) - open, closed, cancelled
```

**Used for:** Performance metrics, auto-improvement, P&L reporting

---

#### 8. **audit_trail** - Compliance logging
```sql
- id (UUID, PK)
- tenant_id (UUID, FK)
- user_id (UUID, FK)
- trading_decision_id (UUID, FK)
- action (TEXT) - 'created_decision', 'executed_trade', 'modified_risk'
- details (JSONB) - Full action context
- ip_address (TEXT)
- user_agent (TEXT)
- created_at (TIMESTAMP)
```

**Immutable & SEC/FCA compliant**

---

#### 9. **ic_memos** - Investment committee reports
```sql
- id (UUID, PK)
- trading_decision_id (UUID, FK)
- tenant_id (UUID, FK)
- title (TEXT)
- ticker (TEXT)
- recommendation (TEXT) - BUY/SELL/HOLD with rationale
- rationale (TEXT)
- valuation_analysis (JSONB) - Comps + DCF details
- risk_assessment (JSONB) - Risk factors
- compliance_check (JSONB) - KYC, GL reconcile results
- pdf_url (TEXT) - Generated PDF location
- generated_at (TIMESTAMP)
```

**Auto-generated** after convergence analysis completes

---

#### 10. **performance_metrics** - Daily aggregates
```sql
- id (UUID, PK)
- tenant_id (UUID, FK)
- metric_date (DATE UNIQUE per tenant)
- total_trades (INTEGER)
- winning_trades (INTEGER)
- losing_trades (INTEGER)
- average_confidence (FLOAT)
- average_convergence (FLOAT)
- total_pnl_dollars (FLOAT)
- total_pnl_percentage (FLOAT)
- win_rate (FLOAT)
```

**Updated nightly** to show Aleksa customer performance

---

## Indexes (Performance)

All foreign keys indexed for fast queries:
- `idx_trading_decisions_tenant` - Tenant-scoped queries
- `idx_trading_decisions_status` - Status filtering
- `idx_skill_results_decision` - Fetch all skills for a decision
- `idx_hermes_memory_ticker` - Memory recall by symbol
- `idx_audit_trail_created` - Compliance audit viewing
- `idx_performance_metrics_date` - Time-series dashboards

---

## Row Level Security (RLS)

All tables protected with RLS policies:

### Tenant-scoped Access
Users in tenant A cannot see data from tenant B:
```sql
SELECT * FROM trading_decisions 
WHERE tenant_id IN (SELECT tenant_id FROM users WHERE id = auth.uid())
```

### Write Permissions
Users can only modify their own tenant's data via API

---

## Triggers

### Auto-update `updated_at` timestamps
Every table has a trigger that updates the `updated_at` field on modification.

---

## Client Libraries

### Python Backend (`apps/backend/db/supabase_client.py`)
```python
from db.supabase_client import get_db

db = get_db()

# Create trading decision
decision_id = await db.create_trading_decision(
    tenant_id="aleksa-master",
    user_id="user123",
    ticker="NVDA",
    query="Should I buy NVDA?",
    decision_type="ANALYZE"
)

# Store results
await db.update_trading_decision(
    decision_id=decision_id,
    status="completed",
    confidence_score=0.78,
    convergence_score=0.85
)

# Get performance
metrics = await db.get_performance_metrics(tenant_id="aleksa-master", days=30)
```

### TypeScript/React Frontend (`apps/web/lib/supabase/client.ts`)
```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// Real-time subscription to decisions
supabase
  .from('trading_decisions')
  .on('*', payload => {
    console.log('Decision updated:', payload)
  })
  .subscribe()
```

---

## Migration & Setup

### 1. Run Migration
Migration automatically applied via Supabase MCP:
```bash
supabase apply_migration --name create_hermes_schema --project_id <PROJECT_ID>
```

### 2. Verify Schema
```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check Aleksa tenant created
SELECT * FROM tenants WHERE slug = 'aleksa-master';
```

### 3. Set Environment Variables
```bash
# .env.local or Vercel project settings
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJxxxxxxx
SUPABASE_ANON_KEY=eyJxxxxxxx
```

---

## Common Queries

### Get all decisions for Aleksa
```sql
SELECT * FROM trading_decisions 
WHERE tenant_id = '00000000-0000-0000-0000-000000000001'
ORDER BY created_at DESC
LIMIT 50;
```

### Calculate win rate
```sql
SELECT 
  COUNT(CASE WHEN pnl_dollars > 0 THEN 1 END)::float / COUNT(*) as win_rate
FROM trade_outcomes
WHERE tenant_id = $1 AND exit_date IS NOT NULL;
```

### Get latest memory for regime detection
```sql
SELECT * FROM hermes_memory 
WHERE tenant_id = $1 
  AND memory_type = 'regime_detected'
  AND is_active = TRUE
ORDER BY created_at DESC
LIMIT 5;
```

### Audit compliance log
```sql
SELECT * FROM audit_trail 
WHERE tenant_id = $1 
  AND created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;
```

---

## Data Retention & Compliance

- **Audit Trail:** Kept indefinitely for SEC/FCA compliance
- **Trade Outcomes:** Kept indefinitely for performance analysis
- **Skill Results:** Kept for 1 year (can be archived)
- **Memory:** Active entries kept, inactive after 90 days soft-deleted

---

## Monitoring & Alerts

Set Supabase alerts for:
- High error rate on skill execution
- RLS policy violations (attempted unauthorized access)
- Database query performance degradation
- Backup completion status

---

## Next Steps

1. ✅ Schema created & migrated
2. ✅ Python client library built
3. ✅ API routes updated with DB integration
4. ⏭️ Connect to TradingAgents API
5. ⏭️ Implement Anthropic financial skills
6. ⏭️ Launch first white-label customer
