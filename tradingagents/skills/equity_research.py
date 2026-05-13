"""Equity research skills — /earnings-analysis, /sector-overview, /thesis-tracking."""

from __future__ import annotations

import logging
from typing import Any

import yfinance as yf

from .mock_data import get_ticker_info, get_income_statement
from .registry import register_skill

logger = logging.getLogger(__name__)


@register_skill("/earnings-analysis")
def earnings_analysis(ticker: str, **kwargs) -> dict[str, Any]:
    """Earnings quality and catalyst analysis using public data."""
    info = get_ticker_info(ticker)
    income = get_income_statement(ticker)

    # Recent earnings data
    t = yf.Ticker(ticker)
    earnings_dates = None
    try:
        cal = t.calendar
        if cal is not None and "Earnings Date" in cal:
            earnings_dates = str(cal["Earnings Date"])
    except Exception as e:
        logger.warning(f"Failed to read calendar for {ticker}: {type(e).__name__}: {e}")

    eps_trailing = info.get("trailingEps")
    eps_forward = info.get("forwardEps")
    eps_growth = None
    if eps_trailing and eps_forward and eps_trailing != 0:
        eps_growth = round((eps_forward - eps_trailing) / abs(eps_trailing) * 100, 1)

    revenue_growth = info.get("revenueGrowth")
    earnings_growth = info.get("earningsGrowth")
    profit_margin = info.get("profitMargins")
    gross_margin = info.get("grossMargins")

    # Surprise history (yfinance earnings_history)
    surprise_data = []
    try:
        eh = t.earnings_history
        if eh is not None and not eh.empty:
            for _, row in eh.tail(4).iterrows():
                surprise_data.append({
                    "quarter": str(row.get("Quarter", "")),
                    "surprise_pct": round(float(row.get("Surprise(%)", 0)), 1),
                })
    except Exception as e:
        logger.warning(f"Failed to parse earnings history for {ticker}: {type(e).__name__}: {e}")

    return {
        "skill": "/earnings-analysis",
        "ticker": ticker.upper(),
        "next_earnings": earnings_dates,
        "eps": {"trailing": eps_trailing, "forward": eps_forward, "growth_pct": eps_growth},
        "margins": {"gross": gross_margin, "net": profit_margin},
        "growth": {"revenue": revenue_growth, "earnings": earnings_growth},
        "recent_surprises": surprise_data,
        "data_source": "yfinance",
    }


@register_skill("/sector-overview")
def sector_overview(ticker: str, **kwargs) -> dict[str, Any]:
    """Sector and industry positioning relative to peers."""
    info = get_ticker_info(ticker)
    sector = info.get("sector", "Unknown")
    industry = info.get("industry", "Unknown")

    from .mock_data import get_sector_peers
    peers = get_sector_peers(ticker)
    peer_snapshots = []
    for peer in peers:
        try:
            p_info = yf.Ticker(peer).info or {}
            peer_snapshots.append({
                "ticker": peer,
                "pe": p_info.get("trailingPE"),
                "revenue_growth": p_info.get("revenueGrowth"),
                "gross_margin": p_info.get("grossMargins"),
                "market_cap": p_info.get("marketCap"),
            })
        except Exception:
            pass

    return {
        "skill": "/sector-overview",
        "ticker": ticker.upper(),
        "sector": sector,
        "industry": industry,
        "market_cap": info.get("marketCap"),
        "pe_ratio": info.get("trailingPE"),
        "revenue_growth": info.get("revenueGrowth"),
        "gross_margin": info.get("grossMargins"),
        "peers": peer_snapshots,
        "data_source": "yfinance",
    }


@register_skill("/thesis-tracking")
def thesis_tracking(ticker: str, memory_log_path: str | None = None, **kwargs) -> dict[str, Any]:
    """Read prior decisions from memory log for this ticker."""
    import os
    import re

    # Validate memory_log_path to prevent directory traversal attacks
    base_dir = os.path.join(os.path.expanduser("~"), ".tradingagents", "memory")
    if memory_log_path:
        candidate_path = os.path.abspath(os.path.normpath(memory_log_path))
        if not candidate_path.startswith(base_dir):
            logger.warning(f"Rejecting memory_log_path outside base directory: {memory_log_path}")
            log_path = os.path.join(base_dir, "trading_memory.md")
        else:
            log_path = candidate_path
    else:
        log_path = os.path.join(base_dir, "trading_memory.md")

    entries: list[dict] = []
    if os.path.exists(log_path):
        try:
            with open(log_path, "r") as f:
                content = f.read()
            # Parse entries matching this ticker
            pattern = rf"## {re.escape(ticker.upper())}.*?(?=\n## |\Z)"
            for match in re.finditer(pattern, content, re.DOTALL):
                entries.append({"raw": match.group().strip()})
        except Exception as e:
            logger.error(f"Failed to read memory log {log_path}: {type(e).__name__}: {e}")

    return {
        "skill": "/thesis-tracking",
        "ticker": ticker.upper(),
        "prior_entries": len(entries),
        "entries": entries[:5],  # cap at 5 most recent
        "data_source": "memory_log",
    }
