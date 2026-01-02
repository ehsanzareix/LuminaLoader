import { test, expect } from '@playwright/test';

const STORYBOOK_BASE =
  process.env.STORYBOOK_BASE ?? 'http://localhost:6006/react';

test('Spinner visual smoke - capture screenshot', async ({ page }) => {
  const url = `${STORYBOOK_BASE}/iframe.html?id=adapters-react-luminaloader--spinner&args=size:80;speed:1`;
  await page.goto(url, { waitUntil: 'networkidle' });
  // Debug: capture full page screenshot and HTML to inspect why spinner is not visible
  await page.waitForTimeout(500);
  const fs = await import('fs');
  fs.mkdirSync('test-results', { recursive: true });
  const pageShot = await page.screenshot({ fullPage: true });
  fs.writeFileSync('test-results/spinner-page.png', pageShot);
  const html = await page.content();
  fs.writeFileSync('test-results/spinner.html', html);

  // Now try to find the spinner element
  await page.waitForSelector('.lumina-loader > .lumina-spinner-inner', {
    state: 'attached',
    timeout: 3000,
  });
  const spinner = page.locator('.lumina-loader > .lumina-spinner-inner');
  // Save element visibility and bounding box for debugging
  const box = await spinner.boundingBox();
  fs.writeFileSync(
    'test-results/spinner-meta.json',
    JSON.stringify({ visible: await spinner.isVisible(), box }),
  );
  if (box) {
    const buffer = await spinner.screenshot({ animations: 'disabled' });
    fs.writeFileSync('test-results/spinner.png', buffer);
  } else {
    // attach a debug log
    fs.appendFileSync(
      'test-results/spinner.html',
      '\n\n<!-- Spinner bounding box was null -->',
    );
  }
  expect(await spinner.isVisible()).toBe(true);
});
