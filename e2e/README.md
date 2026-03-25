# E2E-тесты (Playwright)

Тесты гоняются против **статической сборки** Next.js (`output: 'export'` → каталог `out/`).

## Предварительные требования

- Node.js и зависимости проекта: `npm install`
- Браузер Chromium для Playwright:

```bash
npx playwright install chromium
```

На Linux в CI часто используют:

```bash
npx playwright install --with-deps chromium
```

## Переменная `NEXT_PUBLIC_FORMSPREE_ID`

Клиентский бандл подставляет ID формы **на этапе сборки**. Если ID пустой, форма уходит в `mailto` и **не** вызывает Formspree — сценарий «успешная отправка» в E2E не сработает.

Скрипт **`npm run build:e2e`** задаёт placeholder и вызывает `npm run build`. Команда **`npm run test:e2e`** поднимает `webServer`, который выполняет **`npm run start:e2e`** (сборка с тем же placeholder + раздача `out/` на `http://127.0.0.1:4173`).

Для ручной отладки можно выставить свой ID в `.env.local` и собрать проект перед прогоном тестов.

## Команды

| Команда | Назначение |
|--------|------------|
| `npm run test:e2e` | Headless, перед стартом — полная сборка и `serve` (см. `playwright.config.ts`) |
| `npm run test:e2e:headed` | То же с видимым браузером |
| `npm run test:e2e:ui` | Playwright UI mode |
| `npm run build:e2e` | Только сборка с `NEXT_PUBLIC_FORMSPREE_ID=e2e_placeholder` |
| `npx tsc --noEmit -p e2e/tsconfig.json` | Проверка типов тестов |
| `npx eslint e2e` | Линт каталога `e2e` |

## CI

Пример workflow: [`.github/workflows/playwright.yml`](../.github/workflows/playwright.yml) — установка Chromium, `npm ci`, `npm run test:e2e`.
