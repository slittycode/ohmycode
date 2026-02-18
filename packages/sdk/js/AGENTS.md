# sdk js guide

## OVERVIEW

Published JavaScript SDK package with generated API clients and helper wrappers for local server/client flows.

## WHERE TO LOOK

- Public exports and entrypoints: `src/index.ts`, `src/client.ts`, `src/server.ts`.
- V2 surfaces: `src/v2/*`.
- Build and generation pipeline: `script/build.ts`.

## CONVENTIONS

- Regenerate artifacts via build script; do not hand-edit generated client output in `dist`.
- Keep export map in `package.json` synchronized with `src` entry files.
- Preserve v1/v2 surface parity where both APIs are intentionally exposed.

## ANTI-PATTERNS

- Do not modify `dist` directly.
- Do not introduce package-specific runtime assumptions that break external consumers.

## COMMANDS

```bash
bun --cwd packages/sdk/js run typecheck
bun --cwd packages/sdk/js run build
```
