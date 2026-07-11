#!/usr/bin/env bash
# Actuate an approved site-promote decision (.gates/README.md step 4).
# Deterministic and model-free — safe for the actuator's actions map.
# Usage: scripts/promote.sh .gates/<date>-<slug>.decision.json
set -euo pipefail
cd "$(dirname "$0")/.."

DECISION="${1:?usage: promote.sh <decision-file>}"
REQUEST="${DECISION%.decision.json}.json"
[ -f "$DECISION" ] || { echo "no decision file: $DECISION"; exit 1; }
[ -f "$REQUEST" ] || { echo "no matching request: $REQUEST"; exit 1; }

verdict=$(node -p "JSON.parse(require('fs').readFileSync('$DECISION','utf8')).verdict")
[ "$verdict" = "approved" ] || { echo "verdict is '$verdict' — nothing to do"; exit 0; }

branch=$(node -p "JSON.parse(require('fs').readFileSync('$REQUEST','utf8')).branch")
head=$(node -p "JSON.parse(require('fs').readFileSync('$REQUEST','utf8')).head")

git fetch -q origin

# Guardrail (§4.5): the actual branch diff, re-checked at actuation time —
# code changes cannot ride the data gate.
offenders=$(git diff --name-only "origin/main...origin/$branch" | grep -v '^content/' | grep -v '^public/' || true)
if [ -n "$offenders" ]; then
  echo "REFUSED — branch touches non-data files:"
  echo "$offenders"
  exit 1
fi

# The approved head must still be the branch tip (no post-approval pushes ride along).
tip=$(git rev-parse "origin/$branch")
if [ "$tip" != "$head" ]; then
  echo "REFUSED — branch tip $tip != approved head $head (re-request the gate)"
  exit 1
fi

git checkout -q main
git pull -q --ff-only origin main
PREV_MAIN=$(git rev-parse HEAD)   # known-good production commit, for auto-rollback (L3)
git merge --ff-only "origin/$branch"
git push -q origin main
echo "merged $branch → main, pushed (prev good main: $PREV_MAIN)"

# DECIDED MODEL (2026-07-11, RUNBOOK-riff-launch §5): this CLI deploy is THE production
# writer, permanently. The Git integration (once connected) exists for PREVIEW deploys on
# ops/* branches only — the project's Ignored Build Step skips main builds, so a push to
# main deploys nothing. Rationale: single deterministic writer, synchronous completion,
# and the §3.1 check below is guaranteed to run against the deploy this script just made
# (an auto-deploy race could green-light a stale one). Do not remove this line.
npx vercel deploy --prod

if bash scripts/check-urls.sh; then
  echo "PROMOTED — §3.1 check green"
  exit 0
fi

# Red-team L3: the §3.1 check is post-deploy (detective) — a data change CAN break a
# review-critical URL in production for the moments before this fires. Preview-based
# pre-checks aren't viable (Vercel SSO-walls preview deploys). So minimize exposure:
# auto-revert to the last known-good commit and redeploy ON THE SPOT, then re-verify.
echo "§3.1 CHECK FAILED ON FRESH PRODUCTION DEPLOY — auto-rolling back to $PREV_MAIN"
git reset --hard "$PREV_MAIN"
git push --force-with-lease origin main
npx vercel deploy --prod
if bash scripts/check-urls.sh; then
  echo "ROLLED BACK — production restored to $PREV_MAIN; the offending gate was NOT promoted."
else
  echo "CRITICAL — rollback deploy STILL failing §3.1; production may be broken. Human needed NOW."
fi
exit 1
