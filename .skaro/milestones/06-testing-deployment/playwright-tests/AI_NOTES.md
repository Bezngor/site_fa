# AI_NOTES: playwright-tests

## Канон относительно шаблона Skaro

- **ID секций** на главной совпадают с [`lib/data/navigation.ts`](../../../../lib/data/navigation.ts): `hero`, `problems`, `how-we-work`, `cases`, `products`, `results`, `about`, `contact`. В раннем spec фигурировали вымышленные `#features`, `#services` и т.д. — их **не** использовать.
- **Статика:** отдельной команды `next export` в проекте нет; `out/` получают командой **`npm run build`** при [`output: 'export'`](../../../../next.config.js).

## Formspree в E2E

- URL запроса: `https://formspree.io/f/{NEXT_PUBLIC_FORMSPREE_ID}` (см. [`lib/utils/formspree.ts`](../../../../lib/utils/formspree.ts)).
- При **пустом** ID форма не вызывает `fetch` на Formspree (mailto-fallback). Для теста успешной отправки сборка для E2E должна вшивать непустой ID — в репозитории это делает **`npm run build:e2e`** / цепочка **`start:e2e`** в `webServer` Playwright.
- Мок: `page.route('**/formspree.io/f/**', …)` → 200 и `{ "ok": true }`.

## Форма и UI-копирайт

- Кнопка submit: **`Запросить экспресс-диагностику`** (`texts.cta.buttonText`), не «Отправить».
- Валидация: имя, email, **телефон (≥10 цифр)**, сообщение (≥10 символов) — см. [`lib/validation/contactFormSchema.ts`](../../../../lib/validation/contactFormSchema.ts).
- Сообщение об успехе: `texts.cta.form.successMessage`, в DOM — `role="status"`.

## Локаль и viewport

- Playwright: `locale: 'ru-RU'`, viewport **1280×720** (десктоп).

## verify.yaml

- Линт: **`npx eslint e2e`** (кроссплатформенно, без shell-glob `**/*.ts`).
