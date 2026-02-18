# enterprise package guide

## OVERVIEW

Enterprise-facing web/service package with Vite frontend plus Cloudflare-targeted build path and share/session routes.

## WHERE TO LOOK

- App routes: `src/routes`.
- Shared enterprise domain modules: `src/core`.
- Build/deploy scripts and targets: `package.json`, `vite.config.ts`.

## CONVENTIONS

- Keep Cloudflare deployment path (`build:cloudflare`) compatible with standard build flow.
- Reuse shared SDK/core modules where already established; avoid diverging enterprise-only primitives.

## ANTI-PATTERNS

- Do not hardwire local-only assumptions into cloudflare-targeted code paths.
- Do not duplicate core logic already owned by shared packages.

## COMMANDS

```bash
bun --cwd packages/enterprise run dev
bun --cwd packages/enterprise run typecheck
bun --cwd packages/enterprise run build
bun --cwd packages/enterprise run build:cloudflare
```
