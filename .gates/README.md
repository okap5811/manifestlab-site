# .gates/ — the site-promote gate (WEBSITE-MIGRATION-PLAN §4, DECISION-QUEUE-DESIGN)

Data changes reach production through this flow; code changes are development
sessions and do not ride this gate.

## Flow

1. **Agent** edits data files only (`content/`, `public/`) on branch `ops/<date>-<slug>`,
   pushes → Vercel builds a preview deploy automatically.
2. **Agent** writes the gate request: `node scripts/gate-request.mjs <preview-url>`
   → `.gates/<date>-<slug>.json` (`site-promote-request/v1`: branch, preview URL,
   changed files, diff summary).
3. **Omar** approves in the cockpit → `.gates/<date>-<slug>.decision.json`
   (`decision/v1`, `gate: "site-promote"`).
4. **Actuator** (watch-glob `websites/manifestlab/.gates/*.decision.json` — cockpit
   config, dashboard session's) runs on `approved`:
   `bash scripts/promote.sh .gates/<date>-<slug>.decision.json`
   The script enforces the guardrail (diff touches only `content/` + `public/`),
   fast-forward merges to `main`, pushes (Vercel deploys production), waits, then
   runs `scripts/check-urls.sh` against production — the §3.1 URL-stability check.
   Non-zero exit on ANY failure; the actuator's receipt records it.
5. `changes_requested` → no actuation; feedback in the decision file, consumed by
   the next ops session.

## Rules

- Request/decision/receipt JSONs in this directory are runtime queue artifacts —
  gitignored, retained on disk as audit (the cockpit's `decisions.jsonl` is the log).
- The guardrail is not advisory: a branch whose diff touches anything outside
  `content/` and `public/` cannot ride this gate, ever.
- A production §3.1 check failure is a same-day rollback, not a backlog item.
