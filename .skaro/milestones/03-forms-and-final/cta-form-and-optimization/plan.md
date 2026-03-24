# План реализации: cta-form-and-integration

## Stage 1: Настройка окружения и зависимостей

**Цель:** Установить необходимые зависимости для валидации форм (Zod) и подготовить переменные окружения.

**Зависит от:** нет

**Входные данные:** 
- `package.json`
- `.env.example`

**Выходные данные:**
- `package.json` (обновлён с zod)
- `.env.local` (создан на основе .env.example)
- `.env.example` (обновлён с NEXT_PUBLIC_FORMSPREE_ID)

**Definition of Done:**
- [ ] Установлен пакет `zod` последней стабильной версии
- [ ] В `.env.example` добавлена переменная `NEXT_PUBLIC_FORMSPREE_ID` с комментарием
- [ ] Создан `.env.local` для локальной разработки (добавлен в .gitignore)
- [ ] Документация по настройке переменных окружения добавлена в комментарии

**Риски:** 
- Конфликт версий зависимостей (минимален, zod стабилен)

---

## Stage 2: Схема валидации и типы формы

**Цель:** Создать Zod-схему для валидации полей формы и TypeScript-типы для состояний формы.

**Зависит от:** Stage 1

**Входные данные:**
- `types/index.ts`
- Установленный пакет `zod`

**Выходные данные:**
- `lib/validation/contactFormSchema.ts` (новый файл)
- `types/index.ts` (обновлён с типами формы)

**Definition of Done:**
- [ ] Создана Zod-схема с полями: name (мин. 2 символа), email (валидный email), phone (мин. 10 цифр), message (мин. 10 символов)
- [ ] Добавлено honeypot-поле `_gotcha` в схему (опциональное, пустое)
- [ ] Экспортированы TypeScript-типы: `ContactFormData`, `FormState`, `FormStatus`
- [ ] Валидация телефона: регулярное выражение `/\d/g` с подсчётом цифр >= 10
- [ ] Добавлены русские сообщения об ошибках для всех полей

**Риски:**
- Слишком строгая валидация телефона может отклонять валидные номера (решено: гибкая проверка только цифр)

---

## Stage 3: UI-компоненты формы

**Цель:** Создать переиспользуемые UI-компоненты для полей формы и кнопок с поддержкой состояний ошибок.

**Зависит от:** Stage 2

**Входные данные:**
- `components/ui/FormInput.tsx` (существующий)
- `components/ui/Button.tsx` (существующий)
- `types/index.ts`

**Выходные данные:**
- `components/ui/FormInput.tsx` (обновлён)
- `components/ui/FormTextarea.tsx` (новый)
- `components/ui/Button.tsx` (обновлён с loading state)
- `components/ui/ErrorMessage.tsx` (новый)
- `components/ui/SuccessMessage.tsx` (новый)
- `components/ui/index.ts` (обновлён с экспортами)

**Definition of Done:**
- [ ] `FormInput` поддерживает отображение ошибок валидации (красная рамка, текст ошибки)
- [ ] `FormTextarea` создан для поля "Сообщение" с аналогичной логикой
- [ ] `Button` поддерживает состояние loading (спиннер, disabled)
- [ ] `ErrorMessage` — компонент для отображения общих ошибок формы с иконкой
- [ ] `SuccessMessage` — компонент для success state с кнопкой "Вернуться"
- [ ] Все компоненты используют Tailwind CSS с цветовой палитрой проекта
- [ ] Honeypot-поле реализовано как скрытый input (display: none, aria-hidden)

**Риски:**
- Переусложнение UI-компонентов (решено: минимальная логика, фокус на props)

---

## Stage 4: Логика отправки формы и интеграция с Formspree

**Цель:** Реализовать Client Component `CtaFormSection` с полной логикой формы: валидация, отправка, обработка состояний.

**Зависит от:** Stage 3

**Входные данные:**
- `components/sections/CtaFormSection.tsx` (существующий, заглушка)
- `lib/validation/contactFormSchema.ts`
- `components/ui/*` (все UI-компоненты)
- `lib/data/texts.ts`

**Выходные данные:**
- `components/sections/CtaFormSection.tsx` (полностью переписан как 'use client')
- `lib/utils/formspree.ts` (новый, утилита для отправки)
- `lib/data/texts.ts` (обновлён с текстами для формы)

