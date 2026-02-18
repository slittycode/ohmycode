# console core guide

## OVERVIEW

Console backend domain package: Drizzle MySQL schema, billing/account/workspace logic, model metadata and operational scripts.

## WHERE TO LOOK

- DB adapter + shared query exports: `src/drizzle`.
- Schema modules: `src/schema/*.sql.ts`.
- Domain services: `src/billing.ts`, `src/user.ts`, `src/workspace.ts`, `src/key.ts`.
- Migrations: `migrations` and `migrations/meta`.

## DATABASE CONVENTIONS

- Drizzle config is MySQL (`drizzle.config.ts`) with SST `Resource.Database` credentials.
- Schema path: `./src/**/*.sql.ts`.
- Migration output path: `./migrations/` with meta snapshots.
- Keep schema/table naming and join conventions consistent with existing files.

## OPERATIONS

- Use `sst shell` wrapped scripts for DB/model operations.
- Keep stage-aware scripts (`*-dev`, `*-prod`) aligned with existing naming.

## ANTI-PATTERNS

- Do not copy opencode SQLite migration assumptions into this package.
- Do not hardcode credentials outside existing `Resource.Database` wiring.

## COMMANDS

```bash
bun --cwd packages/console/core run typecheck
bun --cwd packages/console/core run db
bun --cwd packages/console/core run db-dev
bun --cwd packages/console/core run shell-dev
```
