# app package guide

## OVERVIEW

SolidJS web client for sessions, layout/sidebar workflows, prompt input, and in-browser terminal UX.

## WHERE TO LOOK

- Route/page composition: `src/pages`.
- Session UX hotspot: `src/pages/session`.
- Shared UI building blocks: `src/components`.
- Cross-page state and sync: `src/context`.
- Helpers/utilities: `src/utils`.

## LOCAL DEV

- `opencode dev web` proxies production and will not reflect local UI/CSS edits.
- For local UI work run backend and app separately:
  - backend (`packages/opencode`): `bun run --conditions=browser ./src/index.ts serve --port 4096`
  - app (`packages/app`): `bun dev -- --port 4444`
- Verify at `http://localhost:4444`.

## CONVENTIONS

- Prefer `createStore` over many independent `createSignal` values.
- Keep session behavior near `src/pages/session` unless clearly reusable.
- Follow existing data attributes and semantic selectors used by e2e tests.

## ANTI-PATTERNS

- Never restart app/server processes from automation.
- Do not move session-specific logic into broad global abstractions without reuse proof.

## COMMANDS

```bash
bun --cwd packages/app run dev
bun --cwd packages/app run typecheck
bun --cwd packages/app run test:unit
bun --cwd packages/app run test:e2e:local
```
