# CHEGGIE TRADE — Claude Code Policy

## MANDATORY: jCodeMunch Code Exploration

All code exploration must use jCodeMunch MCP tools. The session-start hook
auto-indexes the repo. The PreToolUse hook blocks Glob/Grep for code search.

**Permitted jCodeMunch patterns:**
- `mcp__jcodemunch__search_symbols` — find functions/classes by name
- `mcp__jcodemunch__get_symbol_source` — read exact implementation
- `mcp__jcodemunch__get_file_outline` — understand a file before opening
- `mcp__jcodemunch__get_repo_outline` — explore overall structure
- `mcp__jcodemunch__find_references` — where a symbol is used
- `mcp__jcodemunch__get_blast_radius` — what breaks if you change X
- `mcp__jcodemunch__get_call_hierarchy` — callers/callees N levels deep
- `mcp__jcodemunch__plan_turn` — confidence-guided routing at task start

**Read tool is allowed for:**
- Config files (.env.example, docker-compose.yml, pyproject.toml)
- SQL migrations (apps/backend/migrations/*.sql)
- Non-code assets (CSS, markdown docs)
- Files explicitly referenced by the user in their message

---

## MANDATORY: Superpowers Workflow Skills

Before starting any task, check whether a skill applies. If 1% chance it
applies, you MUST use it. Skills are in `skills/` directory.

| Skill | When to Invoke |
|---|---|
| `test-driven-development` | Any new feature or bug fix with testable logic |
| `writing-plans` | Any task touching 3+ files or 2+ systems |
| `systematic-debugging` | Any unexplained test failure or runtime error |
| `verification-before-completion` | Before marking any task done |
| `dispatching-parallel-agents` | When 3+ independent subtasks can run concurrently |
| `finishing-a-development-branch` | Before opening a PR or merging |

Skills are in `skills/<skill-name>/SKILL.md`. Load with: `/skills/<skill-name>`

---

## Design System (MANDATORY for all frontend work)

All new components must use ct-* CSS variables. No hardcoded colors.

### Dark (default) / Light (`.light` class) token values

| Token | Dark | Light |
|---|---|---|
| `--ct-bg` | `#080f0b` | `#f0faf4` |
| `--ct-card` | `#0d1a12` | `#ffffff` |
| `--ct-subtle` | `#122018` | `#e8f5ed` |
| `--ct-emerald` | `#22c55e` | `#15803d` |
| `--ct-emerald-dim` | `#15803d` | `#166534` |
| `--ct-text` | `#f1f5f2` | `#0a1a0f` |
| `--ct-muted` | `#8fa896` | `#4a7c59` |
| `--ct-border` | `rgba(34,197,94,0.15)` | `rgba(21,128,61,0.2)` |

### Component patterns

```text
Card:        rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-8
Label:       font-mono text-xs text-[var(--ct-emerald)] tracking-widest uppercase
CTA button:  rounded-xl bg-[var(--ct-emerald)] px-6 py-3 font-semibold text-black
Outline btn: rounded-xl border border-[var(--ct-border)] px-6 py-3 font-semibold text-[var(--ct-text)]
Muted text:  text-[var(--ct-muted)] leading-relaxed
```

Fonts: DM Sans (body), DM Mono (code/labels/numbers).

---

## Branch & Commit Rules

- Never push directly to `main`
- Create feature branches: `claude/<feature-slug>`
- Commit format: `feat(scope): description` / `fix(scope): description`
- Append session URL to every commit message
- `npm run build` must exit 0 before pushing frontend changes
- `pytest tests/ -x` must pass before pushing backend changes

---

## Architecture Quick Map

| Area | Entry Point |
|---|---|
| Next.js frontend | `apps/web/app/` |
| Hermes UI | `apps/web/app/hermes/page.tsx` |
| Hermes API proxy | `apps/web/app/api/hermes/route.ts` |
| Python API | `services/api/app/` |
| Analyze endpoint | `services/api/app/routers/analyze.py` |
| LangGraph orchestrator | `tradingagents/graph/trading_graph.py` |
| LLM factory | `tradingagents/llm_clients/factory.py` |
| Financial skills | `tradingagents/skills/` |
| Agent schemas | `tradingagents/agents/schemas.py` |
| DB migrations | `apps/backend/migrations/` |
| Design tokens | `apps/web/app/globals.css` |
