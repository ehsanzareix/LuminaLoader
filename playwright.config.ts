import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 5_000,
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
