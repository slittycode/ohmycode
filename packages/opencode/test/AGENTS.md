# opencode test guide

## OVERVIEW

Unit/integration tests for the core runtime. Heavy use of temporary sandboxes and git-backed fixtures.

## WHERE TO LOOK

- Shared fixtures: `test/fixture/fixture.ts`.
- Session-heavy scenarios: `test/session`.
- Tool behaviors: `test/tool`.
- Storage/migration checks: `test/storage`.

## FIXTURE RULES

- Prefer `await using tmp = await tmpdir(...)` for disposable test sandboxes.
- Use `tmpdir({ git: true })` when behavior depends on VCS state.
- Use `tmpdir({ config: ... })` for config-sensitive tests instead of mutating global config.
- Keep custom setup/cleanup in `init` and `dispose` hooks; avoid ad hoc tmp state.

## TEST CONVENTIONS

- Validate concrete behavior, not internal implementation details.
- Avoid mocks unless dependency boundaries force one.
- Keep each test deterministic and sandbox-local.
- Prefer existing helpers over duplicating fixture logic in each file.

## ANTI-PATTERNS

- Do not run this suite from repo root.
- Do not leave temp filesystem/git setup outside `tmpdir` cleanup lifecycle.
- Do not duplicate production logic inside assertions.

## COMMANDS

```bash
bun --cwd packages/opencode run test
bun --cwd packages/opencode run test -- test/storage/json-migration.test.ts
```
