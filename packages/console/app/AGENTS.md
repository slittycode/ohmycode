# console app guide

## OVERVIEW

SolidStart console frontend with route handlers for auth, billing, zen proxying, bench, and workspace management.

## WHERE TO LOOK

- Main route tree: `src/routes`.
- LLM proxy/streaming logic: `src/routes/zen`.
- Billing and checkout handling: `src/routes/stripe`, `src/routes/workspace/[id]/billing`.
- Shared UI components: `src/component`.

## CONVENTIONS

- Keep Cloudflare/Nitro assumptions aligned with `vite.config.ts`.
- Build pipeline includes sitemap + schema generation; do not bypass build script chain.
- Prefer domain access through `@opencode-ai/console-core` instead of local DB wiring in route files.

## ANTI-PATTERNS

- Do not add ad hoc env-sensitive logic outside configured `dev:remote`/SST shell flows.
- Do not duplicate core billing/provider logic in UI routes when `core` already owns it.

## COMMANDS

```bash
bun --cwd packages/console/app run dev
bun --cwd packages/console/app run dev:remote
bun --cwd packages/console/app run typecheck
bun --cwd packages/console/app run build
```
