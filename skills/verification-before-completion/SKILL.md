# verification-before-completion

## When to invoke
Before marking ANY task done. Before saying "done" or "complete" or "finished".
No exceptions.

## Procedure

### Step 1 — Re-read the original requirement
Read the user's original request word for word.
List every explicit requirement. List every implicit expectation.

### Step 2 — Check each requirement against the implementation
For every requirement: does the code satisfy it? Check by reading code, not by recalling what you wrote.

### Step 3 — Run the verification commands
```bash
# Python changes
pytest tests/ -x -q

# Frontend changes
cd apps/web && npm run typecheck && npm run build

# Both
ruff check tradingagents/ services/
```

All must pass. If any fail, fix before proceeding.

### Step 4 — Check for regressions
Run the full test suite, not just the tests for the changed code.
If any previously-passing test now fails: that is a regression. Fix it.

### Step 5 — Check the design system (frontend changes)
- All new components use ct-* variables (no hardcoded hex)
- Dark mode and light mode both render correctly
- Mobile width (375px) does not break layout

### Step 6 — Only then mark done
State explicitly: "Verification complete. All requirements met. Tests pass."

## Anti-patterns
- "I'm pretty sure this works" without running the tests
- Marking done immediately after writing the last line of code
- Assuming a passing CI means the requirement is met

## Success criteria
- Every requirement from the original request is checked against the code
- All verification commands exit 0
- No regressions introduced
