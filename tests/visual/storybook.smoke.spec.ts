import { test, expect } from '@playwright/test';

const HOST = process.env.STORYBOOK_HOST ?? 'http://localhost:6006';
const STORYBOOK_BASE = `${HOST}/react`;
const STORYBOOK_VUE_BASE = `${HOST}/vue`;

test('Storybook index loads', async ({
  page,
}: {
  page: import('@playwright/test').Page;
}) => {
  await page.goto(STORYBOOK_BASE);
  await expect(page).toHaveTitle(/Storybook/);
});

test('React spinner story loads and shows loader', async ({
  page,
}: {
  page: import('@playwright/test').Page;
}) => {
  const url = `${STORYBOOK_BASE}/iframe.html?id=adapters-react-luminaloader--spinner`;
  await page.goto(url);
  await expect(page.locator('.lumina-root')).toBeVisible({ timeout: 5000 });
});

test('Vue spinner story loads and shows loader', async ({
  page,
}: {
  page: import('@playwright/test').Page;
}) => {
  const url = `${STORYBOOK_VUE_BASE}/iframe.html?id=adapters-vue-luminaloader--spinner`;
  await page.goto(url);
  await expect(page.locator('.lumina-root')).toBeVisible({ timeout: 5000 });
});
