"""Free-tier data utilities using yfinance.

All functions annotate their output with data_source so callers and users
know which data is from a real paid provider vs a yfinance approximation.
"""

from __future__ import annotations

from typing import Any

import yfinance as yf


_DATA_SOURCE = "yfinance"


def get_ticker_info(ticker: str) -> dict[str, Any]:
    t = yf.Ticker(ticker)
    info = t.info or {}
    return {**info, "data_source": _DATA_SOURCE}


def get_cashflow(ticker: str) -> dict[str, Any]:
    t = yf.Ticker(ticker)
    cf = t.cashflow
    if cf is None or cf.empty:
        return {"data_source": _DATA_SOURCE, "rows": []}
    return {
        "data_source": _DATA_SOURCE,
        "rows": cf.reset_index().to_dict(orient="records"),
    }


def get_income_statement(ticker: str) -> dict[str, Any]:
    t = yf.Ticker(ticker)
    inc = t.income_stmt
    if inc is None or inc.empty:
        return {"data_source": _DATA_SOURCE, "rows": []}
    return {
        "data_source": _DATA_SOURCE,
        "rows": inc.reset_index().to_dict(orient="records"),
    }


def get_balance_sheet(ticker: str) -> dict[str, Any]:
    t = yf.Ticker(ticker)
    bs = t.balance_sheet
    if bs is None or bs.empty:
        return {"data_source": _DATA_SOURCE, "rows": []}
    return {
        "data_source": _DATA_SOURCE,
        "rows": bs.reset_index().to_dict(orient="records"),
    }


def get_sector_peers(ticker: str, max_peers: int = 4) -> list[str]:
    """Return a short list of peer tickers in the same sector (best-effort)."""
    info = get_ticker_info(ticker)
    sector = info.get("sector", "")
    industry = info.get("industry", "")
    # Hardcoded peer maps for common tickers — real implementation would use
    # a screener API. This is the free-tier fallback.
    _PEER_MAP: dict[str, list[str]] = {
        "NVDA": ["AMD", "INTC", "QCOM", "AVGO"],
        "AAPL": ["MSFT", "GOOGL", "META", "AMZN"],
        "MSFT": ["AAPL", "GOOGL", "META", "ORCL"],
        "TSLA": ["GM", "F", "RIVN", "NIO"],
        "AMZN": ["MSFT", "GOOGL", "META", "BABA"],
        "META": ["GOOGL", "SNAP", "PINS", "TWTR"],
    }
    peers = _PEER_MAP.get(ticker.upper(), [])
    return peers[:max_peers]
