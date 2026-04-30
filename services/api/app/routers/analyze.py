from fastapi import APIRouter, HTTPException

from app.core.trading import run_analysis
from app.schemas.analyze import AnalyzeRequest, AnalyzeResponse

router = APIRouter()

@router.post('/analyze', response_model=AnalyzeResponse)
def analyze(payload: AnalyzeRequest):
    try:
        return run_analysis(payload.ticker, payload.trade_date)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"analysis_failed: {exc}") from exc
