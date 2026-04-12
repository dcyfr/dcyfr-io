# AGENTS.md - dcyfr-io

## Project Overview

`dcyfr.io` is a Next.js 15 / React 19 control-center app for the DCYFR product ecosystem.

## Architecture

- App Router pages: `app/`
- Shared UI: `components/`
- Shared logic: `lib/`
- End-to-end tests: `e2e/`

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test:e2e
```

## Working Rules

- Keep portal navigation and product-linking behavior coherent across the app.
- Validate route or UI changes with `typecheck` and relevant E2E coverage when feasible.
