# vscode sdk guide

## OVERVIEW

VS Code extension package that launches/interacts with the OhMyCode CLI terminal workflow inside editor contexts.

## WHERE TO LOOK

- Extension activation and commands: `src/extension.ts`.
- Build bundle path config: `esbuild.js`.
- Extension manifest and command registration: `package.json`.

## CONVENTIONS

- Develop this package from `sdks/vscode` directory (not repo root VS Code workspace).
- Keep command IDs/keybindings in `package.json` aligned with `src/extension.ts`.
- Maintain compile/lint/typecheck/test script chain used by `vscode:prepublish`.

## ANTI-PATTERNS

- Do not bypass compile/lint checks during packaging.
- Do not change extension command IDs without updating contributed menus/keybindings.

## COMMANDS

```bash
bun --cwd sdks/vscode run check-types
bun --cwd sdks/vscode run lint
bun --cwd sdks/vscode run compile
bun --cwd sdks/vscode run test
```
