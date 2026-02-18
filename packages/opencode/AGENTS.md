# opencode package guide

## OVERVIEW

Core runtime package: CLI, server routes, tool execution, session state, provider integration, and local SQLite persistence.

## STRUCTURE

```text
packages/opencode/
|- bin/opencode              # CLI executable shim
|- src/index.ts              # runtime/bootstrap entry
|- src/server/routes/        # HTTP + stream endpoints
|- src/cli/cmd/              # command implementations (including TUI)
|- src/tool/                 # built-in tool definitions
|- src/session/              # message/session state engine
|- src/**/*.sql.ts           # Drizzle schema declarations (SQLite)
|- migration/<ts>_<name>/    # folder-per-migration SQL + snapshot
`- test/                     # Bun test suite and fixtures
```

## WHERE TO LOOK

- Request/response server behavior: `src/server/server.ts`, `src/server/routes`.
- Tool contract/prompt definitions: `src/tool` and `src/session/prompt`.
- Session lifecycle and status/todos: `src/session`.
- Runtime bootstrap/watching/LSP wiring: `src/project`, `src/lsp`, `src/index.ts`.
- Local DB schema/migration logic: `src/**/*.sql.ts`, `src/storage`, `migration`.

## CONVENTIONS

- Keep code Bun-first (`Bun.file`, Bun subprocess/runtime APIs where suitable).
- Prefer narrow, package-local changes; avoid cross-package abstractions unless reused already.
- Preserve snake_case DB fields and explicit `<entity>_id` columns.
- Keep route/tool behavior strongly typed; avoid widening to `any`.
- Maintain existing script-driven generation flows (`script/build.ts`, schema generation scripts).

## DATABASE

- Schema source: `src/**/*.sql.ts`.
- Drizzle config: `drizzle.config.ts` (`dialect: sqlite`, `out: ./migration`).
- Migration generation command: `bun run db generate --name <slug>`.
- Migration layout is folder-per-migration (`migration/<timestamp>_<slug>/migration.sql` + `snapshot.json`).
- Storage transition tests (json -> sqlite) live under `test/storage` and should keep folder-based migration assumptions.

## ANTI-PATTERNS

- Do not change migration layout to a flat file strategy.
- Do not add root-level test runs; execute tests from this package directory.
- Do not bypass existing session/tool event flow with side channels.

## COMMANDS

```bash
bun --cwd packages/opencode run dev
bun --cwd packages/opencode run typecheck
bun --cwd packages/opencode run test
bun --cwd packages/opencode run build
bun --cwd packages/opencode run db
```
