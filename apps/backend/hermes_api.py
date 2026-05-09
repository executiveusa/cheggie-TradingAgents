"""
FastAPI routes for Hermes Orchestrator
Implements Superpowers skills with async parallel execution
"""

from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio
import json
from datetime import datetime

# Import Hermes system (created in hermes_orchestrator.py)
from hermes_orchestrator import (
    HermesOrchestratorSkills,
    HermesDecision,
    SkillResult,
    HermesMemorySystem,
    HermesConvergenceAnalyzer,
    HermesAuditTrail
)

# Import database client
from db.supabase_client import get_db

app = FastAPI(title="Hermes Orchestrator", version="1.0.0")

# Global state (production: use Redis + database)
active_hermes_instances: Dict[str, "HermesInstance"] = {}


class HermesInstance:
    """Per-tenant Hermes orchestrator instance"""
    
    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id
        self.memory = HermesMemorySystem(tenant_id)
        self.audit_trail = HermesAuditTrail(tenant_id)
        self.active_skills: Dict[str, SkillResult] = {}
        self.db = get_db()  # Database connection


# ============================================================================
# API MODELS
# ============================================================================

class AnalysisRequest(BaseModel):
    """User query for Hermes analysis"""
    query: str
    ticker: str
    lookback_days: int = 90
    user_id: Optional[str] = None
    approval_required: bool = False


class SkillExecutionRequest(BaseModel):
    """Manual skill execution (for testing/debugging)"""
    skill_id: str
    inputs: Dict[str, Any]
    timeout_ms: int = 60000


class MemoryQueryRequest(BaseModel):
    """Query Hermes memory for learned patterns"""
    query_type: str  # "regime_analysis", "pattern_search", "performance"
    market_regime: Optional[str] = None
    days_back: int = 30


# ============================================================================
# CORE ORCHESTRATION ENDPOINT
# ============================================================================

