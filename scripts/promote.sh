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
git merge --ff-only "origin/$branch"
git push -q origin main
echo "merged $branch → main, pushed; waiting for Vercel production deploy…"

# Poll production until the §3.1 check passes (deploys take ~1 min; cap at 5).
for i in $(seq 1 10); do
  sleep 30
  if bash scripts/check-urls.sh; then
    echo "PROMOTED — §3.1 check green"
    exit 0
  fi
  echo "…retry $i/10"
done
echo "§3.1 CHECK STILL FAILING AFTER 5 MIN — same-day rollback rule is in effect"
exit 1
