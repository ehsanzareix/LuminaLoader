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

  // Now try to find the spinner element (accept either class name). Storybook may serve manager or iframe.
  // Use frameLocator to query inside the preview iframe when present.
  const selector =
    '.lumina-loader > .lumina-spinner-inner, .lumina-loader > .lumina-spinner';

  // If Storybook served the manager page, use the preview iframe.
  let spinnerLocator = page.locator(selector).first();
  if ((await page.$('#storybook-preview-iframe')) !== null) {
    const frameLocator = page.frameLocator('#storybook-preview-iframe');
    spinnerLocator = frameLocator.locator(selector).first();
  }

  // Wait longer to account for animations and slow environments.
  await spinnerLocator.waitFor({ state: 'visible', timeout: 15000 });

  // Save element visibility and bounding box for debugging
  const box = await spinnerLocator.boundingBox();
  const frames = page.frames().map((f) => ({ url: f.url(), name: f.name() }));
  fs.writeFileSync(
    'test-results/spinner-meta.json',
    JSON.stringify(
      {
        url: page.url(),
        frames,
        visible: await spinnerLocator.isVisible(),
        box,
      },
      null,
      2,
    ),
  );
  if (box) {
    const buffer = await spinnerLocator.screenshot({ animations: 'disabled' });
    fs.writeFileSync('test-results/spinner.png', buffer);
  } else {
    // attach a debug log
    fs.appendFileSync(
      'test-results/spinner.html',
      '\n\n<!-- Spinner bounding box was null -->',
    );
  }
  expect(await spinnerLocator.isVisible()).toBe(true);
});
