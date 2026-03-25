import type { Page } from '@playwright/test';

/** Перехватывает POST на Formspree и отвечает как успешная отправка (без реального API). */
export async function mockFormspreeSuccess(page: Page): Promise<void> {
  await page.route('**/formspree.io/f/**', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });
}