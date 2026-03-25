# Спецификация: vercel-deploy-config

## Контекст

Настройка автоматического деплоя статического сайта (SSG / `output: 'export'`) на Vercel с базовыми заголовками безопасности и согласованной маршрутизацией.

## User Scenarios

1. **Разработчик**: `git push` в `main` или открытие Pull Request → автоматическая сборка и деплой на Vercel (Production или Preview).

## Functional Requirements

- **FR-01: Конфигурация Vercel**: в корне репозитория `vercel.json` с `cleanUrls: true`.
- **FR-02: Инструкции**: в `README.md` — пошаговое подключение репозитория к Vercel, `out`, переменные окружения (см. `.env.example`).
- **FR-03: Безопасность**: в `vercel.json` блок `headers` с минимум:
  - `Content-Security-Policy` (CSP), согласованный со статическим бандлом Next и отправкой формы на Formspree;
  - `X-Frame-Options: DENY`;
  - `X-Content-Type-Options: nosniff`;
  - `Referrer-Policy: strict-origin-when-cross-origin`.
- **FR-04: Сборка**: `npm run build` / `next build`; в `next.config.js` — `output: 'export'`.
- **FR-05: Ссылки**: `trailingSlash: true` в `next.config.js` для структуры экспорта с каталогами `*/index.html` (в т.ч. `404/`).

## Non-Functional Requirements

- **NFR-01: Preview на PR** — по настройкам Git-интеграции Vercel (см. ADR-004).
- **NFR-02: CDN** — стандартная сеть Vercel для статики.
- **NFR-03: Статика** — без Node runtime на запросы (только статические файлы из `out/`).

## Boundaries (что НЕ включено)

- Аналитика (GA, Метрика) в конфиге деплоя.
- Serverless Functions при `output: 'export'`.

## Acceptance Criteria

- [ ] В корне есть валидный `vercel.json` (`cleanUrls`, `headers`); проверка: `npm run validate:vercel`.
- [ ] `next.config.js`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized`; проверка: `npm run validate:vercel`.
- [ ] После `npm run build` существуют `out/index.html` и `out/404/index.html`; проверка: `npm run check:out`.
- [ ] **Заголовки безопасности из `vercel.json`** видны только на окружениях Vercel (Preview / Production) или при `npx vercel dev`. Раздача `out/` через `serve` **не** применяет эти заголовки — проверка вручную: DevTools или `curl -I <url деплоя>`.
- [ ] Главная страница сайта — одна (`/`); контакт — секция с якорём `#contact`, отдельного маршрута `/contact` нет. Smoke UI по-прежнему: `npm run test:e2e` (milestone `playwright-tests`).
- [ ] Сборка на Vercel с Output Directory `out` завершается успешно (лог Next со статическими маршрутами).

## Open Questions

- **Домен**: только `*.vercel.app` или свой домен (DNS) — по релизу.

---

Подробности реализации и ограничения CSP: **`AI_NOTES.md`** в этой папке.
