# AI_NOTES: cta-form-section (milestone 04)

Краткий источник правды для Skaro-verify и разработчика. Детальный поэтапный лог доработок может дублироваться или дополняться в [.skaro/milestones/03-forms-and-final/cta-form-and-optimization/AI_NOTES.md](../../03-forms-and-final/cta-form-and-optimization/AI_NOTES.md) и связанных stage-файлах.

## Архитектура (как в коде)

- **Секция:** `components/sections/CtaFormSection.tsx` с директивой `'use client'` — только эта секция и её дочерние узлы остаются клиентскими.
- **Состояние:** поля формы (`name`, `email`, `phone`, `message`, honeypot `_gotcha`) — локальный `useState` в `ContactFormBody`. Статусы отправки (`idle` | `loading` | `success` | `error`) и текст ошибки — в родительском `CtaFormSection` и передаются вниз через узкий `CtaFormSubmitContext` (не глобальный контекст приложения).
- **Валидация:** схема Zod `contactFormSchema` в `lib/validation/contactFormSchema.ts`; `safeParse` вызывается **только в обработчике submit** (`onSubmit`), не при каждом вводе. На форме стоит `noValidate`.
- **Отправка:** `submitContactFormToFormspree` в `lib/utils/formspree.ts` — `fetch` POST JSON на `https://formspree.io/f/{formId}`, `AbortController`, таймаут по умолчанию **12 с**, в теле уходят поля формы, `_replyto`, `_gotcha` (honeypot).

## Переменные окружения (канон для реализации)

| Переменная | Обязательность | Назначение |
|------------|----------------|------------|
| `NEXT_PUBLIC_FORMSPREE_ID` | **Канон для интеграции:** без неё (пусто после trim) форма сразу уходит в ошибку и открывается `mailto:` fallback | ID формы Formspree; URL собирается в коде как `https://formspree.io/f/{id}` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Опционально | Адрес для `mailto:` fallback и подстановки в подсказке; если не задан — `hello@factoryall.ru` |

В тексте `spec.md` для milestone 04 могут встречаться формулировки про `NEXT_PUBLIC_FORMSPREE_URL` и `react-hook-form` — **фактическая реализация** опирается на **ID** (см. выше) и на **контролируемые поля + Zod**, без `react-hook-form`.

## Таблица: FR из spec ↔ статус в коде

| ID | Требование (суть) | Статус / где смотреть |
|----|-------------------|------------------------|
| FR-01 | Валидация Zod: name ≥ 2, email, message ≥ 10 | Реализовано; дополнительно **телефон**: ≥ 10 цифр в строке (`contactFormSchema.phone`) |
| FR-02 | Интеграция Formspree через fetch и env | Реализовано: `NEXT_PUBLIC_FORMSPREE_ID` → URL в `formspree.ts` |
| FR-03 | loading / success (`SuccessMessage`) / error + fallback UI | Реализовано в `CtaFormSection.tsx` |
| FR-04 | Fallback `mailto:` с данными формы | Реализовано: `openMailtoFallback`, тема и тело из имени, email, телефона, сообщения |
| FR-05 | Локальное состояние, не глобальный контекст приложения | Реализовано: локальные `useState` + узкий контекст только для статуса submit |

Дополнительно к тексту spec в коде есть:

- **Honeypot:** поле `_gotcha` (скрыто, `aria-hidden`); в Zod должно оставаться пустым; в Formspree уходит как `_gotcha`.
- **Таймаут 12 с:** `DEFAULT_TIMEOUT_MS = 12_000` в `formspree.ts`; при прерывании результат `ok: false`, `reason: 'timeout'`, далее в UI — ошибка и тот же сценарий, что при сетевой ошибке (в т.ч. `mailto` при неуспехе).

## Сборка и `npm run export`

В текущем `package.json` есть `dev`, `build`, `start`, `lint`, проверки типов и форматирования — **скрипта `export` нет**. Статический `output: 'export'` в конфиге Next не задействован для этой задачи: отдельная команда экспорта **не требуется**, пока не появится явный static export в настройках проекта.

## Проверка согласованности

Этот файл согласован с `components/sections/CtaFormSection.tsx` и `lib/utils/formspree.ts` на момент последнего обновления AI_NOTES. При изменении env-имён, таймаута, полей формы или схемы Zod — обновите таблицу и раздел «Архитектура».
