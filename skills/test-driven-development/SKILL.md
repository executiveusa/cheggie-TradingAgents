# test-driven-development

## When to invoke
Any task that adds new logic, fixes a bug, or changes existing behaviour in testable code.
If you are about to write a function, class, or API handler — this skill applies.

## Trigger phrase
"I need to add/fix/change [feature with testable logic]"

## Procedure (RED → GREEN → REFACTOR)

### Step 1 — Write the failing test first
1. Identify the exact behaviour to test (one assertion per test where possible)
2. Write the test in `tests/` (Python: pytest, TypeScript: vitest or jest)
3. Run the test — **verify it FAILS**. If it passes without code changes, the test is wrong. Delete it and start over.

### Step 2 — Write the minimal code to pass
1. Write only enough production code to make the failing test pass
2. Do not add anything beyond what the test requires
3. Run the test — **verify it PASSES**

### Step 3 — Refactor
1. Clean up the implementation (names, structure, duplication)
2. Run the test again — **verify it still PASSES**
3. Commit: `test(scope): add test for X` then `feat(scope): implement X`

## Anti-patterns
- Writing production code before a failing test exists → stop, delete the code, write the test first
- Writing a test after the fact "to get coverage" → the test proves nothing
- Skipping Step 1 verification ("I know it'll fail") → you don't know until you check

## Success criteria
- Test file committed before implementation file
- `pytest tests/ -x` or equivalent passes green
- No production code exists that isn't covered by at least one test in this change
