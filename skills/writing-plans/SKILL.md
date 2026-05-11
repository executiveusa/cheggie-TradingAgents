# writing-plans

## When to invoke
Any task touching 3+ files, spanning 2+ systems, or requiring more than one logical step.
When in doubt, write the plan. Planning is cheap. Wrong implementations are not.

## Procedure

### Step 1 — State the goal in one sentence
Write it in `docs/superpowers/plan-<slug>.md`. If you cannot state the goal in one sentence, the task is not well-defined. Stop and ask.

### Step 2 — List every file that will be modified or created
For each file:
- Full path relative to repo root
- What changes: new file, modify function X, add field Y
- Why: what requirement this satisfies

### Step 3 — Break into bite-sized tasks (2–5 minutes each)
Each task must:
- Touch at most 1–2 files
- Be independently testable
- Have a clear done condition

### Step 4 — Identify dependencies
Draw the order: which tasks must finish before others can start.
Mark tasks that can run in parallel.

### Step 5 — Get approval
Present the plan to the user before writing any code.
Only proceed after explicit approval.

### Step 6 — Execute one task at a time
Mark each task done in the plan file immediately after completion.
If a task reveals new requirements, update the plan before continuing.

## Anti-patterns
- Starting to code before the plan is written
- Tasks longer than 5 minutes without a checkpoint
- Modifying files not listed in the plan without updating the plan first

## Success criteria
- Plan file exists in `docs/superpowers/`
- Every modified file was listed before the first line of code was written
- All tasks marked done, build passes, tests pass
