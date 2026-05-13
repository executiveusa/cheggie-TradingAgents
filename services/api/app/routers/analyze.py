from fastapi import APIRouter, HTTPException

from app.core.trading import run_analysis
from app.schemas.analyze import AnalyzeRequest, HermesBriefResponse

router = APIRouter()


@router.post("/analyze", response_model=HermesBriefResponse)
def analyze(payload: AnalyzeRequest) -> dict:
    try:
        return run_analysis(
            ticker=payload.ticker,
            trade_date=payload.trade_date,
            route=payload.route,
            size=payload.size,
            catalyst=payload.catalyst,
            downside=payload.downside,
            skills=payload.skills,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"analysis_failed: {exc}") from exc
