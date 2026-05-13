"""Private equity skills — /unit-economics, /ic-memo."""

from __future__ import annotations

from typing import Any

from .mock_data import get_ticker_info, get_income_statement
from .registry import register_skill


@register_skill("/unit-economics")
def unit_economics(ticker: str, **kwargs) -> dict[str, Any]:
    """Revenue per unit, margin trajectory, and unit profitability analysis."""
    info = get_ticker_info(ticker)
    income = get_income_statement(ticker)

    revenue = info.get("totalRevenue", 0) or 0
    employees = info.get("fullTimeEmployees") or None
    gross_margin = info.get("grossMargins", 0) or 0
    operating_margin = info.get("operatingMargins", 0) or 0
    revenue_growth = info.get("revenueGrowth", 0) or 0

    rev_per_employee = revenue / employees if employees and employees > 0 else None

    rows = income.get("rows", [])
    rev_history: list[float] = []
    gp_history: list[float] = []
    for row in rows:
        r = row.get("Total Revenue") or row.get("TotalRevenue")
        g = row.get("Gross Profit") or row.get("GrossProfit")
        if r is not None:
            rev_history.append(float(r))
        if g is not None:
            gp_history.append(float(g))

    return {
        "skill": "/unit-economics",
        "ticker": ticker.upper(),
        "revenue": revenue,
        "revenue_per_employee": round(rev_per_employee, 0) if rev_per_employee else None,
        "gross_margin_pct": round(gross_margin * 100, 1),
        "operating_margin_pct": round(operating_margin * 100, 1),
        "revenue_growth_pct": round(revenue_growth * 100, 1),
        "revenue_history": rev_history[:4],
        "gross_profit_history": gp_history[:4],
        "employees": employees,
        "data_source": "yfinance",
    }


@register_skill("/ic-memo")
def ic_memo(ticker: str, **kwargs) -> dict[str, Any]:
    """Investment committee memo — orchestrates comps + DCF + unit economics."""
    from .financial_analysis import comps_analysis, dcf_model
    from .equity_research import earnings_analysis

    comps = comps_analysis(ticker, **kwargs)
    dcf = dcf_model(ticker, **kwargs)
    earnings = earnings_analysis(ticker, **kwargs)
    unit_econ = unit_economics(ticker, **kwargs)
    info = get_ticker_info(ticker)

    return {
        "skill": "/ic-memo",
        "ticker": ticker.upper(),
        "company_name": info.get("longName", ticker),
        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "market_cap": info.get("marketCap"),
        "current_price": info.get("currentPrice") or info.get("regularMarketPrice"),
        "comps_summary": comps,
        "dcf_summary": dcf,
        "earnings_summary": earnings,
        "unit_economics_summary": unit_econ,
        "data_source": "yfinance",
        "note": "IC memo assembled from free yfinance data. Paid data connectors (PitchBook, FactSet) can be configured via env vars.",
    }
