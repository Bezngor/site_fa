# Tasks: cta-form-and-integration

## Stage 1: Настройка окружения и зависимостей
- [ ] Установить пакет `zod` → `package.json`
- [ ] Добавить `NEXT_PUBLIC_FORMSPREE_ID` в `.env.example` с комментарием
- [ ] Создать `.env.local` для локальной разработки
- [ ] Убедиться, что `.env.local` в `.gitignore`

## Stage 2: Схема валидации и типы формы
- [ ] Создать Zod-схему для формы → `lib/validation/contactFormSchema.ts`
- [ ] Добавить валидацию телефона (мин. 10 цифр) с regex
- [ ] Добавить honeypot-поле `_gotcha` в схему
- [ ] Экспортировать TypeScript-типы `ContactFormData`, `FormState`, `FormStatus` → `types/index.ts`
- [ ] Добавить русские сообщения об ошибках для всех полей

## Stage 3: UI-компоненты формы
- [ ] Обновить `FormInput` с поддержкой ошибок валидации → `components/ui/FormInput.tsx`
- [ ] Создать `FormTextarea` для поля "Сообщение" → `components/ui/FormTextarea.tsx`
- [ ] Обновить `Button` с loading state (спиннер) → `components/ui/Button.tsx`
- [ ] Создать `ErrorMessage` компонент → `components/ui/ErrorMessage.tsx`
- [ ] Создать `SuccessMessage` компонент с кнопкой "Вернуться" → `components/ui/SuccessMessage.tsx`
- [ ] Обновить экспорты → `components/ui/index.ts`
- [ ] Реализовать honeypot-поле как скрытый input

## Stage 4: Логика отправки формы и интеграция с Formspree
- [ ] Переписать `CtaFormSection` как Client Component ('use client') → `components/sections/CtaFormSection.tsx`
- [ ] Реализовать React state для полей, ошибок, статуса
- [ ] Добавить валидацию через Zod при submit
- [ ] Создать утилиту для отправки на Formspree → `lib/utils/formspree.ts`
- [ ] Обработать отсутствие `NEXT_PUBLIC_FORMSPREE_ID` (ошибка + mailto:)
- [ ] Обработать ошибки сети/API (ErrorMessage + mailto:)
- [ ] Реализовать success state (замена формы на SuccessMessage)
- [ ] Добавить loading state (disabled inputs, спиннер)
- [ ] Добавить тексты формы в `lib/data/texts.ts`

## Stage 5: SEO-оптимизация и мета-данные
- [ ] Настроить metadata в `app/layout.tsx` (title, description, keywords)
- [ ] Добавить OpenGraph теги (og:title, og:description, og:image, og:type)
- [ ] Создать `public/robots.txt` (Allow all, указать sitemap)
- [ ] Создать `public/sitemap.xml` (статический, главная страница)
- [ ] Добавить canonical link в metadata
- [ ] Проверить отсутствие noindex в production

## Stage 6: Финальная интеграция и тестирование
- [ ] Проверить импорт `CtaFormSection` в `app/page.tsx`
- [ ] Провести smoke-тест формы (рендер, валидация, submit)
- [ ] Проверить bundle size после build (< 150 KB gzipped)
- [ ] Запустить Lighthouse audit (Performance > 90, SEO > 90)
- [ ] Создать `AI_NOTES.md` с документацией по реализации
- [ ] Удалить все TODO из кода
- [ ] Запустить ESLint и Prettier проверки
- [ ] Добавить скрипты для проверки bundle size в `package.json`