"""Core trading analysis logic — bridges the FastAPI layer to TradingAgentsGraph."""

from __future__ import annotations

import re
import time
from typing import Optional

from tradingagents.default_config import DEFAULT_CONFIG
from tradingagents.graph.trading_graph import TradingAgentsGraph

from .route_mapping import apply_route


def _derive_risk(decision_text: str, recommendation: str) -> str:
    lowered = decision_text.lower()
    # Use word-boundary regex to avoid partial matches
    sell_match = re.search(r"\b(sell|selling|sold)\b", lowered) and not re.search(r"\b(don't|no|not)\s+(sell|selling|sold)\b", lowered)
    buy_match = re.search(r"\b(buy|buying|bought)\b", lowered) and not re.search(r"\b(don't|no|not)\s+(buy|buying|bought)\b", lowered)

    if sell_match or recommendation == "sell":
        return "HIGH"
    if buy_match or recommendation == "buy":
        return "MEDIUM"
    return "LOW"


def _extract_hedge(decision_text: str) -> str:
    candidates = []
    action_verbs = ("recommend", "consider", "use", "protect")
    delimiters = (":", "-", "—")
    hedge_keywords = ("hedge", "stop", "put", "size down", "reduce", "protective")

    for line in decision_text.splitlines():
        line_stripped = line.strip()
        if not any(kw in line_stripped.lower() for kw in hedge_keywords):
            continue

        line_lower = line_stripped.lower()
        if any(neg in line_lower for neg in ("don't", "no ", "not ")):
            continue

        score = 0
        if any(verb in line_lower for verb in action_verbs):
            score += 2
        if any(delim in line_stripped for delim in delimiters):
            score += 1

        candidates.append((score, line_stripped.lstrip("*-# ") or line_stripped))

    if candidates:
        candidates.sort(key=lambda x: x[0], reverse=True)
        return candidates[0][1]
    return "No specific hedge path identified in this analysis."


def _model_note(config: dict, tokens: int, elapsed_ms: int) -> str:
    provider = config.get("llm_provider", "openai")
    model = config.get("quick_think_llm", "unknown")
    return f"{provider} → {model} | {tokens} tokens | {elapsed_ms / 1000:.1f}s"


def run_analysis(
    ticker: str,
    trade_date: str,
    route: str = "auto",
    size: Optional[str] = None,
    catalyst: Optional[str] = None,
    downside: Optional[str] = None,
    skills: Optional[list[str]] = None,
) -> dict:
    config = apply_route(DEFAULT_CONFIG.copy(), route)
    config["max_debate_rounds"] = 1
    config["max_risk_discuss_rounds"] = 1
    if skills:
        config["skills_enabled"] = True
        config["enabled_skills"] = skills

    t0 = time.time()
    graph = TradingAgentsGraph(debug=False, config=config)
    _, decision = graph.propagate(ticker, trade_date)
    elapsed_ms = int((time.time() - t0) * 1000)

    decision_text = str(decision)
    lowered = decision_text.lower()
    recommendation = "hold"
    if "buy" in lowered:
        recommendation = "buy"
    elif "sell" in lowered:
        recommendation = "sell"

    risk = _derive_risk(decision_text, recommendation)
    hedge = _extract_hedge(decision_text)
    if decision_text and len(decision_text) > 400:
        catalyst_read = decision_text[:400]
        last_space = catalyst_read.rfind(" ")
        catalyst_read = (catalyst_read[:last_space].strip() if last_space > 0 else decision_text[:400]).strip()
    else:
        catalyst_read = decision_text.strip() if decision_text else "Analysis complete."
    tokens = 0

    return {
        "ticker": ticker,
        "risk": risk,
        "catalyst": catalyst_read,
        "hedge": hedge,
        "model_note": _model_note(config, tokens, elapsed_ms),
        "tokens": tokens,
        "time_ms": elapsed_ms,
        "mode": "live",
        "recommendation": recommendation,
        "skills_used": skills or [],
    }
