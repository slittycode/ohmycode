# console package cluster guide

## OVERVIEW

Cloud console domain split into five packages with separate ownership and runtime roles.

## STRUCTURE

```text
packages/console/
|- app/       # SolidStart UI and route handlers
|- core/      # DB/business domain (Drizzle + SST resources)
|- function/  # function-layer logic
|- mail/      # email templates and delivery helpers
`- resource/  # infra/resource integration layer
```

## WHERE TO LOOK

- UI routes and API handlers: `app/src/routes`.
- Billing/auth/domain logic: `core/src`.
- DB schemas/migrations: `core/src/schema`, `core/migrations`.
- Function adapter code: `function/src`.
- Email template logic: `mail/emails`.

## CONVENTIONS

- Keep cross-package domain types/functions in `core`, not duplicated in `app`.
- Treat each subpackage as independently runnable/configured.
- Preserve existing `sst shell` workflows for environment-backed commands.

## ANTI-PATTERNS

- Do not collapse console subpackages into a single package-level abstraction.
- Do not mix app UI concerns directly into `core` DB modules.
