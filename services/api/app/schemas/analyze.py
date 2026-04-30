from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    ticker: str
    trade_date: str

class AnalyzeResponse(BaseModel):
    analysis_summary: str
    recommendation: str
    confidence: float
    raw_decision: str
