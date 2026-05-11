"""Map Hermes UI route preference strings to TradingAgentsGraph LLM config overrides."""

from __future__ import annotations

ROUTE_TO_CONFIG: dict[str, dict] = {
    # auto: use whatever DEFAULT_CONFIG specifies unchanged
    "auto": {},
    # gateway: route through Synthia Gateway (OpenAI-compatible proxy)
    # Model name prefix determines upstream provider inside the gateway
    "gateway": {
        "llm_provider": "gateway",
        "deep_think_llm": "claude-opus-4-6",
        "quick_think_llm": "claude-sonnet-4-6",
    },
    # grok: xAI directly
    "grok": {
        "llm_provider": "xai",
        "deep_think_llm": "grok-4-0709",
        "quick_think_llm": "grok-4-0709",
    },
    # groq: fast inference via gateway (model name prefix routes to Groq)
    "groq": {
        "llm_provider": "gateway",
        "deep_think_llm": "llama-3.3-70b-versatile",
        "quick_think_llm": "llama-3.1-8b-instant",
    },
    # openrouter: direct OpenRouter
    "openrouter": {
        "llm_provider": "openrouter",
        "deep_think_llm": "anthropic/claude-opus-4",
        "quick_think_llm": "anthropic/claude-haiku-4-5",
    },
    # gemini: Google directly
    "gemini": {
        "llm_provider": "google",
        "deep_think_llm": "gemini-2.5-pro-preview-05-06",
        "quick_think_llm": "gemini-2.5-flash-preview-04-17",
    },
}


def apply_route(config: dict, route: str) -> dict:
    """Return a copy of config with route-specific overrides applied."""
    overrides = ROUTE_TO_CONFIG.get(route, {})
    return {**config, **overrides}
