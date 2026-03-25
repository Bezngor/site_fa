# Tasks: vercel-deploy-config

## Stage 1: Next.js (статический экспорт)

- [x] `output: 'export'`, `trailingSlash: true`, `images.unoptimized` → `next.config.js`
- [x] Локальная сборка `npm run build` → терминал

## Stage 2: Vercel

- [x] `vercel.json`: `cleanUrls`, `headers` (CSP, X-Frame-Options, nosniff, Referrer-Policy, при необходимости X-XSS-Protection)

## Stage 3: Документация

- [x] Раздел «Деплой на Vercel» в `README.md`
- [x] Согласование имён env с `.env.example` (файл без изменений, если уже полон)

## Stage 4: Валидация

- [x] `scripts/validate-vercel-config.js` + `npm run validate:vercel`
- [x] `scripts/check-static-out.js` + `npm run check:out` (после сборки)
- [x] Обновить `verify.yaml` (без PowerShell, без несуществующих e2e)
- [x] `AI_NOTES.md` в папке milestone
