# Visual testing (Playwright)

This project uses Playwright for visual smoke tests against the built Storybook.

Quick steps to run locally:

1. Install dependencies and Playwright browsers:

```bash
npm ci
npx playwright install
```

2. Build Storybook (or run Storybook locally):

```bash
npm run build-storybook     # builds React storybook
npm run build-storybook:vue # builds Vue storybook
```

3. Run the visual tests:

```bash
npm run test:visual
```

Notes & troubleshooting:

- To debug in headed mode: run Playwright with `--headed` and `--debug` or start Storybook (`npm run storybook`) and point Playwright to the local URL.
- Artifacts (screenshots/traces) are stored in `test-results/` by default; check this folder after failures.
- If tests fail due to timeouts, increase Playwright timeouts in `playwright.config.ts` or run a single test with `npx playwright test tests/visual/<test-file> -g "pattern" --headed`.
- If Playwright browsers are missing, run `npx playwright install`.

If anything is unclear, open an issue or ask for help in a pull request description.
