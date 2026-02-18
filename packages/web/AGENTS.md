# web docs guide

## OVERVIEW

Astro + Starlight docs site with Cloudflare adapter, multilingual content tree, and custom theme integrations.

## WHERE TO LOOK

- Site/global config: `astro.config.mjs`, `config.mjs`.
- Docs content: `src/content/docs`.
- Custom docs components/layout: `src/components`.
- Styling/theme customizations: `src/styles`.

## CONVENTIONS

- Docs routes/content are locale-aware; preserve locale structure under `src/content/docs/*`.
- Build hooks generate schema artifacts via sibling opencode scripts; keep this coupling intact.
- Follow existing Starlight sidebar/content organization before adding new top-level sections.

## ANTI-PATTERNS

- Do not treat this package as a generic SPA build; Astro/Starlight conventions apply.
- Do not move localized docs into flat single-locale structures.

## COMMANDS

```bash
bun --cwd packages/web run dev
bun --cwd packages/web run dev:remote
bun --cwd packages/web run build
bun --cwd packages/web run preview
```
