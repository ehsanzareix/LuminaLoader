import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 15_000 },
  retries: process.env.CI ? 2 : 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10_000,
    navigationTimeout: 60_000,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    // Build and start both React (6006) and Vue (6007) static storybooks so tests can run against each.
    command:
      'npm run build-storybook && npm run build-storybook:vue && node ./scripts/serve-combined.js',
    port: 6006,
    timeout: 120_000,
    reuseExistingServer: true,
  },
});
