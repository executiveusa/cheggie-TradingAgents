# systematic-debugging

## When to invoke
Any unexplained test failure, runtime error, or behaviour that contradicts what the code should do.
Do not guess. Do not patch. Find the root cause.

## Procedure

### Phase 1 — Reproduce
1. Identify the exact failing case (test name, input, error message)
2. Reproduce it in isolation — smallest possible input that triggers the bug
3. Confirm the reproduction is stable (fails consistently)

### Phase 2 — Locate
1. Read the full error message and stack trace. Note the deepest frame in your code (not a library).
2. Use jCodeMunch to trace the call chain: `get_call_hierarchy` from the failing function
3. Form one hypothesis: "The bug is in X because Y"

### Phase 3 — Verify the hypothesis
1. Add a targeted print/log at the suspected location
2. Run the reproduction case and observe actual vs expected values
3. If hypothesis is wrong, update it and repeat Phase 3. Do not try multiple fixes at once.

### Phase 4 — Fix with defense-in-depth
1. Fix the root cause, not the symptom
2. Add a guard that prevents the same class of bug from recurring (input validation, type check, assertion)
3. Write a regression test that would have caught this bug

### Phase 5 — Verify
1. Run the full test suite: `pytest tests/ -x`
2. Confirm the original failing case now passes
3. Confirm no new failures were introduced

## Anti-patterns
- Changing multiple things at once ("shotgun debugging")
- Patching the symptom without understanding the cause
- Marking done before running the full test suite

## Success criteria
- Root cause identified and stated in the commit message
- Regression test added
- Full test suite passes green
