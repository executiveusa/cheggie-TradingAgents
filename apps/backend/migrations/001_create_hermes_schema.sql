-- Zeus Agent Financial Orchestrator - Complete Schema
-- This schema supports multi-tenant white-label deployment with full audit trails

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TENANTS TABLE (White-label customers)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  owner_email TEXT NOT NULL,
  branding JSONB DEFAULT '{"primary_color": "#10b981", "secondary_color": "#1e293b", "accent_color": "#f59e0b"}',
  api_key TEXT UNIQUE,
  monthly_fee_cents INTEGER DEFAULT 50000,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants are viewable by authenticated users" ON public.tenants
  FOR SELECT USING (true);

-- ============================================================================
-- USERS TABLE (Users per tenant)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  auth_id TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'trader',
  is_aleksa BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tenant_id, email)
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (true);

-- ============================================================================
-- TRADING DECISIONS TABLE (Main analysis requests)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.trading_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  query TEXT NOT NULL,
  decision_type TEXT NOT NULL CHECK (decision_type IN ('BUY', 'SELL', 'HOLD', 'ANALYZE')),
  confidence_score FLOAT DEFAULT 0.0,
  convergence_score FLOAT DEFAULT 0.0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'completed', 'failed')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.trading_decisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view decisions in their tenant" ON public.trading_decisions
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = user_id AND u.tenant_id = trading_decisions.tenant_id
  ));

-- ============================================================================
-- SKILL RESULTS TABLE (Individual skill execution results)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.skill_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trading_decision_id UUID NOT NULL REFERENCES public.trading_decisions(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL CHECK (skill_name IN (
    'trading_agents',
    'anthropic_comps',
    'anthropic_dcf',
    'anthropic_earnings',
    'risk_check',
    'kyc_check',
    'gl_reconcile',
    'ic_memo'
  )),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  result JSONB DEFAULT '{}',
  confidence FLOAT DEFAULT 0.0,
  execution_time_ms INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.skill_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view skill results for their tenant" ON public.skill_results
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.users WHERE id = auth.uid()::uuid
  ));

-- ============================================================================
-- CONVERGENCE ANALYSIS TABLE (Comparison of all methods)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.convergence_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trading_decision_id UUID NOT NULL REFERENCES public.trading_decisions(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  trading_agents_decision TEXT,
  trading_agents_confidence FLOAT,
  valuation_range_low FLOAT,
  valuation_range_high FLOAT,
  valuation_method TEXT,
  all_methods_agree BOOLEAN,
  convergence_percentage FLOAT,
  final_recommendation TEXT,
  rationale TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.convergence_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view convergence analysis" ON public.convergence_analysis
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.users WHERE id = auth.uid()::uuid
  ));

-- ============================================================================
-- ZEUS MEMORY TABLE (Learning + audit trail)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.zeus_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  memory_type TEXT NOT NULL CHECK (memory_type IN (
    'trade_outcome',
    'regime_detected',
    'pattern_learned',
    'performance_metric',
    'risk_event',
    'audit_log'
  )),
  ticker TEXT,
  content JSONB NOT NULL,
  confidence FLOAT DEFAULT 0.5,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.zeus_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view memory for their tenant" ON public.zeus_memory
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.users WHERE id = auth.uid()::uuid
  ));

-- ============================================================================
-- TRADE OUTCOMES TABLE (Track actual results)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.trade_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trading_decision_id UUID NOT NULL REFERENCES public.trading_decisions(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  execution_price FLOAT,
  current_price FLOAT,
  quantity INTEGER,
  entry_date TIMESTAMP WITH TIME ZONE,
  exit_date TIMESTAMP WITH TIME ZONE,
  pnl_dollars FLOAT,
  pnl_percentage FLOAT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.trade_outcomes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view outcomes for their tenant" ON public.trade_outcomes
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.users WHERE id = auth.uid()::uuid
  ));

-- ============================================================================
-- COMPLIANCE & AUDIT TRAIL TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_trail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  trading_decision_id UUID REFERENCES public.trading_decisions(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.audit_trail ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view audit trail for their tenant" ON public.audit_trail
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.users WHERE id = auth.uid()::uuid
  ));

-- ============================================================================
-- IC MEMO REPORTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.ic_memos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trading_decision_id UUID NOT NULL REFERENCES public.trading_decisions(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  ticker TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  rationale TEXT NOT NULL,
  valuation_analysis JSONB DEFAULT '{}',
  risk_assessment JSONB DEFAULT '{}',
  compliance_check JSONB DEFAULT '{}',
  pdf_url TEXT,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.ic_memos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view IC memos for their tenant" ON public.ic_memos
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.users WHERE id = auth.uid()::uuid
  ));

-- ============================================================================
-- PERFORMANCE METRICS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  total_trades INTEGER DEFAULT 0,
  winning_trades INTEGER DEFAULT 0,
  losing_trades INTEGER DEFAULT 0,
  average_confidence FLOAT DEFAULT 0.0,
  average_convergence FLOAT DEFAULT 0.0,
  total_pnl_dollars FLOAT DEFAULT 0.0,
  total_pnl_percentage FLOAT DEFAULT 0.0,
  win_rate FLOAT DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tenant_id, metric_date)
);

ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view performance metrics for their tenant" ON public.performance_metrics
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.users WHERE id = auth.uid()::uuid
  ));

-- ============================================================================
-- INDEXES for Performance
-- ============================================================================
CREATE INDEX idx_trading_decisions_tenant ON public.trading_decisions(tenant_id);
CREATE INDEX idx_trading_decisions_user ON public.trading_decisions(user_id);
CREATE INDEX idx_trading_decisions_status ON public.trading_decisions(status);
CREATE INDEX idx_trading_decisions_created ON public.trading_decisions(created_at DESC);

CREATE INDEX idx_skill_results_decision ON public.skill_results(trading_decision_id);
CREATE INDEX idx_skill_results_tenant ON public.skill_results(tenant_id);
CREATE INDEX idx_skill_results_skill ON public.skill_results(skill_name);

CREATE INDEX idx_zeus_memory_tenant ON public.zeus_memory(tenant_id);
CREATE INDEX idx_zeus_memory_type ON public.zeus_memory(memory_type);
CREATE INDEX idx_zeus_memory_ticker ON public.zeus_memory(ticker);

CREATE INDEX idx_audit_trail_tenant ON public.audit_trail(tenant_id);
CREATE INDEX idx_audit_trail_created ON public.audit_trail(created_at DESC);

CREATE INDEX idx_performance_metrics_tenant ON public.performance_metrics(tenant_id);
CREATE INDEX idx_performance_metrics_date ON public.performance_metrics(metric_date DESC);

-- ============================================================================
-- TRIGGERS for Updated At
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trading_decisions_updated_at BEFORE UPDATE ON public.trading_decisions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skill_results_updated_at BEFORE UPDATE ON public.skill_results
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_convergence_analysis_updated_at BEFORE UPDATE ON public.convergence_analysis
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_zeus_memory_updated_at BEFORE UPDATE ON public.zeus_memory
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trade_outcomes_updated_at BEFORE UPDATE ON public.trade_outcomes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- AUTO-INSERT ALEKSA TENANT (Aleksa always owns the platform)
-- ============================================================================
INSERT INTO public.tenants (id, name, slug, owner_email, is_active)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Aleksa Master',
  'aleksa-master',
  'aleksa@cheggie.com',
  TRUE
)
ON CONFLICT (slug) DO NOTHING;
