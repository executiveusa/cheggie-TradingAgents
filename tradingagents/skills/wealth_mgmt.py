"""Wealth management skills — /portfolio-review, /rebalancing."""

from __future__ import annotations

from typing import Any

import yfinance as yf

from .mock_data import get_ticker_info
from .registry import register_skill


@register_skill("/portfolio-review")
def portfolio_review(
    ticker: str,
    positions: list[dict] | None = None,
    **kwargs,
) -> dict[str, Any]:
    """Multi-position portfolio review against a single anchor ticker.

    positions: list of {"ticker": str, "weight_pct": float}
    """
    anchor = get_ticker_info(ticker)
    position_snapshots = []

    all_tickers = [ticker.upper()]
    if positions:
        all_tickers += [p["ticker"].upper() for p in positions if p.get("ticker") != ticker]

    for sym in all_tickers:
        try:
            info = yf.Ticker(sym).info or {}
            weight = 100.0 if sym == ticker.upper() else next(
                (p.get("weight_pct", 0) for p in (positions or []) if p.get("ticker", "").upper() == sym), 0
            )
            position_snapshots.append({
                "ticker": sym,
                "weight_pct": weight,
                "current_price": info.get("currentPrice") or info.get("regularMarketPrice"),
                "pe_ratio": info.get("trailingPE"),
                "beta": info.get("beta"),
                "52w_high": info.get("fiftyTwoWeekHigh"),
                "52w_low": info.get("fiftyTwoWeekLow"),
                "52w_change_pct": info.get("52WeekChange"),
            })
        except Exception:
            position_snapshots.append({"ticker": sym, "error": "data_unavailable"})

    # Concentration check
    weights = [p.get("weight_pct", 0) for p in position_snapshots]
    max_weight = max(weights) if weights else 0
    concentration_flag = max_weight > 20

    return {
        "skill": "/portfolio-review",
        "anchor_ticker": ticker.upper(),
        "positions": position_snapshots,
        "concentration_flag": concentration_flag,
        "max_single_name_weight_pct": max_weight,
        "data_source": "yfinance",
    }


@register_skill("/rebalancing")
def rebalancing(
    ticker: str,
    current_positions: list[dict] | None = None,
    target_positions: list[dict] | None = None,
    **kwargs,
) -> dict[str, Any]:
    """Drift detection and rebalancing trades needed.

    current_positions / target_positions: list of {"ticker": str, "weight_pct": float}
    """
    current_map = {p["ticker"].upper(): p.get("weight_pct", 0) for p in (current_positions or [])}
    target_map = {p["ticker"].upper(): p.get("weight_pct", 0) for p in (target_positions or [])}

    all_symbols = set(current_map) | set(target_map)
    trades = []
    for sym in sorted(all_symbols):
        current_w = current_map.get(sym, 0.0)
        target_w = target_map.get(sym, 0.0)
        drift = current_w - target_w
        if abs(drift) >= 1.0:
            trades.append({
                "ticker": sym,
                "current_weight_pct": current_w,
                "target_weight_pct": target_w,
                "drift_pct": round(drift, 2),
                "action": "REDUCE" if drift > 0 else "ADD",
            })

    return {
        "skill": "/rebalancing",
        "anchor_ticker": ticker.upper(),
        "trades_needed": trades,
        "total_drift": round(sum(abs(t["drift_pct"]) for t in trades), 2),
        "data_source": "computed",
    }
