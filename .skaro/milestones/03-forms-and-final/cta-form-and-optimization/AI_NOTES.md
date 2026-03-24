# AI notes — CTA-форма и смежный scope (AG-CF)

## Архитектура формы

- Секция `CtaFormSection` — клиентский компонент (`'use client'`), разметка и тексты из `lib/data/texts.ts`.
- Разметка формы вынесена во внутренний `ContactFormBody`; состояние отправки (`idle` | `loading` | `success` | `error`) и сообщение об ошибке живут в `React.Context` (`CtaFormSubmitContext`), чтобы экран успеха не терял провайдер при сбросе.
- UI: `FormInput`, `FormTextarea`, `Button`, `ErrorMessage`, `SuccessMessage` из `components/ui`.
- Валидация: Zod-схема `contactFormSchema` в `lib/validation/contactFormSchema.ts` (имя, email, телефон ≥10 цифр, сообщение ≥10 символов, honeypot).
- Отправка: `submitContactFormToFormspree` в `lib/utils/formspree.ts` — `fetch` JSON на `https://formspree.io/f/{id}`, заголовки `Accept` / `Content-Type`, `AbortController` и таймаут **12 с**, в теле также `_replyto` и `_gotcha`.

## Переменные окружения

| Переменная | Назначение |
|------------|------------|
| `NEXT_PUBLIC_FORMSPREE_ID` | ID формы Formspree. Если пусто или не задано — после валидации показывается ошибка и сразу срабатывает fallback `mailto:`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Адрес для `mailto:` и подстановки в подсказке; по умолчанию `hello@factoryall.ru`. |

Для статического экспорта секреты не должны попадать в клиентский бандл кроме публичных `NEXT_PUBLIC_*` (Formspree ID рассчитан на публичное использование).

## Honeypot

- Поле `_gotcha` в DOM: скрыто оффскрином (`absolute -left-[5000px]`), `tabIndex={-1}`, `aria-hidden` на обёртке; имя поля `_gotcha` для совместимости с Formspree.
- В Zod: значение после trim должно быть пустой строке; иначе сообщение из `texts.cta.form.validation.honeypot`.
- При успешной валидации в JSON на Formspree уходит `_gotcha` (пустая строка).

## Fallback

- Нет `NEXT_PUBLIC_FORMSPREE_ID` → ошибка + `mailto:` с темой «Заявка: экспресс-диагностика FactoryAll» и телом (имя, email, телефон, сообщение).
- Ответ Formspree не OK или сеть/таймаут → то же: сообщение об ошибке, затем `mailto:`.
- Текст подсказки для ручной почты подставляет актуальный email из `NEXT_PUBLIC_CONTACT_EMAIL`.

## SEO (фактический scope рядом с формой)

- `app/layout.tsx`: `metadataBase`, `title`, `description`, `keywords`, `openGraph` (в т.ч. `locale`, `images` → `/og.png`), `alternates.canonical`.
- В `public/`: `robots.txt`, `sitemap.xml`, `og.png` (пути согласованы с комментарием в layout про домен `https://factoryall.ru`).
- Разметка **schema.org** в коде на момент заметки не добавлялась — при необходимости остаётся задачей ветки `seo-metadata` в `devplan.md`.

## Отличия от ранней 3-полевой версии

- Добавлены поля **телефон** и **многострочное сообщение** (контекст запроса); кнопка и копирайт секции завязаны на «экспресс-диагностику».
- Honeypot и явный fallback на почту вместо «тихого» провала при недоступности Formspree.
- Таймаут и обработка abort/сети вынесены в `lib/utils/formspree.ts`.
- Состояние успеха вынесено в отдельный UI-блок с кнопкой «Вернуться».

## Регрессия и метрики (AG-CF-05, 2026-03-24)

- `npm run lint` — без предупреждений и ошибок.
- `npm run type-check` (`tsc --noEmit`) — успех.
- `npm run build` (Next 15, `output: 'export'`) — успех.
- Размер артефактов `out/_next/static/chunks/**/*.js` (сумма файлов на диске): **~798 KB** (несжатый JS).
- Сумма размеров **gzip** по каждому такому файлу (локальная оценка через Node `zlib.gzipSync`): **~241 KB**. Это сумма по **всем** чанкам билда, а не размер одной «первой загрузки»; в отчёте Next для маршрута `/` указано **First Load JS ~119 KB** (как в `next build`, без отдельной строки gzip). Порог **150 KB gzip** из плана напрямую к сумме всех чанков не привязан — для точной оценки LCP/перевода в gzip по маршруту лучше смотреть вкладку Network / Lighthouse.
- **Lighthouse** в этой сессии до числового отчёта не доведён (запуск против `http://127.0.0.1:3000` без поднятого сервера / завершения прогона). Рекомендация: `npx lighthouse` против собранного `out/index.html` через локальный статический сервер или против превью-деплоя.

## TODO в зоне формы

- Явных `TODO` / `FIXME` в `CtaFormSection`, `lib/validation/contactFormSchema.ts`, `lib/utils/formspree.ts` нет.

## Сообщение для ревью

Готов **AG-CF-05**.
