"""Financial analysis skills — /comps, /dcf, /lbo.

Implements the financial-services repo skill categories using yfinance data.
All outputs include data_source annotation so users know the data tier.
"""

from __future__ import annotations

from typing import Any

import yfinance as yf

from .mock_data import get_ticker_info, get_cashflow, get_sector_peers
from .registry import register_skill


@register_skill("/comps")
def comps_analysis(ticker: str, peers: list[str] | None = None, **kwargs) -> dict[str, Any]:
    """Comparable company analysis — P/E, EV/Revenue, P/B for ticker and peers."""
    symbols = [ticker.upper()] + (peers or get_sector_peers(ticker))

    rows = []
    for sym in symbols:
        try:
            info = yf.Ticker(sym).info or {}
            rows.append({
                "ticker": sym,
                "name": info.get("longName", sym),
                "pe_ratio": info.get("trailingPE"),
                "forward_pe": info.get("forwardPE"),
                "ev_revenue": info.get("enterpriseToRevenue"),
                "ev_ebitda": info.get("enterpriseToEbitda"),
                "pb_ratio": info.get("priceToBook"),
                "market_cap": info.get("marketCap"),
                "revenue_growth": info.get("revenueGrowth"),
                "gross_margins": info.get("grossMargins"),
            })
        except Exception:
            rows.append({"ticker": sym, "error": "data_unavailable"})

    return {
        "skill": "/comps",
        "ticker": ticker.upper(),
        "peers": symbols[1:],
        "table": rows,
        "data_source": "yfinance",
        "note": "Comparable data via yfinance. For paid connectors (FactSet, S&P Global) set data_source env vars.",
    }


@register_skill("/dcf")
def dcf_model(
    ticker: str,
    wacc: float = 0.10,
    terminal_growth: float = 0.025,
    projection_years: int = 10,
    **kwargs,
) -> dict[str, Any]:
    """DCF valuation using yfinance free cashflow data."""
    # Validate assumptions to prevent divide-by-zero
    if wacc <= terminal_growth:
        return {
            "skill": "/dcf",
            "ticker": ticker.upper(),
            "error": "wacc_not_greater_than_terminal_growth",
            "data_source": "yfinance",
        }
    if projection_years <= 0:
        return {
            "skill": "/dcf",
            "ticker": ticker.upper(),
            "error": "projection_years_must_be_positive",
            "data_source": "yfinance",
        }

    cf_data = get_cashflow(ticker)
    info = get_ticker_info(ticker)

    shares = info.get("sharesOutstanding", 0) or 1
    current_price = info.get("currentPrice") or info.get("regularMarketPrice", 0)

    # Pull historical free cash flows (most recent 4 years)
    rows = cf_data.get("rows", [])
    fcf_values: list[float] = []
    for row in rows:
        fcf = row.get("Free Cash Flow") or row.get("FreeCashFlow")
        if fcf is not None:
            fcf_values.append(float(fcf))
    fcf_values = fcf_values[:4]

    if not fcf_values or fcf_values[0] <= 0:
        return {
            "skill": "/dcf",
            "ticker": ticker.upper(),
            "error": "insufficient_fcf_data",
            "data_source": "yfinance",
        }

    # 5-year average FCF growth rate (capped at 30%)
    if len(fcf_values) >= 2 and fcf_values[-1] != 0:
        growth_rate = min(0.30, (fcf_values[0] / fcf_values[-1]) ** (1 / max(len(fcf_values) - 1, 1)) - 1)
    else:
        growth_rate = 0.05

    base_fcf = fcf_values[0]
    projected_fcfs = [base_fcf * (1 + growth_rate) ** y for y in range(1, projection_years + 1)]
    discounted = [fcf / (1 + wacc) ** y for y, fcf in enumerate(projected_fcfs, 1)]
    terminal_value = projected_fcfs[-1] * (1 + terminal_growth) / (wacc - terminal_growth)
    terminal_pv = terminal_value / (1 + wacc) ** projection_years

    intrinsic_total = sum(discounted) + terminal_pv
    intrinsic_per_share = intrinsic_total / shares if shares else 0
    upside_pct = ((intrinsic_per_share - current_price) / current_price * 100) if current_price else None

    return {
        "skill": "/dcf",
        "ticker": ticker.upper(),
        "intrinsic_value_per_share": round(intrinsic_per_share, 2),
        "current_price": current_price,
        "upside_pct": round(upside_pct, 1) if upside_pct is not None else None,
        "assumptions": {
            "wacc": wacc,
            "terminal_growth": terminal_growth,
            "fcf_growth_rate": round(growth_rate, 4),
            "base_fcf": base_fcf,
            "projection_years": projection_years,
        },
        "data_source": "yfinance",
    }


@register_skill("/lbo")
def lbo_model(ticker: str, target_irr: float = 0.20, hold_years: int = 5, **kwargs) -> dict[str, Any]:
    """Simplified LBO model using yfinance balance sheet and EBITDA data."""
    # Validate hold_years to prevent divide-by-zero
    if hold_years <= 0:
        return {
            "skill": "/lbo",
            "ticker": ticker.upper(),
            "error": "hold_years_must_be_positive",
            "data_source": "yfinance",
        }

    info = get_ticker_info(ticker)

    ebitda = info.get("ebitda", 0) or 0
    total_debt = info.get("totalDebt", 0) or 0
    market_cap = info.get("marketCap", 0) or 0
    enterprise_value = market_cap + total_debt - (info.get("totalCash", 0) or 0)
    ev_ebitda = (enterprise_value / ebitda) if ebitda else None
    debt_to_ebitda = (total_debt / ebitda) if ebitda else None

    # Entry / exit assumption at same EV/EBITDA multiple
    entry_equity = market_cap
    projected_ebitda = ebitda * (1.08 ** hold_years)  # 8% EBITDA growth assumption
    exit_ev = projected_ebitda * (ev_ebitda or 10)
    exit_equity = exit_ev - total_debt if ev_ebitda else None
    moic = (exit_equity / entry_equity) if (exit_equity and entry_equity) else None
    irr = (moic ** (1 / hold_years) - 1) if moic else None

    return {
        "skill": "/lbo",
        "ticker": ticker.upper(),
        "entry_metrics": {
            "market_cap": market_cap,
            "enterprise_value": enterprise_value,
            "ebitda": ebitda,
            "ev_ebitda": round(ev_ebitda, 1) if ev_ebitda else None,
            "debt_to_ebitda": round(debt_to_ebitda, 1) if debt_to_ebitda else None,
        },
        "exit_metrics": {
            "projected_ebitda": round(projected_ebitda, 0) if ebitda else None,
            "exit_ev": round(exit_ev, 0) if ev_ebitda else None,
            "exit_equity": round(exit_equity, 0) if exit_equity else None,
        },
        "returns": {
            "moic": round(moic, 2) if moic else None,
            "irr_estimate": round(irr * 100, 1) if irr else None,
            "hold_years": hold_years,
            "target_irr": target_irr * 100,
        },
        "data_source": "yfinance",
        "note": "Simplified model. Real LBO requires debt schedule and full cash flow waterfall.",
    }
