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
    except Exception as exc:
        logger.debug("Could not read calendar for %s: %s", ticker, exc)

    eps_trailing = info.get("trailingEps")
    eps_forward = info.get("forwardEps")
    eps_growth = None
    if eps_trailing is not None and eps_forward is not None and eps_trailing != 0:
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
    except Exception as exc:
        logger.debug("Could not read earnings_history for %s: %s", ticker, exc)

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
        except Exception as exc:
            logger.debug("Could not fetch peer data for %s: %s", peer, exc)

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

    default_path = os.path.join(
        os.path.expanduser("~"), ".tradingagents", "memory", "trading_memory.md"
    )
    allowed_root = os.path.realpath(os.path.dirname(default_path))
    if memory_log_path:
        resolved = os.path.realpath(memory_log_path)
        log_path = resolved if resolved.startswith(allowed_root + os.sep) else default_path
    else:
        log_path = default_path

    entries: list[dict] = []
    content = ""
    if os.path.isfile(log_path):
        with open(log_path, encoding="utf-8") as f:
            content = f.read()
    elif os.path.exists(log_path):
        logger.warning("memory log path exists but is not a file: %s", log_path)
    # Parse entries matching this ticker
    pattern = rf"## {re.escape(ticker.upper())}.*?(?=\n## |\Z)"
    for match in re.finditer(pattern, content, re.DOTALL):
        entries.append({"raw": match.group().strip()})

    return {
        "skill": "/thesis-tracking",
        "ticker": ticker.upper(),
        "prior_entries": len(entries),
        "entries": list(reversed(entries[-5:])),
        "data_source": "memory_log",
    }
