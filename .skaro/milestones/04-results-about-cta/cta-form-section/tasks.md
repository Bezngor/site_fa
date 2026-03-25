# Tasks: cta-form-section

## Stage 1: Настройка переменных окружения и утилиты Formspree
- [ ] Согласовать `.env.example` (`NEXT_PUBLIC_FORMSPREE_ID`, опционально `NEXT_PUBLIC_CONTACT_EMAIL`) → `.env.example`
- [ ] При локальной разработке — `.env.local` с тестовым ID → `.env.local`
- [ ] `lib/utils/formspree.ts`: `submitContactFormToFormspree`, `AbortController`, таймаут **12 с** → `lib/utils/formspree.ts`
- [ ] (Опционально) Вынести mailto в `lib/utils/mailto.ts` — сейчас в коде может быть `openMailtoFallback` в `CtaFormSection.tsx`

## Stage 2: Zod-схема и типы
- [ ] `lib/validation/contactFormSchema.ts`: `name`, `email`, `phone` (≥10 цифр), `message`, `_gotcha` (honeypot) → `lib/validation/contactFormSchema.ts`
- [ ] Сообщения валидации из `texts.cta.form.validation` → `lib/validation/contactFormSchema.ts`
- [ ] `types/index.ts`: `ContactFormData` при необходимости → `types/index.ts`

## Stage 3: UI-компоненты формы
- [ ] `FormInput` / `FormTextarea` с `error` → `components/ui/FormInput.tsx`, `FormTextarea.tsx`
- [ ] `Button` с `isLoading` → `components/ui/Button.tsx`
- [ ] `ErrorMessage` (children + `hint`) → `components/ui/ErrorMessage.tsx`
- [ ] `SuccessMessage` с текстом из пропсов → `components/ui/SuccessMessage.tsx`
- [ ] Barrel → `components/ui/index.ts`

## Stage 4: CtaFormSection
- [ ] `components/sections/CtaFormSection.tsx`: `'use client'`, поля, honeypot, контекст статуса → `CtaFormSection.tsx`
- [ ] Submit: `safeParse`, `submitContactFormToFormspree(formId, …)` → `CtaFormSection.tsx`
- [ ] Успех: `SuccessMessage` с `texts.cta.form.successMessage` → `CtaFormSection.tsx`
- [ ] Ошибка / таймаут / нет ID: сообщение + mailto → `CtaFormSection.tsx`
- [ ] Тексты секции в `lib/data/texts.ts` (`texts.cta.form`) → `lib/data/texts.ts`

## Stage 5: Интеграция и проверка
- [ ] Импорт `CtaFormSection` в `app/page.tsx` → `app/page.tsx`
- [ ] Экспорт в `components/sections/index.ts` → `components/sections/index.ts`
- [ ] При необходимости обновить `AI_NOTES.md` → `AI_NOTES.md`
- [ ] `npm run build`
- [ ] Скрипт `npm run export` в проекте отсутствует — не требовать; при добавлении — включить в чеклист
