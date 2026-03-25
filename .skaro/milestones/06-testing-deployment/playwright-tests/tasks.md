# Tasks: Playwright smoke-тесты

## Stage 1

- [x] Зависимости: `@playwright/test`, `cross-env`, `serve` → `package.json`
- [x] `playwright.config.ts` — `testDir: e2e`, webServer `start:e2e`, locale `ru-RU`, viewport 1280×720
- [x] `e2e/tsconfig.json` + `exclude` для отдельной проверки типов
- [x] Скрипты `build:e2e`, `serve:e2e`, `start:e2e`, `test:e2e*`
- [x] Корневой `tsconfig.json`: `exclude` включает `e2e` (чтобы Next не тащил тесты)

## Stage 2

- [x] `e2e/helpers/selectors.ts` — массив ID секций
- [x] `e2e/sections.spec.ts` — видимость восьми секций

## Stage 3

- [x] `e2e/helpers/mockFormspree.ts`
- [x] `e2e/helpers/formData.ts`
- [x] `e2e/contact-form.spec.ts` — валидация + успех

## Stage 4

- [x] `e2e/README.md`, корневой `README.md`
- [x] `AI_NOTES.md` в milestone
- [x] `spec.md`, `plan.md`, `tasks.md`, `clarifications.md`, `verify.yaml`
- [x] `.github/workflows/playwright.yml` (пример CI)
