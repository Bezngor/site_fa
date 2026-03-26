# FactoryAll — лендинг (Next.js)

Статический сайт (`output: 'export'`), App Router.

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Артефект экспорта — каталог `out/`.

## Деплой на Vercel

Проект — **статический экспорт** Next.js (`output: 'export'` в `next.config.js`). Деплой и Preview по Git описаны в [ADR-004](.skaro/architecture/adr-004-деплой-на-vercel-с-использованием-next-export-для-.md).

### Шаги в Vercel Dashboard

1. Войти на [vercel.com](https://vercel.com) и при необходимости связать аккаунт с GitHub.
2. **Add New… → Project → Import** нужный репозиторий.
3. **Framework Preset:** Next.js (или «Other», если пресет не подхватился).
4. **Build Command:** `npm run build` (эквивалентно `next build`; отдельный `next export` не нужен).
5. **Output Directory:** **не переопределять** (оставить пустым / по умолчанию). Для пресета Next.js Vercel сам подхватывает `output: 'export'` из `next.config.js`. Если вручную указать `out`, сборка часто падает с ошибкой «`routes-manifest.json` не найден» — см. [документацию Vercel](https://github.com/vercel/vercel/blob/main/errors/now-next-routes-manifest.md). Каталог `out/` по-прежнему создаётся локально после `npm run build` и нужен для `npx serve out`.
6. **Environment Variables** — скопировать имена из [`.env.example`](.env.example), значения задать для **Production** и **Preview**:
   - `NEXT_PUBLIC_SITE_URL` — на проде канонический домен (например `https://factoryall.ru`); для **каждого Preview** удобнее выставить URL деплоя вида `https://<имя-проекта>-<hash>.vercel.app` (или ваш кастомный превью-домен), иначе в метаданных/OG могут остаться «чужие» абсолютные ссылки.
   - `NEXT_PUBLIC_FORMSPREE_ID` — ID формы Formspree (без полного URL).
   - По желанию: `NEXT_PUBLIC_CONTACT_EMAIL` — для mailto-fallback в форме (см. комментарии в `.env.example`).
7. Сохранить и задеплоить. **Production** обычно вешается на ветку `main` (или выбранную в настройках); **Preview** — на Pull Request’ы в репозиторий.

Корень проекта содержит [`vercel.json`](vercel.json): `cleanUrls` и заголовки безопасности (в т.ч. CSP). Они применяются на стороне **Vercel**, а не при простой раздаче `out/` локально.

### Локальная проверка

- **`npm run build`** и раздача `out/` (например `npx serve out`) — проверка вёрстки и маршрутов; **заголовки из `vercel.json` при этом не выставляются**.
- **`npx vercel dev`** — ближе к поведению хостинга Vercel, в том числе к кастомным заголовкам из `vercel.json` (нужен [Vercel CLI](https://vercel.com/docs/cli) и привязка проекта).

После деплоя проверить ответ сервера: `curl -I https://<ваш-preview-или-prod-url>/`.

### CSP и `unsafe-inline`

В `vercel.json` в Content-Security-Policy для `script-src` и `style-src` указано `'unsafe-inline'`: текущий статический бандл Next 15 оставляет в HTML инлайн-скрипты (гидратация) и инлайн-стили у `next/image`. Без этого страница на проде может не заработать. Ужесточать политику имеет смысл только вместе с изменением сборки (nonce/hashes и т.д.).

### Troubleshooting

| Симптом | Что проверить |
|--------|----------------|
| `routes-manifest.json` не найден / Build Failed после экспорта | В Vercel **снять переопределение Output Directory** (не указывать `out`). См. [now-next-routes-manifest](https://github.com/vercel/vercel/blob/main/errors/now-next-routes-manifest.md). |
| 404 на путях или «ломаются» URL (локально) | После `npm run build` раздавать полный каталог `out/`; согласованность `trailingSlash: true` и `cleanUrls` в `vercel.json`. |
| Неверные абсолютные ссылки / OG на превью | Переменная `NEXT_PUBLIC_SITE_URL` для окружения **Preview** должна соответствовать URL этого деплоя. |
| Форма не отправляется / ошибки в консоли | `NEXT_PUBLIC_FORMSPREE_ID`; в консоли браузера — сообщения CSP (при изменении `vercel.json` или сторонних скриптов). |

### Документация

- [Deploying to Vercel](https://vercel.com/docs/deployments/overview)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/next-js)

## E2E (Playwright)

Smoke-тесты главной и контактной формы. Подробности и требования к окружению: [e2e/README.md](e2e/README.md).

```bash
npx playwright install chromium
npm run test:e2e
```

## Прочее

- Линт: `npm run lint`
- Проверка типов: `npm run type-check`