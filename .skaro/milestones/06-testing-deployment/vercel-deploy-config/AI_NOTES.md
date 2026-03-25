# vercel-deploy-config — фактическое состояние (2026-03-25)

## Код и конфигурация

- **`next.config.js`**: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`, `eslint.ignoreDuringBuilds`.
- **`vercel.json`**: `cleanUrls: true`; `headers` с `source: "/:path*"` — CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `X-XSS-Protection`.
- **Сайт**: одностраничный лендинг (`app/page.tsx`), контакт — секция `id="contact"`, отдельного роута `/contact` нет.
- **Форма**: `fetch` JSON на `https://formspree.io/f/{NEXT_PUBLIC_FORMSPREE_ID}` — в CSP нужны `connect-src` и `form-action` для `formspree.io`.

## CSP и `'unsafe-inline'`

Статический экспорт Next 15 оставляет в HTML инлайн-скрипты (гидратация) и инлайн-стили у `next/image`. В продакшене без `'unsafe-inline'` в `script-src` / `style-src` страница ломается. Ужесточение — только вместе с nonce/hashes и доработкой сборки. Подробнее: `README.md`, раздел «CSP и unsafe-inline».

## Где проверять заголовки

Заголовки из `vercel.json` применяет платформа Vercel (или `npx vercel dev`). Локальная раздача `out/` через `serve` **не** дублирует эти заголовки — для приёмки AC используйте Preview/Production URL и `curl -I` / DevTools.

## Скрипты

| Скрипт | Назначение |
|--------|------------|
| `npm run validate:vercel` | Разбор `vercel.json` + текстовые проверки `next.config.js` |
| `npm run check:out` | После `npm run build`: есть `out/index.html` и `out/404/index.html` |

## ADR

Деплой и Git/Preview: [.skaro/architecture/adr-004-деплой-на-vercel-с-использованием-next-export-для-.md](../../../architecture/adr-004-деплой-на-vercel-с-использованием-next-export-для-.md).

## Блоки агентов

Порядок работ и журнал: [.cursor/plans/vercel-deploy-config-agent-blocks.plan.md](../../../../.cursor/plans/vercel-deploy-config-agent-blocks.plan.md).
