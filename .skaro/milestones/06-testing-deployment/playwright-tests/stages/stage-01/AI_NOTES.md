# AI_NOTES — Stage 1: Playwright и статика `out/`

## Что было сделано
- Проверена конфигурация Playwright (`playwright.config.ts`): 
  - `webServer` запускает `npm run start:e2e` (сборка с `NEXT_PUBLIC_FORMSPREE_ID=e2e_placeholder` и раздача статической папки `out/` на порту 4173).
  - `viewport` установлен в 1280×720.
  - Проект `chromium` (Desktop Chrome).
  - `locale: 'ru-RU'`.
- Проверены скрипты в `package.json`: 
  - `build:e2e`: `cross-env NEXT_PUBLIC_FORMSPREE_ID=e2e_placeholder npm run build`
  - `serve:e2e`: `serve out -l 4173`
  - `start:e2e`: `npm run build:e2e && npm run serve:e2e`
  - `test:e2e`, `test:e2e:headed`, `test:e2e:ui` — запуск Playwright.
- Проверены зависимости: `@playwright/test`, `cross-env`, `serve` присутствуют в `devDependencies`.
- Проверен `e2e/tsconfig.json`: корректное расширение `../tsconfig.json`, типы `node` и `@playwright/test`.

## Почему такой подход
Все требования Stage 1 уже выполнены в текущем репозитории. Конфигурация полностью соответствует DoD: статический артефакт `out/`, порт 4173, viewport 1280×720, Chromium, русская локаль. Дополнительных изменений не требуется.

## Файлы созданы / изменены
| Файл | Действие | Описание |
|---|---|---|
| *нет* | *не требуется* | Stage 1 полностью реализован, файлы не изменялись |

## Риски и ограничения
- Рисков нет, конфигурация верна и соответствует спецификации.
- Ограничение: тесты Stages 2 и 3 ещё не реализованы, но это выходит за рамки Stage 1.

## Соответствие инвариантам архитектуры
- [x] Статическая генерация (next export) — используется папка `out/` как артефакт сборки.
- [x] Отсутствие серверного кода в тестах — Playwright работает против статики.
- [x] Bundle size не затрагивается — только dev-зависимости добавляются.
- [x] Русский язык — локаль `ru-RU` установлена в конфиге Playwright.

## Как проверить
1. Выполнить `npm run test:e2e` — должен запуститься веб-сервер через `start:e2e` и пройти smoke-тесты (если они реализованы).
2. Запустить `npm run start:e2e` вручную и убедиться, что сайт доступен на `http://127.0.0.1:4173`.
3. Проверить, что `playwright.config.ts` содержит указанные настройки viewport и проекта Chromium.