**Definition of Done:**
- [ ] `CtaFormSection` помечен как `'use client'`
- [ ] Реализован React state для полей формы, ошибок, статуса (idle/loading/success/error)
- [ ] Валидация через Zod при submit с отображением ошибок под полями
- [ ] Отправка данных на Formspree endpoint через `fetch` (POST, JSON)
- [ ] Обработка отсутствия `NEXT_PUBLIC_FORMSPREE_ID`: показ ошибки + mailto: fallback
- [ ] Обработка ошибок сети/API: показ `ErrorMessage` с mailto: ссылкой
- [ ] Success state: замена формы на `SuccessMessage` с кнопкой сброса
- [ ] Honeypot-поле включено в форму (скрытое)
- [ ] Loading state: disabled inputs, спиннер на кнопке
- [ ] Все тексты (labels, placeholders, ошибки, success) из `texts.ts`

**Риски:**
- Проблемы с CORS при локальной разработке (решено: Formspree поддерживает localhost)
- Утечка состояния между отправками (решено: сброс state при success)

---

## Stage 5: SEO-оптимизация и мета-данные

**Цель:** Настроить SEO: мета-теги, robots.txt, sitemap.xml, OpenGraph.

**Зависит от:** нет (параллельно со Stage 4)

**Входные данные:**
- `app/layout.tsx`
- Architecture document (SEO requirements)

**Выходные данные:**
- `app/layout.tsx` (обновлён с metadata)
- `public/robots.txt` (новый)
- `public/sitemap.xml` (новый)
- `app/opengraph-image.png` (placeholder или реальное изображение)

**Definition of Done:**
- [ ] В `layout.tsx` настроены metadata: title, description, keywords (русский язык)
- [ ] Добавлены OpenGraph теги: og:title, og:description, og:image, og:type
- [ ] `robots.txt`: Allow all, указан sitemap
- [ ] `sitemap.xml`: статический файл с единственным URL (главная страница)
- [ ] Добавлен `<link rel="canonical">` в metadata
- [ ] Проверено отсутствие `noindex` в production build

**Риски:**
- Забыть обновить sitemap при изменении URL (минимален, страница одна)

---

## Stage 6: Финальная интеграция и тестирование

**Цель:** Интегрировать обновлённую форму в главную страницу, провести smoke-тесты, проверить bundle size.

**Зависит от:** Stage 4, Stage 5

**Входные данные:**
- `app/page.tsx`
- `components/sections/CtaFormSection.tsx`
- Все предыдущие stages

**Выходные данные:**
- `app/page.tsx` (проверка импорта CtaFormSection)
- `AI_NOTES.md` (новый, документация по реализации)
- `package.json` (добавлены скрипты для проверки bundle size)

**Definition of Done:**
- [ ] `CtaFormSection` корректно отображается на главной странице
- [ ] Проведён smoke-тест: форма рендерится, валидация работает, submit вызывает fetch
- [ ] Проверен bundle size: `next build && next export`, gzipped JS < 150 KB
- [ ] Lighthouse audit: Performance > 90, SEO > 90
- [ ] Создан `AI_NOTES.md` с описанием архитектурных решений, компромиссов, инструкциями по настройке Formspree
- [ ] Все TODO удалены из кода
- [ ] ESLint и Prettier проверки пройдены

**Риски:**
- Bundle size превышает лимит (решено: проверка tree-shaking, lazy loading для тяжёлых компонентов)
- Проблемы с SSG и 'use client' (решено: Next.js 15 корректно обрабатывает Client Components в SSG)

---

## Verify

```yaml
- name: TypeScript компиляция
  command: npx tsc --noEmit

- name: ESLint проверка
  command: npx eslint components/sections/CtaFormSection.tsx lib/validation/ lib/utils/formspree.ts

- name: Prettier форматирование
  command: npx prettier --check components/sections/CtaFormSection.tsx lib/validation/ lib/utils/

- name: Production build
  command: npm run build

- name: Проверка bundle size
  command: |
    npm run build; 
    Get-ChildItem -Path out/_next/static/chunks -Recurse -Filter *.js | Measure-Object -Property Length -Sum | Select-Object @{Name='TotalSizeKB';Expression={[math]::Round($_.Sum/1KB,2)}}

- name: Проверка наличия SEO файлов
  command: |
    Test-Path public/robots.txt; 
    Test-Path public/sitemap.xml

- name: Проверка мета-тегов в layout
  command: Select-String -Path app/layout.tsx -Pattern "metadata.*title|description|openGraph"
```