# content/ — the data layer agents edit

Marketing/ops agents edit **only** files in this directory (plus `public/` assets).
Components under `src/` are development-session territory (WEBSITE-MIGRATION-PLAN §3).
Changes ship through the `.gates/` site-promote flow (see `.gates/README.md`) — branch,
preview deploy, owner approval, merge.

## Files

- `apps/<slug>.json` — one per app page (`app-page/v1`). `/​<slug>` renders entirely from
  this file. `published: false` keeps a file's page unbuilt (prepare Argo this way).
- `site.json` — umbrella config (`site/v1`): company line, support email, ESP form
  config (`esp.enabled` flips the newsletter form on), press-kit data.
- `redirects.json` — the `/go/<token>` map. Token scheme, `ct=` rules, and lint
  invariants: SPEC-attribution-spine. `npm run lint:redirects` runs automatically
  before every build and fails the build on violations.

## app-page/v1 shape (add Argo by copying riff.json and editing)

Required: `schema`, `slug` (must equal filename), `published`, `name`, `tagline`,
`category`, `metaTitle`, `metaDescription`, `icon {viewBox, path}` (inline SVG path),
`features [{title, description}]`, `store {state: "coming-soon"|"live", appStoreUrl,
appleId, providerToken}`, `links [{label, href}]`, `newsletterTag`, `newsletterPrompt`.

## Hard rules

1. **URL-stability invariant (WEBSITE-MIGRATION-PLAN §3.1):** while Riff 1.0(3) is in
   App Review, `/riff/{privacy,support,terms}`, `/riff/`, the apex, and
   `/steadfast/{privacy,support}` must return 200 at identical paths. Never rename a
   slug; never turn `published` off for a live app.
2. `/riff/privacy` and `/riff/terms` **wording is frozen** until the review verdict —
   those pages are code, not data, on purpose.
3. `redirects.json`: `ct=` must equal the token key; `apps.apple.com` destinations
   must carry `pt=` and `mt=8`; tokens ≤30 chars, lowercase-hyphenated; never re-point
   a token to a different campaign (mint a new one).
