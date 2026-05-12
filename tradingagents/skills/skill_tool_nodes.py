"""Wrap registered skills as LangChain @tool functions for TradingAgentsGraph."""

from __future__ import annotations

import json
from typing import Annotated, Any

from langchain_core.tools import tool

from .registry import SKILLS_REGISTRY


def get_skill_tools(enabled_skills: list[str] | None = None) -> list[Any]:
    """Return a list of LangChain tool objects for the enabled skills."""
    tools = []
    for name, fn in SKILLS_REGISTRY.items():
        if enabled_skills is not None and name not in enabled_skills:
            continue

        # Capture name and fn in closure
        def make_tool(skill_name: str, skill_fn: Any) -> Any:
            @tool(skill_name)
            def skill_tool(
                ticker: Annotated[str, "Stock ticker symbol e.g. NVDA"],
                params_json: Annotated[str, "Optional JSON string of extra parameters"] = "{}",
            ) -> str:
                """Run the financial skill and return JSON result."""
                try:
                    params = json.loads(params_json) if params_json else {}
                    result = skill_fn(ticker=ticker, **params)
                    return json.dumps(result, default=str)
                except Exception as exc:
                    return json.dumps({"error": str(exc), "skill": skill_name})
            return skill_tool

        tools.append(make_tool(name, fn))
    return tools
