#!/usr/bin/env node
// Lint content/redirects.json against SPEC-attribution-spine invariants.
// Runs as prebuild — a violation fails the build (and therefore the promote gate).

import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "content", "redirects.json");
const map = JSON.parse(fs.readFileSync(file, "utf8"));

// Destination-host allowlist (red-team L1): /go/ is a first-party link users are told to
// trust — it must never 302 off to an arbitrary host, or every "manifestlab.dev/go/…" link
// becomes an open redirect / phishing hop that rides the content/-only data gate. Only these
// hosts (and their subdomains) may be a redirect destination.
const ALLOWED_HOSTS = ["manifestlab.dev", "apps.apple.com"];
const hostAllowed = (h) =>
  ALLOWED_HOSTS.some((a) => h === a || h.endsWith("." + a));

const errors = [];

for (const [token, entry] of Object.entries(map)) {
  const where = `redirects.json["${token}"]`;

  if (!/^[a-z0-9][a-z0-9-]*$/.test(token)) {
    errors.push(`${where}: token must be lowercase alphanumeric + hyphens`);
  }
  if (token.length > 30) {
    errors.push(`${where}: token exceeds Apple's 30-char campaign-token limit`);
  }
  for (const field of ["to", "cpp", "created", "note"]) {
    if (!entry[field]) errors.push(`${where}: missing required field "${field}"`);
  }
  if (!entry.to) continue;

  let url;
  try {
    url = new URL(entry.to);
  } catch {
    errors.push(`${where}: "to" is not a valid URL`);
    continue;
  }

  if (url.protocol !== "https:") {
    errors.push(`${where}: destination must be https (got "${url.protocol}")`);
  }
  if (!hostAllowed(url.hostname)) {
    errors.push(`${where}: destination host "${url.hostname}" not in the allowlist [${ALLOWED_HOSTS.join(", ")}] — /go/ must never redirect off-domain (L1 open-redirect guard)`);
  }

  const ct = url.searchParams.get("ct");
  if (ct !== null && ct !== token) {
    errors.push(`${where}: ct="${ct}" must equal the token key (silent mis-bucketing otherwise)`);
  }

  if (url.hostname === "apps.apple.com") {
    if (!ct) errors.push(`${where}: App Store destination missing ct=`);
    if (!url.searchParams.get("pt")) {
      errors.push(`${where}: ct= without pt= never registers in App Analytics (G-07)`);
    }
    if (url.searchParams.get("mt") !== "8") {
      errors.push(`${where}: App Store destination must carry mt=8 (G-07)`);
    }
  }
}

if (errors.length) {
  console.error(`redirects lint FAILED (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`redirects lint OK (${Object.keys(map).length} token${Object.keys(map).length === 1 ? "" : "s"})`);
