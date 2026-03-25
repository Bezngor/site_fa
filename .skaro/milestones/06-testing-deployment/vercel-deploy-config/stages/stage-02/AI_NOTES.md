# AI_NOTES — Stage 2: Конфигурация Vercel

## Что было сделано
- Создан/обновлён файл `vercel.json` в корне проекта с настройками:
  - `cleanUrls: true` для чистых URL (без .html)
  - Блок `headers` для всех маршрутов (`source: "/:path*"`) со следующими заголовками безопасности:
    - `X-Frame-Options: DENY`
    - `X-Content-Type-Options: nosniff`
    - `Referrer-Policy: strict-origin-when-cross-origin`
    - `X-XSS-Protection: 1; mode=block`
    - `Content-Security-Policy` с политикой, разрешающей:
      - `default-src 'self'`
      - `script-src 'self' 'unsafe-inline'` (для инлайновых скриптов Next.js)
      - `style-src 'self' 'unsafe-inline'` (для Tailwind)
      - `img-src 'self' data: blob:` (для изображений и data URIs)
      - `font-src 'self'` (для шрифтов)
      - `connect-src 'self' https://formspree.io` (для запросов к Formspree)
      - `form-action https://formspree.io` (для отправки формы)
      - `frame-ancestors 'none'` (защита от кликджекинга)
      - `base-uri 'self'` (ограничение base тега)

## Почему такой подход
- `cleanUrls: true` обеспечивает SEO-дружественные URL без расширения .html и работает в паре с `trailingSlash: true` из next.config.js (генерация папок с index.html).
- Заголовки безопасности выбраны согласно рекомендациям OWASP и требованиям проекта:
  - `X-Frame-Options` и `frame-ancestors 'none'` предотвращают встраивание сайта в iframe.
  - `X-Content-Type-Options` блокирует MIME-sniffing.
  - `Referrer-Policy` контролирует передачу Referer заголовка.
  - `X-XSS-Protection` включает встроенную защиту от XSS в старых браузерах.
  - CSP ограничивает источники ресурсов, разрешая только сам сайт и Formspree для формы, что снижает риск XSS и инъекций.
- CSP включает `'unsafe-inline'` для script и style, так как статический экспорт Next.js может использовать инлайновые скрипты (например, для hydration). Это компромисс между безопасностью и функциональностью; в будущем можно перейти на nonce/hash, если потребуется более строгая политика.
- `connect-src` и `form-action` явно разрешают Formspree, что необходимо для работы контактной формы.
- Не добавлены `rewrites` или `routes`, так как статический экспорт уже генерирует корректные пути, а 404 обрабатывается автоматически (out/404/index.html).

## Файлы, созданные/изменённые
| Файл | Действие | Описание |
|---|---|---|
| `vercel.json` | создан/обновлён | Конфигурация Vercel с cleanUrls и заголовками безопасности |

## Риски и ограничения
- CSP с `'unsafe-inline'` снижает защиту от XSS, но необходима для работы Next.js. Если в будущем появятся векторы атаки через инлайновые скрипты, потребуется пересмотр.
- Заголовки применяются только на Vercel (Preview/Production). При локальном тестировании через `serve out` заголовки не будут установлены, что может скрывать проблемы с CSP.
- Если в проект добавятся внешние ресурсы (Google Fonts, аналитика), CSP потребует обновления.

## Соответствие инвариантам архитектуры
- [x] Статическая генерация (SSG) — respected: конфиг не влияет на сборку, но корректно работает с exported сайтом.
- [x] Bundle size <150 KB — respected: конфиг не добавляет код в бандл.
- [x] Server Components по умолчанию — respected: не затрагивается.
- [x] Изображения через `next/image` — respected: CSP разрешает img-src 'self' data: blob:, что покрывает использование next/image.
- [x] Tailwind CSS 4 — respected: style-src разрешает 'unsafe-inline' для инлайновых стилей Tailwind.
- [x] Форма через Formspree — respected: connect-src и form-action включают formspree.io.
- [x] Язык — respected: комментарии на русском, конфиг на английском (стандарт).

## Как проверить
1. После деплоя на Vercel выполните `curl -I <URL>` или откройте DevTools → Network → проверьте заголовки ответа. Должны присутствовать все указанные заголовки.
2. Убедитесь, что `cleanUrls` работает: доступ к `/about` (без .html) должен отдавать страницу About (если есть).
3. Проверьте, что форма отправляется на Formspree без ошибок CSP в консоли браузера.
4. Локально можно запустить `npx vercel dev` (если установлен Vercel CLI) — заголовки будут применены. Или использовать `serve out` и проверить, что заголовки отсутствуют (ожидаемо).
5. Запустите `npm run validate:vercel` (если создан скрипт) для проверки структуры vercel.json и next.config.js.

Примечание: Скрипт `validate:vercel` будет создан на Stage 4, но на этом этапе мы только настраиваем vercel.json.