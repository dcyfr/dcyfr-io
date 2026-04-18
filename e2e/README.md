# e2e/ — Playwright tests

## Files

- `smoke.spec.ts` — lightweight smoke coverage (existing).
- `snapshots.spec.ts` — visual regression baseline per [`openspec/changes/dcyfr-skeleton-sites-scaffolding/spec.md#51-screenshot-baseline`](../../openspec/changes/dcyfr-skeleton-sites-scaffolding/spec.md) and [`docs/dcyfr-workspace/polish-loop.md`](../../docs/dcyfr-workspace/polish-loop.md).
- `snapshots/` — committed baseline PNGs (generated on first run — see below).

## One-time setup

Playwright browsers aren't installed by `npm install` — they need a separate download:

```bash
npx playwright install chromium
```

We only use chromium for snapshots (cross-browser visual diffs produce pixel noise that isn't signal — identity regressions are the same across browsers, and chromium is canonical for Vercel's runtime).

## First-time baseline capture

Baselines don't exist until someone runs:

```bash
# Against the production site (default BASE_URL)
npm run test:snapshots:update

# Or against a specific Vercel preview
BASE_URL=https://dcyfr-io-<hash>.vercel.app npm run test:snapshots:update
```

This generates `e2e/snapshots.spec.ts-snapshots/*.png`. Commit the PNGs.

## Regular runs

```bash
# Diff current render against committed baseline
npm run test:snapshots
```

Fails if any route's visual diff exceeds `maxDiffPixelRatio: 0.05` (5%).

## Intentional visual change workflow

When an intentional design change lands (e.g. Phase 4 primitive adoption):

1. Merge the change to main
2. Vercel deploys preview
3. `BASE_URL=<preview-url> npm run test:snapshots:update` locally
4. Commit the refreshed PNGs alongside the change (or in a follow-up)
5. Subsequent runs diff against the new baseline

## Coverage

- **Routes:** `/` (home), `/#products` (products anchor) — dcyfr.io is a single-page portal, minimal interior surface
- **Viewports:** `1440×900` (desktop), `375×812` (mobile iPhone-class)
- **Motion:** `prefers-reduced-motion: reduce` emulated + `animations: 'disabled'` on screenshot to avoid pulse/transition flakiness

## Related

- [Polish loop architecture](../../docs/dcyfr-workspace/polish-loop.md) — how snapshots feed into scout trend observations + token-tweak PR proposals
- [`nexus/scout-prompts/dcyfr-io.md`](../../nexus/scout-prompts/dcyfr-io.md) — scout context that reads these baselines for trend-drift detection
