#!/usr/bin/env node
// Write a site-promote gate request for the current ops/ branch (.gates/README.md step 2).
// Usage: node scripts/gate-request.mjs <preview-url> [note]
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const previewUrl = process.argv[2];
const note = process.argv[3] || "";
if (!previewUrl || !previewUrl.startsWith("https://")) {
  console.error("usage: node scripts/gate-request.mjs <preview-url> [note]");
  process.exit(1);
}

const sh = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();
const branch = sh("git rev-parse --abbrev-ref HEAD");
if (!branch.startsWith("ops/")) {
  console.error(`gate requests are for ops/<date>-<slug> branches (on: ${branch})`);
  process.exit(1);
}

const files = sh("git diff --name-only origin/main...HEAD").split("\n").filter(Boolean);
const offenders = files.filter(
  (f) => !f.startsWith("content/") && !f.startsWith("public/"),
);
if (offenders.length) {
  console.error("branch touches non-data files — this cannot ride the site gate:");
  for (const f of offenders) console.error(`  - ${f}`);
  process.exit(1);
}

const slug = branch.replace(/^ops\//, "");
const request = {
  schema: "site-promote-request/v1",
  gate: "site-promote",
  id: slug,
  app: "manifestlab-site",
  branch,
  head: sh("git rev-parse HEAD"),
  preview_url: previewUrl,
  files,
  diff_summary: sh("git diff --stat origin/main...HEAD | tail -1"),
  note,
  requested_at: new Date().toISOString(),
};

const out = path.join(".gates", `${slug}.json`);
fs.mkdirSync(".gates", { recursive: true });
fs.writeFileSync(out, JSON.stringify(request, null, 2) + "\n");
console.log(`gate request written: ${out}`);
