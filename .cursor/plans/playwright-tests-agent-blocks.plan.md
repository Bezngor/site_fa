---
name: Playwright-tests (блоки агентов)
overview: AG-PW-01…04 выполнены и ревью пройдено; milestone playwright-tests и devplan синхронизированы с кодом.
todos:
  - id: pw-01-tooling-config
    content: "AG-PW-01: Playwright, playwright.config, webServer+build с NEXT_PUBLIC_FORMSPREE_ID, скрипты, e2e/tsconfig"
    status: completed
  - id: pw-02-sections-smoke
    content: "AG-PW-02: e2e/helpers/selectors.ts + sections.spec.ts — 8 ID из navigation/секций, toBeVisible, русские assert"
    status: completed
  - id: pw-03-contact-form
    content: "AG-PW-03: mock Formspree, formData, contact-form.spec.ts — валидация пустых полей и успех по successMessage"
    status: completed
  - id: pw-04-docs-skaro-verify
    content: "AG-PW-04: e2e/README, README, AI_NOTES, синхронизация Skaro + verify + опционально CI; devplan done"
    status: completed
isProject: true
---

# playwright-tests: блоки агентов и журнал ревью

## Источники

- Milestone: [.skaro/milestones/06-testing-deployment/playwright-tests/](../../.skaro/milestones/06-testing-deployment/playwright-tests/)
- Код: [playwright.config.ts](../../playwright.config.ts), [e2e/](../../e2e/), [package.json](../../package.json)

## Журнал ревью


| Блок     | Статус | Заметки                                                                                                                                                                                                             |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AG-PW-01 | готово | `webServer` → `start:e2e`, placeholder Formspree в `build:e2e`, Chromium + viewport 1280×720, `locale: ru-RU`. В `e2e/tsconfig.json` добавлено `incremental: false`, удалён лишний `tsconfig.tsbuildinfo` в `e2e/`. |
| AG-PW-02 | готово | `SECTION_IDS` совпадает с [lib/data/navigation.ts](../../lib/data/navigation.ts); восемь тестов с `toBeVisible()` и русскими сообщениями assert.                                                                    |
| AG-PW-03 | готово | Мок `**/formspree.io/f/**`, кнопка «Запросить экспресс-диагностику», счётчик POST=0 на пустой форме, успех через `role="status"`.                                                                                   |
| AG-PW-04 | готово | README, AI_NOTES, Skaro spec/plan/tasks/clarifications/verify, workflow CI; [devplan](../../.skaro/devplan.md): `playwright-tests` → done.                                                                          |


## Проверка (2026-03-25)

- `npm run test:e2e` — 10 passed.

**Следующий шаг по devplan:** [vercel-deploy-config](../../.skaro/devplan.md) (задача после `playwright-tests`).