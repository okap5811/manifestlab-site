#!/usr/bin/env bash
# §3.1 URL-stability check (WEBSITE-MIGRATION-PLAN) — run after EVERY production deploy.
# Riff 1.0(3) is in App Review with these URLs in ASC metadata / the frozen binary;
# Steadfast is live in Austin beta with its listing links. All seven must return 200.
# Usage: scripts/check-urls.sh [base-url]   (default https://manifestlab.dev)
set -u
BASE="${1:-https://manifestlab.dev}"
FAIL=0
for p in / /riff/ /riff/privacy /riff/support /riff/terms /steadfast/privacy /steadfast/support; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -L "$BASE$p")
  if [ "$code" = "200" ]; then
    echo "OK   $code $p"
  else
    echo "FAIL $code $p"
    FAIL=1
  fi
done
exit $FAIL