@app.post("/hermes/analyze")
async def hermes_analyze(req: AnalysisRequest, tenant_id: str = "default"):
    """
    Main Hermes orchestrator endpoint
    Calls all skills in parallel, synthesizes decision
    """
    
    # Get or create Hermes instance
    if tenant_id not in active_hermes_instances:
        active_hermes_instances[tenant_id] = HermesInstance(tenant_id)
    
    hermes = active_hermes_instances[tenant_id]
    
    try:
        # PHASE 1: Call skills in parallel
        skill_results = await _execute_skills_parallel(
            ticker=req.ticker,
            lookback_days=req.lookback_days,
            tenant_id=tenant_id
        )
        
        # PHASE 2: Analyze convergence
        convergence = HermesConvergenceAnalyzer.analyze_valuations(skill_results)
        
        # PHASE 3: Risk & compliance checks
        compliance_status = await _check_compliance(
            ticker=req.ticker,
            tenant_id=tenant_id
        )
        
        # PHASE 4: Synthesize decision
        decision = _synthesize_decision(
            query=req.query,
            ticker=req.ticker,
            skill_results=skill_results,
            convergence=convergence,
            compliance_status=compliance_status
        )
        
        # PHASE 5: Log to audit trail
        hermes.audit_trail.log_decision(
            decision=decision,
            user_id=req.user_id,
            approval_required=req.approval_required
        )
        
        # PHASE 6: Generate reporting (async)
        asyncio.create_task(_generate_reporting(decision, tenant_id))
        
        return JSONResponse({
            "success": True,
            "recommendation": decision.recommendation,
            "confidence": decision.confidence,
            "convergence_analysis": decision.convergence_analysis,
            "audit_log": decision.audit_log,
            "timestamp": decision.timestamp
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# SKILL EXECUTION FUNCTIONS
# ============================================================================

async def _execute_skills_parallel(ticker: str, lookback_days: int, tenant_id: str) -> Dict[str, SkillResult]:
    """Execute all analysis skills in parallel"""
    
    tasks = {
        HermesOrchestratorSkills.TRADING_ANALYSIS: _execute_trading_analysis(ticker, lookback_days),
        HermesOrchestratorSkills.VALUATION_COMPS: _execute_valuation_comps(ticker),
        HermesOrchestratorSkills.VALUATION_DCF: _execute_valuation_dcf(ticker),
        HermesOrchestratorSkills.RISK_ASSESSMENT: _execute_risk_assessment(ticker, tenant_id),
    }
    
    results = {}
    
    # Execute with timeout
    done, pending = await asyncio.wait(
        tasks.values(),
        timeout=300  # 5 minutes total
    )
    
    for skill_name, task in tasks.items():
        if task in done:
            results[skill_name] = task.result()
        else:
            results[skill_name] = SkillResult(
                skill_name=skill_name,
                status="pending",
                output={},
                execution_time_ms=0,
                error="Timeout"
            )
    
    return results


async def _execute_trading_analysis(ticker: str, lookback_days: int) -> SkillResult:
    """
    Call TradingAgents engine
    In production: Call FastAPI endpoint at localhost:8001/api/analyze
    """
    start = datetime.utcnow()
    
    try:
        # Mock implementation - in production calls TradingAgents service
        analysis = {
            "recommendation": "BUY",
            "confidence": 78,
            "fundamental_score": 75,
            "sentiment_score": 82,
            "technical_score": 70,
            "consensus": "BULLISH (4/4 analysts agree)"
        }
        
        execution_time = (datetime.utcnow() - start).total_seconds() * 1000
        
        return SkillResult(
            skill_name=HermesOrchestratorSkills.TRADING_ANALYSIS,
            status="success",
            output=analysis,
            execution_time_ms=execution_time
        )
    except Exception as e:
        return SkillResult(
            skill_name=HermesOrchestratorSkills.TRADING_ANALYSIS,
            status="failed",
            output={},
            execution_time_ms=0,
            error=str(e)
        )


async def _execute_valuation_comps(ticker: str) -> SkillResult:
    """Call Anthropic /comps skill"""
    start = datetime.utcnow()
    
    try:
        # Mock implementation - in production calls Claude with /comps skill
        valuations = {
            "comps": ["MSFT", "GOOGL", "META"],
            "valuation_low": 140,
            "valuation_high": 160,
            "valuation_midpoint": 150,
            "peer_multiples": {
                "ev_revenue": 8.5,
                "pe_ratio": 28
            }
        }
        
        execution_time = (datetime.utcnow() - start).total_seconds() * 1000
        
        return SkillResult(
            skill_name=HermesOrchestratorSkills.VALUATION_COMPS,
            status="success",
            output=valuations,
            execution_time_ms=execution_time
        )
    except Exception as e:
        return SkillResult(
            skill_name=HermesOrchestratorSkills.VALUATION_COMPS,
            status="failed",
            output={},
            execution_time_ms=0,
            error=str(e)
        )


async def _execute_valuation_dcf(ticker: str) -> SkillResult:
    """Call Anthropic /dcf skill"""
    start = datetime.utcnow()
    
    try:
        dcf_model = {
            "intrinsic_value": 155,
            "upside_downside": "+5.5%",
            "wacc": 0.085,
            "terminal_growth": 0.025
        }
        
        execution_time = (datetime.utcnow() - start).total_seconds() * 1000
        
        return SkillResult(
            skill_name=HermesOrchestratorSkills.VALUATION_DCF,
            status="success",
            output=dcf_model,
            execution_time_ms=execution_time
        )
    except Exception as e:
        return SkillResult(
            skill_name=HermesOrchestratorSkills.VALUATION_DCF,
            status="failed",
            output={},
            execution_time_ms=0,
            error=str(e)
        )


async def _execute_risk_assessment(ticker: str, tenant_id: str) -> SkillResult:
    """Risk and position limit checks"""
    start = datetime.utcnow()
    
    try:
        risk_status = {
            "var_95": 50000,
            "max_drawdown": "-18%",
            "leverage_ratio": 1.2,
            "approval_required": False
        }
        
        execution_time = (datetime.utcnow() - start).total_seconds() * 1000
        
        return SkillResult(
            skill_name=HermesOrchestratorSkills.RISK_ASSESSMENT,
            status="success",
            output=risk_status,
            execution_time_ms=execution_time
        )
    except Exception as e:
        return SkillResult(
            skill_name=HermesOrchestratorSkills.RISK_ASSESSMENT,
            status="failed",
            output={},
            execution_time_ms=0,
            error=str(e)
        )


async def _check_compliance(ticker: str, tenant_id: str) -> Dict[str, Any]:
    """Execute compliance checks (KYC, GL reconcile)"""
    return {
        "kyc_status": "CLEAR",
        "gl_reconciled": True,
        "approval_required": False
    }


def _synthesize_decision(query: str, ticker: str, skill_results: Dict,
                        convergence: Dict, compliance_status: Dict) -> HermesDecision:
    """Synthesize final decision from all skill outputs"""
    
    # Extract key metrics
    trading_result = skill_results.get(HermesOrchestratorSkills.TRADING_ANALYSIS)
    valuation_result = skill_results.get(HermesOrchestratorSkills.VALUATION_DCF)
    
    recommendation = trading_result.output.get("recommendation", "HOLD") if trading_result else "HOLD"
    confidence = min(trading_result.output.get("confidence", 0), convergence.get("convergence_score", 0)) if trading_result else 0
    
    audit_log = [
        f"Query: {query}",
        f"Skills executed: {len([sr for sr in skill_results.values() if sr.status == 'success'])} success",
        f"Convergence score: {convergence.get('convergence_score', 0)}%",
        f"Compliance: {compliance_status.get('kyc_status', 'UNKNOWN')}",
        f"Recommendation confidence: {confidence}%"
    ]
    
    return HermesDecision(
        query=query,
        skill_results=list(skill_results.values()),
        recommendation=recommendation,
        confidence=confidence,
        convergence_analysis=convergence,
        memory_update={
            "recommendation": recommendation,
            "ticker": ticker,
            "confidence": confidence,
            "skills_used": list(skill_results.keys())
        },
        audit_log=audit_log
    )


async def _generate_reporting(decision: HermesDecision, tenant_id: str):
    """Generate IC memo and reports asynchronously"""
    # In production: Generate PDF, send email, store in database
    pass


# ============================================================================
# MEMORY & LEARNING ENDPOINTS
# ============================================================================

@app.get("/hermes/memory/summary")
async def get_memory_summary(tenant_id: str = "default"):
    """Get learning summary for Hermes"""
    if tenant_id not in active_hermes_instances:
        raise HTTPException(status_code=404, detail="Tenant not found")
    
    hermes = active_hermes_instances[tenant_id]
    return JSONResponse(hermes.memory.get_learning_summary())


@app.post("/hermes/memory/store-outcome")
async def store_outcome(req: Dict[str, Any], tenant_id: str = "default"):
    """Store trade outcome for learning"""
    if tenant_id not in active_hermes_instances:
        active_hermes_instances[tenant_id] = HermesInstance(tenant_id)
    
    hermes = active_hermes_instances[tenant_id]
    hermes.memory.store_outcome(
        recommendation=req.get("recommendation"),
        actual_return=req.get("actual_return"),
        market_regime=req.get("market_regime"),
        skills_used=req.get("skills_used", [])
    )
    
    return JSONResponse({"status": "stored"})


@app.get("/hermes/audit-trail")
async def get_audit_trail(tenant_id: str = "default", days: int = 30):
    """Get compliance audit trail"""
    if tenant_id not in active_hermes_instances:
        raise HTTPException(status_code=404, detail="Tenant not found")
    
    hermes = active_hermes_instances[tenant_id]
    return JSONResponse(hermes.audit_trail.get_audit_trail(days))


# ============================================================================
# WEBSOCKET FOR REAL-TIME SKILL UPDATES
# ============================================================================

@app.websocket("/hermes/ws/{tenant_id}")
async def websocket_hermes_updates(websocket: WebSocket, tenant_id: str):
    """WebSocket for real-time skill execution updates"""
    await websocket.accept()
    
    try:
        while True:
            data = await websocket.receive_text()
            # In production: stream skill execution progress
            await websocket.send_json({
                "type": "skill_update",
                "skill": "valuation-dcf",
                "status": "executing",
                "progress": 65
            })
    except Exception as e:
        print(f"WebSocket error: {e}")


# ============================================================================
# HEALTH & DEBUG ENDPOINTS
# ============================================================================

@app.get("/health")
async def health_check():
    return JSONResponse({
        "status": "healthy",
        "active_tenants": len(active_hermes_instances),
        "timestamp": datetime.utcnow().isoformat()
    })


@app.get("/hermes/debug/skills")
async def debug_skills():
    """List all available Superpowers skills"""
    return JSONResponse({
        "trading_analysis": HermesOrchestratorSkills.TRADING_ANALYSIS,
        "valuations": [
            HermesOrchestratorSkills.VALUATION_COMPS,
            HermesOrchestratorSkills.VALUATION_DCF,
            HermesOrchestratorSkills.VALUATION_LBO
        ],
        "compliance": [
            HermesOrchestratorSkills.COMPLIANCE_KYC,
            HermesOrchestratorSkills.COMPLIANCE_GL
        ],
        "reporting": [
            HermesOrchestratorSkills.IC_MEMO,
            HermesOrchestratorSkills.MORNING_NOTE
        ]
    })


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
