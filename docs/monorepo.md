# Monorepo & Changesets

This repository is being converted to a workspace-based monorepo. Key points:

- Workspace pattern: packages/\*
- Core package: `packages/core` exposes the runtime (`@lumina/core`).
- Building: `npm run build:core` builds the package to `packages/core/dist`.
- Releasing: Changesets is used for managing per-package releases. Use `npm run changeset` to create a changeset and then open a PR. The Changesets release workflow (on main) will publish packages when changesets are merged.

> Note: The previous `semantic-release` workflow remains available but is deprecated; prefer Changesets for per-package releases.

Developer checklist:

1. Add package under `packages/` with `name` and `version` in package.json
2. Add `tsconfig.json` (extend root tsconfig)
3. Add `build` script in the package and test locally using `npm run build:core`
4. Create a changeset with `npm run changeset` describing the change
5. Merge PR to `main` to trigger the release workflow
