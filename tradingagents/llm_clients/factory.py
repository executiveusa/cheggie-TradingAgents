import os
from typing import Optional

from .base_client import BaseLLMClient

# Providers that use the OpenAI-compatible chat completions API
_OPENAI_COMPATIBLE = (
    "openai", "xai", "deepseek", "qwen", "glm", "ollama", "openrouter",
)

# Synthia Gateway — OpenAI-compatible proxy that routes by model name prefix
_GATEWAY_BASE_URL = os.getenv("SYNTHIA_GATEWAY_URL", "http://localhost:3000/v1")
_GATEWAY_API_KEY = os.getenv("GATEWAY_API_KEY", "gateway-passthrough")


def create_llm_client(
    provider: str,
    model: str,
    base_url: Optional[str] = None,
    **kwargs,
) -> BaseLLMClient:
    """Create an LLM client for the specified provider.

    Provider modules are imported lazily so that simply importing this
    factory (e.g. during test collection) does not pull in heavy LLM SDKs
    or fail when their API keys are absent.

    Args:
        provider: LLM provider name
        model: Model name/identifier
        base_url: Optional base URL for API endpoint
        **kwargs: Additional provider-specific arguments

    Returns:
        Configured BaseLLMClient instance

    Raises:
        ValueError: If provider is not supported
    """
    provider_lower = provider.lower()

    # Synthia Gateway: OpenAI-compatible proxy — model name prefix selects upstream
    # claude-* → Anthropic, gpt-* → OpenAI, llama/gemma → Groq, mistral-* → Mistral
    if provider_lower == "gateway":
        from .openai_client import OpenAIClient
        return OpenAIClient(
            model,
            base_url or _GATEWAY_BASE_URL,
            provider="openrouter",  # use the OpenRouter code path (no responses API)
            api_key=_GATEWAY_API_KEY,
            **kwargs,
        )

    if provider_lower in _OPENAI_COMPATIBLE:
        from .openai_client import OpenAIClient
        return OpenAIClient(model, base_url, provider=provider_lower, **kwargs)

    if provider_lower == "anthropic":
        from .anthropic_client import AnthropicClient
        return AnthropicClient(model, base_url, **kwargs)

    if provider_lower == "google":
        from .google_client import GoogleClient
        return GoogleClient(model, base_url, **kwargs)

    if provider_lower == "azure":
        from .azure_client import AzureOpenAIClient
        return AzureOpenAIClient(model, base_url, **kwargs)

    raise ValueError(f"Unsupported LLM provider: {provider}")
