import { test, expect } from '@playwright/test';
import { SECTION_IDS } from './helpers/selectors';

test.describe('Секции главной', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const id of SECTION_IDS) {
    test(`секция #${id} видна на странице`, async ({ page }) => {
      const section = page.locator(`#${id}`);
      await expect(section, `Ожидалась видимая секция с id="${id}"`).toBeVisible();
    });
  }
});
