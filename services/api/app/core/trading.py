from tradingagents.default_config import DEFAULT_CONFIG
from tradingagents.graph.trading_graph import TradingAgentsGraph


def run_analysis(ticker: str, trade_date: str) -> dict:
    config = DEFAULT_CONFIG.copy()
    config["max_debate_rounds"] = 1
    graph = TradingAgentsGraph(debug=False, config=config)
    _, decision = graph.propagate(ticker, trade_date)
    decision_text = str(decision)

    recommendation = "hold"
    lowered = decision_text.lower()
    if "buy" in lowered:
        recommendation = "buy"
    elif "sell" in lowered:
        recommendation = "sell"

    return {
        "analysis_summary": decision_text[:500],
        "recommendation": recommendation,
        "confidence": 0.5,
        "raw_decision": decision_text,
    }
