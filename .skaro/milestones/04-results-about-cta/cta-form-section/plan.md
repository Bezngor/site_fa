# План реализации: cta-form-section

## Stage 1: Настройка переменных окружения и утилит Formspree

**Цель:** Инфраструктура для Formspree: переменные окружения и утилита отправки с таймаутом.

**Зависит от:** нет

**Входы:**
- Спецификация (spec.md)
- Архитектура (architecture.md)
- Существующая структура проекта

**Выходы:**
- `.env.local` — локально (не коммитится), при необходимости для разработки
- `.env.example` — `NEXT_PUBLIC_FORMSPREE_ID`, опционально `NEXT_PUBLIC_CONTACT_EMAIL`
- `lib/utils/formspree.ts` — `submitContactFormToFormspree`, `AbortController`, таймаут по умолчанию **12 с**

**Опционально (не обязательно для DoD):** вынести генерацию mailto в отдельный модуль — в репозитории fallback может оставаться в `CtaFormSection` (`openMailtoFallback`).

**DoD:**
- [ ] `.env.example` согласован с кодом (`NEXT_PUBLIC_FORMSPREE_ID`, комментарии к mailto)
- [ ] `lib/utils/formspree.ts` экспортирует `submitContactFormToFormspree` с `AbortController` и таймаутом 12 с
- [ ] Функции типизированы TypeScript
- [ ] Код соответствует ESLint проекта

**Риски:**
- Нет реального Formspree ID для тестов (mock или тестовый endpoint)

---

## Stage 2: Обновление Zod-схемы валидации и типов

**Цель:** Схема соответствует FR-01 (имя, email, телефон, сообщение, honeypot).

**Зависит от:** Stage 1

**Входы:**
- `lib/validation/contactFormSchema.ts`
- `types/index.ts` (`ContactFormData` и при необходимости типы схемы)

**Выходы:**
- `lib/validation/contactFormSchema.ts` — правила и сообщения из `texts.cta.form.validation`
- `types/index.ts` — `ContactFormData` при необходимости

**DoD:**
- [ ] В схеме есть `name`, `email`, `phone`, `message`, `_gotcha` с корректными правилами
- [ ] Сообщения об ошибках на русском (из texts)
- [ ] Экспорт типов без дублирования

**Риски:**
- Нет

---

## Stage 3: Реализация UI-компонентов формы

**Цель:** Поля, кнопка, сообщения об ошибке и успехе.

**Зависит от:** Stage 2

**Входы:**
- `components/ui/FormInput.tsx`, `FormTextarea.tsx`, `Button.tsx`
- `components/ui/ErrorMessage.tsx`, `components/ui/SuccessMessage.tsx`
- Палитра проекта (primary #1B2A4A, accent #F59E0B)

**Выходы:**
- Обновлённые UI-компоненты с `error`, `isLoading`, `hint` / `message` по факту API
- `components/ui/index.ts` — barrel export

**DoD:**
- [ ] Компоненты на TypeScript
- [ ] `SuccessMessage` получает текст успеха из пропсов (источник — `texts.cta.form` в родителе)
- [ ] Стилизация Tailwind CSS 4, без CSS Modules для этой задачи

**Риски:**
- Нет

---

## Stage 4: Реализация CtaFormSection

**Цель:** Валидация, отправка, состояния, fallback mailto.

**Зависит от:** Stage 1, 2, 3

**Входы:**
- `submitContactFormToFormspree` из `lib/utils/formspree.ts`
- `contactFormSchema`, UI, `lib/data/texts.ts`

**Выходы:**
- `components/sections/CtaFormSection.tsx` — `'use client'`, контекст статуса внутри секции, поля через `useState`, submit через Zod и Formspree, mailto при сбое

**DoD:**
- [ ] Валидация только на submit
- [ ] Успех → `SuccessMessage` с `f.successMessage`
- [ ] Ошибка → `ErrorMessage` и mailto-fallback где предусмотрено кодом
- [ ] `NEXT_PUBLIC_FORMSPREE_ID` для Formspree
- [ ] ESLint / Prettier

**Риски:**
- Много состояний в одном месте — вынести мелкие хелперы при необходимости

---

## Stage 5: Интеграция и финальная проверка

**Цель:** Секция на главной странице, документация, сборка.

**Зависит от:** Stage 4

**Входы:**
- `app/page.tsx`, `components/sections/index.ts`
- `AI_NOTES.md` (по необходимости)

**DoD:**
- [ ] `CtaFormSection` в `app/page.tsx` как 8-я секция
- [ ] Экспорт в `components/sections/index.ts`
- [ ] `npm run build` без ошибок
- [ ] **`npm run export` — N/A:** в `package.json` нет скрипта `export`; при появлении статического экспорта добавить проверку отдельно

**Риски:**
- Нет

---

## Verify

```yaml
- name: Проверка типов TypeScript
  command: npx tsc --noEmit

- name: Линтинг кода
  command: npx eslint components/sections/CtaFormSection.tsx lib/utils/formspree.ts lib/validation/contactFormSchema.ts

- name: Форматирование кода
  command: npx prettier --check components/sections/CtaFormSection.tsx lib/utils/formspree.ts lib/validation/contactFormSchema.ts

- name: Сборка проекта
  command: npm run build
```
