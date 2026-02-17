# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning.

## [Unreleased]

### Added

- Added staged implementation tracking in docs (`packages/docs/implementation-plan.mdx`).
- Added provider response cache integration coverage and retry integration coverage.
- Added pre-commit lint hook (`.husky/pre-commit`).
- Added package `.env.example` templates for env-backed packages.
- Added bundle report generation to CLI build output (`packages/opencode/dist/bundle-report.json`).
- Added global readiness endpoint (`/global/ready`) and richer health payload (`/global/health`).

### Changed

- Migrated Drizzle dependencies from beta tags to stable release lines.
- Reworked SQLite migration application to preserve folder-based migrations and apply only pending migrations.
- Switched bundled provider loading to lazy dynamic imports.
- Added provider request retry policy support and request deduplication/caching behavior.
- Standardized server error status mapping and request correlation logging.

### Documentation

- Updated `CONTRIBUTING.md` with server health/readiness checks and a release-readiness command checklist.
- Added implementation roadmap and stage completion logs to project docs.
