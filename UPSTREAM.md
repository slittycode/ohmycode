# Upstream Sync Strategy

OhMyCode is a fork of OpenCode. We pull new features, bug fixes, and provider additions from the upstream `dev` branch while maintaining our unique identity and trimmed structure.

## Overview

We use specific Git merge strategies (`merge=ours` via `.gitattributes`) to prevent upstream changes from overwriting OhMyCode's branding, configuration files, and removed packages.

## How to Sync from Upstream

1. Ensure the upstream remote is configured:

   ```bash
   git remote add origin https://github.com/anomalyco/opencode.git
   git fetch origin
   ```

2. Checkout the local `dev` branch:

   ```bash
   git checkout dev
   ```

3. Merge upstream `dev` changes:

   ```bash
   git merge origin/dev --no-edit
   ```

4. Resolve any conflicts. Because of our `.gitattributes`, files like `README.md`, `package.json`, and `CONTRIBUTING.md` will automatically favor our versions during standard merges natively.

5. After resolving, verify the build:

   ```bash
   bun turbo typecheck
   bun --cwd packages/opencode test
   ```

6. Commit the merge and push.

## Protected Files

The following files are configured in `.gitattributes` to always prefer OhMyCode's contents:

- All Readme files (`README.md`, `README.*.md`)
- `CONTRIBUTING.md`
- `SECURITY.md`
- `AGENTS.md`
- `CHANGELOG.md`
- `package.json` (Root)
- `VISION.md` and `UPSTREAM.md`

Packages deleted in OhMyCode (e.g., `packages/console`) might reappear if upstream heavily modified them. These should be deleted again if they do.
