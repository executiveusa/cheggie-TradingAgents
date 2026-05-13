"""Skill registry — maps slash-command names to callable skill functions.

Usage:
    from tradingagents.skills.registry import register_skill, SKILLS_REGISTRY

    @register_skill("/comps")
    def comps_analysis(ticker: str, **kwargs) -> dict: ...
"""

from __future__ import annotations

import logging
from collections.abc import Callable
from typing import Any

logger = logging.getLogger(__name__)

SkillFn = Callable[..., dict[str, Any]]

SKILLS_REGISTRY: dict[str, SkillFn] = {}


def register_skill(name: str) -> Callable[[SkillFn], SkillFn]:
    """Decorator — register a skill function by its slash-command name."""
    def decorator(fn: SkillFn) -> SkillFn:
        if name in SKILLS_REGISTRY:
            logger.warning(f"Skill '{name}' already registered; overwriting with {fn.__name__}")
        SKILLS_REGISTRY[name] = fn
        return fn
    return decorator
