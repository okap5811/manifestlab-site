#!/usr/bin/env bash
# §3.1 URL-stability check (WEBSITE-MIGRATION-PLAN) — run after EVERY production deploy.
# Riff 1.0(3) is in App Review with these URLs in ASC metadata / the frozen binary;
# Steadfast is live in Austin beta with its listing links. All SEVEN must resolve 200.
#
# Red-team C-7: the review-critical leaf pages must return a DIRECT 200 — Apple fetches the
# exact stored URL and a 3xx where it expects the policy page is a review problem. So we do
# NOT follow redirects (-L) for those; we assert the first-hop status is 200. The one
# documented exception is `/riff/`, which normalizes to `/riff` in one hop (banked baseline
# 2026-07-11) — it is allowed to redirect as long as it lands on 200.
#
# Usage: scripts/check-urls.sh [base-url]   (default https://manifestlab.dev)
set -u
BASE="${1:-https://manifestlab.dev}"
FAIL=0

# Paths Apple / the frozen binary store verbatim — must 200 with NO redirect hop.
STRICT="/ /riff/privacy /riff/support /riff/terms /steadfast/privacy /steadfast/support"
# Paths allowed exactly one normalization hop, must still land on 200.
HOP_OK="/riff/"

for p in $STRICT; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$p")   # no -L: first hop must be 200
  if [ "$code" = "200" ]; then
    echo "OK    $code $p (direct)"
  else
    echo "FAIL  $code $p (expected direct 200, no redirect)"
    FAIL=1
  fi
done

for p in $HOP_OK; do
  final=$(curl -s -o /dev/null -w "%{http_code}" -L "$BASE$p")
  hops=$(curl -s -o /dev/null -w "%{num_redirects}" -L "$BASE$p")
  if [ "$final" = "200" ] && [ "$hops" -le 1 ]; then
    echo "OK    $final $p (${hops} hop, normalization allowed)"
  else
    echo "FAIL  $final $p (${hops} hops — expected ≤1 hop to 200)"
    FAIL=1
  fi
done

exit $FAIL
