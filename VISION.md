# OhMyCode Vision

OhMyCode is an open-source, community-focused fork of OpenCode (github.com/anomalyco/opencode). Our vision is to provide a focused, streamlined local AI coding assistant without enterprise overhead, cloud dependencies, or telemetry.

## Fork Philosophy

- **Personal Productivity First**: OhMyCode optimizes for the individual developer.
- **Trimmed and Focused**: We remove features that only serve enterprise deployments (e.g., cloud console, billing, team management).
- **Local Control**: No telemetry, no forced cloud logins, and local-first config parsing.
- **Upstream Compatibility**: We actively pull from upstream OpenCode to inherit their core engine improvements, LLM provider additions, and CLI refinements.

## What Was Kept vs. Removed

### Kept

- The core CLI engine and TUI interface
- All LLM providers and local model support (Ollama, LM Studio)
- Built-in agents, tools, and MCP support
- The desktop app shell

### Removed

- The `console` package (cloud backend and web dashboard)
- Enterprise billing and team management
- Upstream cloud telemetry and waitlist logic
- Non-essential integrations (like Slack plugins targeting enterprise)

## Upstream Sync Strategy

OhMyCode maintains compatibility with the OpenCode `dev` branch. We periodically merge upstream changes directly into our `dev` branch, intentionally maintaining our rebranded identity and removed enterprise packages through `.gitattributes` merge strategies. See `UPSTREAM.md` for our sync process.

## License

OhMyCode is licensed under the MIT License, preserving the open-source spirit of the original project.
