"""Skill registry — maps slash-command names to callable skill functions.

Usage:
    from tradingagents.skills.registry import register_skill, SKILLS_REGISTRY

    @register_skill("/comps")
    def comps_analysis(ticker: str, **kwargs) -> dict: ...
"""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

SkillFn = Callable[..., dict[str, Any]]

SKILLS_REGISTRY: dict[str, SkillFn] = {}


def register_skill(name: str) -> Callable[[SkillFn], SkillFn]:
    """Decorator — register a skill function by its slash-command name."""
    def decorator(fn: SkillFn) -> SkillFn:
        SKILLS_REGISTRY[name] = fn
        return fn
    return decorator
