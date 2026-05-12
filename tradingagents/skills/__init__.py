"""Financial skills registry for Hermes / TradingAgentsGraph.

Importing this package registers all built-in skills automatically.
"""

from .registry import SKILLS_REGISTRY, register_skill

# Import skill modules to trigger @register_skill decoration
from . import financial_analysis  # noqa: F401
from . import equity_research     # noqa: F401
from . import private_equity      # noqa: F401
from . import wealth_mgmt         # noqa: F401

__all__ = ["SKILLS_REGISTRY", "register_skill"]
