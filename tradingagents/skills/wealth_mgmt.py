"""Wealth management skills — /portfolio-review, /rebalancing."""

from __future__ import annotations

import logging
from typing import Any

import yfinance as yf

from .registry import register_skill

logger = logging.getLogger(__name__)


@register_skill("/portfolio-review")
def portfolio_review(
    ticker: str,
    positions: list[dict] | None = None,
    concentration_threshold: float = 20.0,
    **kwargs,
) -> dict[str, Any]:
    """Multi-position portfolio review against a single anchor ticker.

    positions: list of {"ticker": str, "weight_pct": float}
    """
    position_snapshots = []

    anchor_sym = ticker.upper()
    all_tickers = [anchor_sym]
    if positions:
        all_tickers += [
            sym
            for p in positions
            for sym in [str(p.get("ticker", "")).upper()]
            if sym and sym != anchor_sym
        ]

    for sym in all_tickers:
        try:
            info = yf.Ticker(sym).info or {}
            weight = next(
                (p.get("weight_pct", 0) for p in (positions or []) if p.get("ticker", "").upper() == sym),
                100.0 if not positions and sym == ticker.upper() else 0.0,
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
        except Exception as exc:
            logger.debug("Could not fetch data for %s: %s", sym, exc)
            position_snapshots.append({"ticker": sym, "error": "data_unavailable", "error_type": type(exc).__name__})

    # Concentration check
    weights = [p.get("weight_pct", 0) for p in position_snapshots]
    max_weight = max(weights) if weights else 0
    concentration_flag = max_weight > concentration_threshold

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
    drift_threshold: float = 1.0,
    **kwargs,
) -> dict[str, Any]:
    """Drift detection and rebalancing trades needed.

    current_positions / target_positions: list of {"ticker": str, "weight_pct": float}
    """
    current_map = {
        sym: p.get("weight_pct", 0)
        for p in (current_positions or [])
        for sym in [str(p.get("ticker", "")).upper()]
        if sym
    }
    target_map = {
        sym: p.get("weight_pct", 0)
        for p in (target_positions or [])
        for sym in [str(p.get("ticker", "")).upper()]
        if sym
    }

    all_symbols = set(current_map) | set(target_map)
    trades = []
    for sym in sorted(all_symbols):
        current_w = current_map.get(sym, 0.0)
        target_w = target_map.get(sym, 0.0)
        drift = current_w - target_w
        if abs(drift) >= drift_threshold:
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
