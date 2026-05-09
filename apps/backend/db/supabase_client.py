"""
Supabase Client for Hermes Backend
Handles all database operations with connection pooling and error handling
"""

import os
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
import uuid
import asyncio

from supabase import create_client, Client
from supabase.lib.client_options import ClientOptions


class SupabaseClient:
    """Singleton Supabase client for backend operations"""
    
    _instance: Optional['SupabaseClient'] = None
    _client: Optional[Client] = None
    
    def __new__(cls) -> 'SupabaseClient':
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        """Initialize Supabase client with environment variables"""
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_KEY")
        
        if not url or not key:
            raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_KEY required")
        
        self._client = create_client(url, key)
    
    def client(self) -> Client:
        """Get the Supabase client"""
        return self._client
    
    # ========================================================================
    # TENANT OPERATIONS
    # ========================================================================
    
    async def get_tenant(self, tenant_id: str) -> Dict[str, Any]:
        """Retrieve tenant by ID"""
        try:
            response = self._client.table("tenants").select("*").eq("id", tenant_id).single().execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching tenant: {str(e)}")
    
    async def get_tenant_by_slug(self, slug: str) -> Dict[str, Any]:
        """Retrieve tenant by slug"""
        try:
            response = self._client.table("tenants").select("*").eq("slug", slug).single().execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching tenant: {str(e)}")
    
    async def create_tenant(self, name: str, slug: str, owner_email: str, monthly_fee_cents: int = 50000) -> Dict[str, Any]:
        """Create new tenant"""
        try:
            response = self._client.table("tenants").insert({
                "name": name,
                "slug": slug,
                "owner_email": owner_email,
                "monthly_fee_cents": monthly_fee_cents,
                "api_key": str(uuid.uuid4()),
                "is_active": True
            }).execute()
            return response.data[0]
        except Exception as e:
            raise Exception(f"Error creating tenant: {str(e)}")
    
    # ========================================================================
    # TRADING DECISION OPERATIONS
    # ========================================================================
    
    async def create_trading_decision(self, tenant_id: str, user_id: str, ticker: str, query: str, decision_type: str) -> str:
        """Create new trading decision record"""
        try:
            response = self._client.table("trading_decisions").insert({
                "tenant_id": tenant_id,
                "user_id": user_id,
                "ticker": ticker,
                "query": query,
                "decision_type": decision_type,
                "status": "pending"
            }).execute()
            return response.data[0]["id"]
        except Exception as e:
            raise Exception(f"Error creating trading decision: {str(e)}")
    
    async def update_trading_decision(self, decision_id: str, status: str, confidence_score: float = None, convergence_score: float = None, metadata: Dict = None):
        """Update trading decision status and scores"""
        try:
            update_data = {"status": status}
            if confidence_score is not None:
                update_data["confidence_score"] = confidence_score
            if convergence_score is not None:
                update_data["convergence_score"] = convergence_score
            if metadata:
                update_data["metadata"] = metadata
            if status == "completed":
                update_data["completed_at"] = datetime.utcnow().isoformat()
            
            self._client.table("trading_decisions").update(update_data).eq("id", decision_id).execute()
        except Exception as e:
            raise Exception(f"Error updating trading decision: {str(e)}")
    
    async def get_trading_decision(self, decision_id: str) -> Dict[str, Any]:
        """Get trading decision with all related data"""
        try:
            response = self._client.table("trading_decisions").select("*").eq("id", decision_id).single().execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching trading decision: {str(e)}")
    
    # ========================================================================
    # SKILL RESULT OPERATIONS
    # ========================================================================
    
    async def create_skill_result(self, trading_decision_id: str, tenant_id: str, skill_name: str) -> str:
        """Create skill result record"""
        try:
            response = self._client.table("skill_results").insert({
                "trading_decision_id": trading_decision_id,
                "tenant_id": tenant_id,
                "skill_name": skill_name,
                "status": "pending"
            }).execute()
            return response.data[0]["id"]
        except Exception as e:
            raise Exception(f"Error creating skill result: {str(e)}")
    
    async def update_skill_result(self, skill_result_id: str, status: str, result: Dict = None, confidence: float = None, execution_time_ms: int = None, error_message: str = None):
        """Update skill result with execution data"""
        try:
            update_data = {"status": status}
            if result:
                update_data["result"] = result
            if confidence is not None:
                update_data["confidence"] = confidence
            if execution_time_ms:
                update_data["execution_time_ms"] = execution_time_ms
            if error_message:
                update_data["error_message"] = error_message
            
            self._client.table("skill_results").update(update_data).eq("id", skill_result_id).execute()
        except Exception as e:
            raise Exception(f"Error updating skill result: {str(e)}")
    
    async def get_skill_results(self, trading_decision_id: str) -> List[Dict[str, Any]]:
        """Get all skill results for a decision"""
        try:
            response = self._client.table("skill_results").select("*").eq("trading_decision_id", trading_decision_id).execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching skill results: {str(e)}")
    
    # ========================================================================
    # CONVERGENCE ANALYSIS OPERATIONS
    # ========================================================================
    
    async def create_convergence_analysis(self, trading_decision_id: str, tenant_id: str, analysis_data: Dict) -> str:
        """Create convergence analysis record"""
        try:
            insert_data = {
                "trading_decision_id": trading_decision_id,
                "tenant_id": tenant_id,
                **analysis_data
            }
            response = self._client.table("convergence_analysis").insert(insert_data).execute()
            return response.data[0]["id"]
        except Exception as e:
            raise Exception(f"Error creating convergence analysis: {str(e)}")
    
    # ========================================================================
    # HERMES MEMORY OPERATIONS
    # ========================================================================
    
    async def store_memory(self, tenant_id: str, memory_type: str, content: Dict, ticker: str = None, confidence: float = 0.5) -> str:
        """Store memory for learning"""
        try:
            response = self._client.table("hermes_memory").insert({
                "tenant_id": tenant_id,
                "memory_type": memory_type,
                "content": content,
                "ticker": ticker,
                "confidence": confidence,
                "is_active": True
            }).execute()
            return response.data[0]["id"]
        except Exception as e:
            raise Exception(f"Error storing memory: {str(e)}")
    
    async def get_recent_memory(self, tenant_id: str, memory_type: str = None, days: int = 30, limit: int = 50) -> List[Dict[str, Any]]:
        """Get recent memory entries"""
        try:
            cutoff_date = (datetime.utcnow() - timedelta(days=days)).isoformat()
            query = self._client.table("hermes_memory").select("*").eq("tenant_id", tenant_id).gte("created_at", cutoff_date).order("created_at", desc=True).limit(limit)
            
            if memory_type:
                query = query.eq("memory_type", memory_type)
            
            response = query.execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching memory: {str(e)}")
    
    # ========================================================================
    # TRADE OUTCOME OPERATIONS
    # ========================================================================
    
    async def record_trade_outcome(self, trading_decision_id: str, tenant_id: str, outcome_data: Dict) -> str:
        """Record actual trade outcome"""
        try:
            insert_data = {
                "trading_decision_id": trading_decision_id,
                "tenant_id": tenant_id,
                **outcome_data
            }
            response = self._client.table("trade_outcomes").insert(insert_data).execute()
            return response.data[0]["id"]
        except Exception as e:
            raise Exception(f"Error recording trade outcome: {str(e)}")
    
    async def get_tenant_outcomes(self, tenant_id: str, limit: int = 100) -> List[Dict[str, Any]]:
        """Get recent trade outcomes for tenant"""
        try:
            response = self._client.table("trade_outcomes").select("*").eq("tenant_id", tenant_id).order("created_at", desc=True).limit(limit).execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching outcomes: {str(e)}")
    
    # ========================================================================
    # AUDIT TRAIL OPERATIONS
    # ========================================================================
    
    async def log_audit_event(self, tenant_id: str, action: str, details: Dict, user_id: str = None, trading_decision_id: str = None, ip_address: str = None, user_agent: str = None):
        """Log audit trail event for compliance"""
        try:
            self._client.table("audit_trail").insert({
                "tenant_id": tenant_id,
                "user_id": user_id,
                "trading_decision_id": trading_decision_id,
                "action": action,
                "details": details,
                "ip_address": ip_address,
                "user_agent": user_agent
            }).execute()
        except Exception as e:
            raise Exception(f"Error logging audit event: {str(e)}")
    
    # ========================================================================
    # IC MEMO OPERATIONS
    # ========================================================================
    
    async def create_ic_memo(self, trading_decision_id: str, tenant_id: str, memo_data: Dict) -> str:
        """Create investment committee memo"""
        try:
            insert_data = {
                "trading_decision_id": trading_decision_id,
                "tenant_id": tenant_id,
                **memo_data
            }
            response = self._client.table("ic_memos").insert(insert_data).execute()
            return response.data[0]["id"]
        except Exception as e:
            raise Exception(f"Error creating IC memo: {str(e)}")
    
    # ========================================================================
    # PERFORMANCE METRICS OPERATIONS
    # ========================================================================
    
    async def update_performance_metrics(self, tenant_id: str, metric_date: str, metrics_data: Dict):
        """Update or create performance metrics"""
        try:
            # Try to get existing record
            existing = self._client.table("performance_metrics").select("*").eq("tenant_id", tenant_id).eq("metric_date", metric_date).execute()
            
            if existing.data:
                # Update existing
                self._client.table("performance_metrics").update(metrics_data).eq("tenant_id", tenant_id).eq("metric_date", metric_date).execute()
            else:
                # Create new
                insert_data = {
                    "tenant_id": tenant_id,
                    "metric_date": metric_date,
                    **metrics_data
                }
                self._client.table("performance_metrics").insert(insert_data).execute()
        except Exception as e:
            raise Exception(f"Error updating metrics: {str(e)}")
    
    async def get_performance_metrics(self, tenant_id: str, days: int = 30) -> List[Dict[str, Any]]:
        """Get performance metrics for period"""
        try:
            cutoff_date = (datetime.utcnow() - timedelta(days=days)).strftime("%Y-%m-%d")
            response = self._client.table("performance_metrics").select("*").eq("tenant_id", tenant_id).gte("metric_date", cutoff_date).order("metric_date", desc=True).execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching metrics: {str(e)}")


# Singleton instance
_db = SupabaseClient()

def get_db() -> SupabaseClient:
    """Get Supabase client instance"""
    return _db
