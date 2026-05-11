# dispatching-parallel-agents

## When to invoke
When 3+ independent subtasks exist that do not share state and can be implemented concurrently.
Examples: writing 3 unrelated API routes, building 4 independent UI components, running tests + linting + type checking simultaneously.

## Procedure

### Step 1 — Identify independent subtasks
List all subtasks. For each pair: does A depend on B's output? If yes, they are not independent.
Only subtasks with no shared mutable state and no output dependencies can be parallelised.

### Step 2 — Write a spec for each subtask
Each subtask spec must be self-contained:
- Exact file paths
- Exact function/component signatures
- Input/output contract
- Done condition

The agent executing a subtask has NO context from other subtasks. Write the spec as if explaining to someone who just joined.

### Step 3 — Dispatch agents
Launch agents in a single message (parallel tool calls).
Each agent gets exactly its subtask spec. Do not give an agent context it does not need.

### Step 4 — Collect and verify
When all agents complete:
1. Read each agent's output
2. Check for conflicts (same file modified by two agents)
3. Run the full verification suite across all changes
4. Resolve any conflicts before committing

## Anti-patterns
- Dispatching agents that write to the same file
- Giving an agent context from another agent's work (breaks isolation)
- Assuming parallel work is correct without running the verification suite

## Success criteria
- All subtasks complete with no conflicts
- Full verification suite passes across combined changes
- No agent duplicated another's work
