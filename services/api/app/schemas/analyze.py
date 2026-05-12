from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    ticker: str
    trade_date: str
    size: Optional[str] = None
    catalyst: Optional[str] = None
    downside: Optional[str] = None
    route: str = "auto"
    skills: list[str] = []


class HermesBriefResponse(BaseModel):
    """Response shape expected by the Hermes UI (apps/web/app/hermes/page.tsx)."""

    ticker: str
    risk: Literal["HIGH", "MEDIUM", "LOW"]
    catalyst: str
    hedge: str
    model_note: str
    tokens: int
    time_ms: int
    mode: str
    executive_summary: Optional[str] = None
    price_target: Optional[float] = None
    time_horizon: Optional[str] = None
    recommendation: Optional[str] = None
    skills_used: list[str] = []


# Keep the old response shape as an alias so existing code referencing it
# does not break while the migration is in progress.
AnalyzeResponse = HermesBriefResponse
