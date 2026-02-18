# desktop tauri guide

## OVERVIEW

Rust/Tauri native runtime for desktop shell: commands, events, window lifecycle, sidecar management, and plugin wiring.

## WHERE TO LOOK

- App bootstrap/plugins/command registry: `src/lib.rs`.
- CLI install/sync and sidecar paths: `src/cli.rs`.
- Window and platform behavior: `src/windows.rs`, `src/linux_display.rs`.
- Server URL persistence and connectivity: `src/server.rs`.

## CONVENTIONS

- Keep command/event interfaces aligned with generated TS bindings in `packages/desktop/src/bindings.ts`.
- Preserve Tauri plugin setup order and feature gating in `src/lib.rs`.
- Respect platform-specific dependency blocks in `Cargo.toml`.

## ANTI-PATTERNS

- Do not apply TypeScript package conventions to Rust code organization.
- Do not change Tauri patch pins in `Cargo.toml` without explicit compatibility validation.
- Do not remove the Windows console guard comment in `src/main.rs`.

## COMMANDS

```bash
bun --cwd packages/desktop tauri dev
bun --cwd packages/desktop tauri build
```
