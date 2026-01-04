# Contributing to LuminaLoader ✅

Thank you for contributing! We welcome bug reports, feature ideas, and pull requests. This document explains how to get set up, the expected workflow, and how releases are produced.

---

## Getting started

1. Fork the repository and create a branch from `main` with a descriptive name: `feat/`, `fix/`, or `chore/` (e.g., `feat/add-spinner`).
2. Install dependencies: `npm ci`.
3. Run tests locally: `npm test` (or `npm run test`).
4. Build locally: `npm run build`.

> Tip: Storybook and Playwright visual tests are available in CI. To run Storybook locally: `npm run storybook`.

---

## Making changes

- Keep PRs focused and small where possible.
- Update or add tests (Vitest) for bugs and features.
- Run `npm run lint` and address warnings/errors.
- If you change public behavior, add or update README examples and the package-level `CHANGELOG.md` as needed.

---

## Versioning & Releases

We use Changesets to manage versioning and changelogs:

- Add a changeset for user-facing changes: `npx changeset` or `npx changeset add`.
- Choose the correct bump (patch/minor/major) and write a short summary.
- Commit the changeset file with your PR. When merged to `main`, the release workflow will create release PRs and/or publish packages automatically.

If you are a maintainer and need to publish manually, we use a release workflow that:

- Runs `npm ci`, disables commit hooks, and uses Changesets.
- Publishes packages to npm (custom publish step) and creates a GitHub repo-level release with aggregated notes.

---

## PR checklist

- [ ] Branch from `main` and target `main` in your PR
- [ ] Include tests or update existing tests
- [ ] Add or update documentation/README examples
- [ ] Add a changeset for public changes
- [ ] All CI checks pass (build, test, Storybook, visual tests)

---

## Need help?

Open an issue describing the problem or feature you'd like help with — include steps to reproduce, expected behavior, and environment details.

Thanks for improving LuminaLoader — we appreciate your time and contributions! 🙏
