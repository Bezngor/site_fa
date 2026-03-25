# План реализации: Playwright smoke-тесты

Статус: реализовано в репозитории; текст ниже отражает факт.

## Stage 1: Playwright и статика `out/`

**Выход:** `@playwright/test`, `cross-env`, `serve`, [`playwright.config.ts`](../../../../playwright.config.ts), [`e2e/tsconfig.json`](../../../../e2e/tsconfig.json), скрипты в [`package.json`](../../../../package.json): `build:e2e`, `serve:e2e`, `start:e2e`, `test:e2e`, `test:e2e:headed`, `test:e2e:ui`.

**DoD:** webServer запускает `npm run start:e2e` (сборка с `NEXT_PUBLIC_FORMSPREE_ID=e2e_placeholder` + раздача `out/` на порту 4173); viewport 1280×720; Chromium.

## Stage 2: Секции

**Выход:** [`e2e/helpers/selectors.ts`](../../../../e2e/helpers/selectors.ts), [`e2e/sections.spec.ts`](../../../../e2e/sections.spec.ts).

**DoD:** восемь `id` как в навигации; assert с русскими сообщениями; `toBeVisible()`.

## Stage 3: Форма

**Выход:** [`e2e/helpers/mockFormspree.ts`](../../../../e2e/helpers/mockFormspree.ts), [`e2e/helpers/formData.ts`](../../../../e2e/helpers/formData.ts), [`e2e/contact-form.spec.ts`](../../../../e2e/contact-form.spec.ts).

**DoD:** мок POST Formspree; валидация пустой формы; успех по тексту из копирайта; кнопка **«Запросить экспресс-диагностику»**; валидный телефон (≥10 цифр) и сообщение (≥10 символов).

## Stage 4: Документация и verify

**Выход:** [`e2e/README.md`](../../../../e2e/README.md), [`README.md`](../../../../README.md), `AI_NOTES.md`, обновлённые Skaro-файлы, [`verify.yaml`](verify.yaml), опционально [`.github/workflows/playwright.yml`](../../../../.github/workflows/playwright.yml).

## Verify

См. [`verify.yaml`](verify.yaml).
