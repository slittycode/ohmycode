# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-18 18:15 Pacific/Auckland
**Commit:** 0ff47c720
**Branch:** feat/ohmycode-fork-rebrand

## OVERVIEW

Monorepo for OhMyCode: core CLI/runtime, web apps, desktop app, docs site, SDKs, and integrations. Primary stack is Bun + TypeScript with targeted Rust (Tauri desktop) and Nix build tooling.

## STRUCTURE

```text
ohmycode/
|- packages/opencode/        # core agent runtime, CLI, LSP/tooling server
|- packages/app/             # end-user web UI
|- packages/desktop/         # desktop shell + app integration
|- packages/console/         # cloud console split into app/core/function/mail/resource
|- packages/web/             # docs site (Astro + Starlight)
|- packages/sdk/js/          # published JS SDK and OpenAPI generation
|- sdks/vscode/              # VS Code extension
|- github/                   # GitHub action package
`- nix/                      # Nix derivations for reproducible builds
```

## WHERE TO LOOK

| Task                               | Location                                                               | Notes                                                        |
| ---------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| Core CLI behavior, tools, prompts  | `packages/opencode/src`                                                | Includes tool implementations, session engine, server routes |
| App UI/session UX                  | `packages/app/src/pages/session`                                       | Largest UI hotspot with tests colocated                      |
| Desktop runtime behavior           | `packages/desktop/src` and `packages/desktop/src-tauri/src`            | TS shell + Rust commands/events                              |
| Cloud console APIs and billing     | `packages/console/app/src/routes` and `packages/console/core/src`      | SolidStart routes + Drizzle MySQL domain                     |
| DB schema and migrations (local)   | `packages/opencode/src/**/*.sql.ts`, `packages/opencode/migration`     | SQLite + folder-per-migration layout                         |
| DB schema and migrations (console) | `packages/console/core/src/schema`, `packages/console/core/migrations` | MySQL + Drizzle meta snapshots                               |
| E2E patterns                       | `packages/app/e2e`                                                     | Playwright with custom fixtures/helpers                      |
| SDK generation                     | `packages/sdk/js/script/build.ts`                                      | Canonical SDK regeneration entrypoint                        |

## CODE MAP

LSP workspace symbol enumeration timed out in this environment; use this practical map instead.

| Domain      | Key Entrypoints                                                                 | Role                                             |
| ----------- | ------------------------------------------------------------------------------- | ------------------------------------------------ |
| CLI         | `packages/opencode/bin/opencode`, `packages/opencode/src/index.ts`              | Main executable and runtime bootstrap            |
| Core server | `packages/opencode/src/server/server.ts`, `packages/opencode/src/server/routes` | API, streams, protocol endpoints                 |
| App         | `packages/app/src/index.ts`, `packages/app/src/pages`                           | Web UI bootstrap and route/page features         |
| Desktop     | `packages/desktop/src/index.tsx`, `packages/desktop/src-tauri/src/lib.rs`       | Desktop UI shell and native command/event layer  |
| Docs        | `packages/web/astro.config.mjs`, `packages/web/src/content/docs`                | Astro/Starlight docs build and content           |
| Extension   | `sdks/vscode/src/extension.ts`                                                  | VS Code command registration and terminal wiring |

## CONVENTIONS

- Default branch is `dev`; for diffs use `dev` or `origin/dev` (local `main` may not exist).
- Always prefer parallel tool calls when requests are independent.
- Prefer Bun-native APIs and Bun scripts over adding Node-only wrappers.
- Keep implementation local unless reuse is clear; avoid speculative abstractions.
- Favor single-word identifiers when clarity is preserved.
- Prefer `const`, early returns, ternaries, and functional array operators over mutable control flow.
- Avoid unnecessary destructuring; keep object context with dot access.
- Prefer type inference; avoid `any` and unnecessary explicit interface/type noise.
- Drizzle schema naming uses snake_case fields and explicit `<entity>_id` join columns.

## ANTI-PATTERNS (THIS PROJECT)

- Never run tests from repo root (`bun test` is intentionally blocked there).
- Never commit/push automatically unless explicitly requested by user.
- Never use destructive git commands unless explicitly requested.
- In `packages/app`, never restart app/server processes from automation.
- In `packages/desktop`, never call raw Tauri `invoke` manually for core commands; use generated bindings.

## UNIQUE STYLES

- Mixed runtime model: Bun-first monorepo with selective Rust/Tauri and Cloudflare targets.
- `packages/console` is intentionally sub-workspaced (`packages/console/*`) with separate ownership boundaries.
- Migration layouts differ by domain: opencode uses folder-per-migration; console/core uses drizzle sql + `meta` snapshots.

## COMMANDS

```bash
# workspace-wide
bun turbo typecheck
bun turbo lint

# core runtime
bun --cwd packages/opencode run dev
bun --cwd packages/opencode run test

# app + e2e
bun --cwd packages/app run dev
bun --cwd packages/app run test:unit
bun --cwd packages/app run test:e2e:local

# desktop
bun --cwd packages/desktop tauri dev
bun --cwd packages/desktop tauri build

# console
bun --cwd packages/console/app run dev
bun --cwd packages/console/core run shell-dev

# sdk
./packages/sdk/js/script/build.ts
```

## NOTES

- `.github/workflows/test.yml` runs `bun turbo test` and package-specific e2e setup in CI.
- Publish pipeline includes custom tauri/AppImage handling and signing steps; do not assume local parity.
