# finishing-a-development-branch

## When to invoke
Before opening a PR, before merging, before declaring a feature branch complete.

## Procedure

### Step 1 — Run verification-before-completion
Invoke the `verification-before-completion` skill first. Do not skip it.

### Step 2 — Check the branch diff
```bash
git diff main...HEAD --stat
```
Review every changed file. Is anything unexpected in the diff?
- No accidental debug code
- No hardcoded secrets or API keys
- No .env files committed
- No .next/ or node_modules/ committed

### Step 3 — Write the commit message
Format:
```text
feat(scope): one-line summary of what changed

- Bullet point for each significant change
- Reference to any related issues or PRs

https://claude.ai/code/session_<your-session-id>
```

### Step 4 — Final build check
```bash
# Frontend
cd apps/web && npm run typecheck && npm run build

# Backend
python -m pytest tests/ -x -q && python -m ruff check tradingagents/ services/
```
Both must pass. If either fails, fix before pushing.

### Step 5 — Push and open PR
```bash
git push -u origin <branch-name>
```
Open a **draft** PR. Title: same as commit summary. Body: what changed, why, test plan checklist.

### Step 6 — Declare done
Tell the user: "Branch complete. PR opened at [URL]. Verification passed."

## Anti-patterns
- Pushing directly to main
- Opening a PR before tests pass
- Forgetting to add the session URL to the commit

## Success criteria
- All verification commands exit 0
- PR is open as draft
- No sensitive data in the diff
