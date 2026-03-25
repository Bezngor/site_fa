# План реализации: vercel-deploy-config

## Stage 1: Конфигурация Next.js для статического экспорта

**Цель:** `next.config.js` с `output: 'export'`, `trailingSlash: true`, `images.unoptimized`.

**DoD:**

- [x] `output: 'export'`
- [x] `trailingSlash: true`
- [x] `images.unoptimized: true`
- [x] `npm run build` успешен

---

## Stage 2: Конфигурация Vercel

**Цель:** `vercel.json` — `cleanUrls`, блок `headers` на все маршруты (в проекте: `source: "/:path*"`).

**DoD:**

- [x] `cleanUrls: true`
- [x] Заголовки: CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, опционально `X-XSS-Protection`
- [x] CSP учитывает Formspree (`connect-src` / `form-action`) и ограничения статического бандла Next 15
- [x] Без лишних `rewrites` / `routes`, если не требуется для 404

---

## Stage 3: Документация

**Цель:** `README.md` — раздел «Деплой на Vercel», env, Preview/Production, локальная проверка, troubleshooting, ссылки на документацию Vercel.

**DoD:**

- [x] Раздел в `README.md`
- [x] `.env.example` достаточен (имена переменных совпадают с инструкцией)

---

## Stage 4: Валидация (без отдельного Playwright под заголовки)

**Цель:** кроссплатформенные проверки конфигурации и артефакта `out/` после сборки. Отдельный `e2e/vercel-config.spec.ts` **не** обязателен: заголовки `vercel.json` не появляются при `serve out`; полноценная автопроверка CSP в CI потребовала бы `vercel dev` или HTTP к деплою.

**Выходные данные:**

- `scripts/validate-vercel-config.js` — `vercel.json` + ключевые поля `next.config.js`
- `scripts/check-static-out.js` — наличие `out/index.html`, `out/404/index.html`
- `package.json` — скрипты `validate:vercel`, `check:out`
- `verify.yaml` — см. файл в milestone

**DoD:**

- [x] `npm run validate:vercel` проходит
- [x] После `npm run build`: `npm run check:out` проходит
- [x] `verify.yaml` выполним на Windows и Unix

---

## Verify

Актуальные команды: [.skaro/milestones/06-testing-deployment/vercel-deploy-config/verify.yaml](verify.yaml).
