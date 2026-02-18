# desktop package guide

## OVERVIEW

Desktop shell that wraps `@opencode-ai/app` with Tauri plugins, native lifecycle, and update/install flows.

## WHERE TO LOOK

- Desktop web shell bootstrap: `src/index.tsx`.
- Generated command/event bindings: `src/bindings.ts`.
- Desktop-specific UX helpers: `src/menu.ts`, `src/updater.ts`, `src/cli.ts`.
- Native Rust runtime: `src-tauri/src`.

## CONVENTIONS

- Never call raw Tauri `invoke` for core commands; use `src/bindings.ts` APIs.
- Keep desktop-only behavior in this package, not in `packages/app`.
- Preserve split between TS shell (`src`) and Rust command backend (`src-tauri/src`).

## ANTI-PATTERNS

- Do not bypass generated bindings for command/event surfaces.
- Do not treat this package as a generic web app; Tauri constraints apply.

## COMMANDS

```bash
bun --cwd packages/desktop run dev
bun --cwd packages/desktop run typecheck
bun --cwd packages/desktop tauri dev
bun --cwd packages/desktop tauri build
```
