import { test, expect } from '@playwright/test';
import { validContactForm } from './helpers/formData';
import { mockFormspreeSuccess } from './helpers/mockFormspree';

const successMessage =
  'Заявка отправлена. Мы свяжемся с вами по указанному email.';
const nameError = 'Имя должно содержать не менее 2 символов.';

test.describe('Контактная форма', () => {
  test('пустая форма: клиентская валидация, без запроса к Formspree', async ({
    page,
  }) => {
    let formspreePosts = 0;
    page.on('request', (req) => {
      if (req.method() === 'POST' && req.url().includes('formspree.io')) {
        formspreePosts += 1;
      }
    });

    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Запросить экспресс-диагностику' }).click();

    await expect(page.getByText(nameError)).toBeVisible();
    expect(formspreePosts, 'Не должно быть POST на Formspree при невалидной форме').toBe(0);
  });

  test('успешная отправка с моком Formspree', async ({ page }) => {
    await mockFormspreeSuccess(page);
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    await page.locator('#cta-name').fill(validContactForm.name);
    await page.locator('#cta-email').fill(validContactForm.email);
    await page.locator('#cta-phone').fill(validContactForm.phone);
    await page.locator('#cta-message').fill(validContactForm.message);

    await page.getByRole('button', { name: 'Запросить экспресс-диагностику' }).click();

    await expect(page.getByRole('status')).toContainText(successMessage);
  });
});