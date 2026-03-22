## Этап 1: Подготовка данных для секции ProblemsSection

**Цель:** Добавить типизированные данные для проблем в `lib/data/texts.ts`: массив строк с 4-6 проблемами, заголовок секции и вводный текст. Это обеспечит статическую типизацию и централизованное хранение контента на русском языке.

**Зависит от:** ничего

**Входы:** Спецификация ProblemsSection, lib/data/texts.ts (существующий файл), types/index.ts (если нужны типы)

**Выходы:**
- `lib/data/texts.ts` (обновленный с экспортом problems: string[], sectionTitle: string, introText: string)
- `types/index.ts` (добавлен интерфейс ProblemsData, если требуется для типизации)

**Критерии готовности:**
- [ ] В `lib/data/texts.ts` секция `problems` содержит:
      - `title` (например, "Проблемы, которые мы решаем")
      - опциональный `description` (краткое вступление, 1–2 предложения)
      - `list: string[]` с 4–6 пунктами на русском
- [ ] В `types/index.ts` `TextsData['problems']` типизирован как `SectionTexts & { list: string[] }`
- [ ] Нет отдельных `problemsSectionTitle` / `problemsIntroText` вне объекта `texts`
- [ ] Файлы проходят ESLint/Prettier/tsc

**Риски:** Несоответствие цветовой палитре или стилю текста (решение: использовать примеры из HeroSection)

## Этап 2: Реализация компонента ProblemsSection и интеграция в экспорты

**Цель:** Создать Server Component `ProblemsSection.tsx` с сеткой карточек (1/2 колонки), крупными номерами в #F59E0B, анимацией Tailwind, заголовком и интро. Обновить экспорты в index.ts для импорта в page.tsx.

**Зависит от:** Этап 1

**Входы:** Спецификация, lib/data/texts.ts (из Этапа 1), tailwind.config.ts, существующие UI-компоненты (Button если нужно, но не требуется)

**Выходы:**
- `components/sections/ProblemsSection.tsx` (полный компонент: импорт данных, grid md:grid-cols-2, номера text-5xl text-[#F59E0B], animate-fadeIn)
- `components/sections/index.ts` (добавлен экспорт ProblemsSection)
- `app/page.tsx` (добавлен импорт и <ProblemsSection /> после HeroSection, если логично по архитектуре)

**Критерии готовности:**
- [ ] Компонент — Server Component (без 'use client')
- [ ] Сетка: grid-cols-1 md:grid-cols-2, gap-8, карточки с номером (index+1), текстом проблемы
- [ ] Стили: primary #1B2A4A для текста, accent #F59E0B для номеров, Tailwind только
- [ ] Анимация: animate-fade-in на карточках/секции
- [ ] Адаптивность: mobile 1 кол., desktop 2 кол.
- [ ] Все тексты на русском из данных
- [ ] Max nesting 3, <40 строк на функцию
- [ ] Экспорт в index.ts, готов к импорту в page.tsx
- [ ] Файлы соответствуют ESLint, Prettier, TypeScript

**Риски:** Перерасход bundle size (решение: Tailwind purge, no libs); нарушение SSG (решение: статические данные)

---

# Задачи: Реализация ProblemsSection

## Этап 1: Подготовка данных для секции ProblemsSection
- [ ] Обновить `lib/data/texts.ts` → добавить problems: string[] (4-6 пунктов), problemsSectionTitle, problemsIntroText
- [ ] Добавить типы в `types/index.ts` → interface ProblemsData

## Этап 2: Реализация компонента ProblemsSection и интеграция в экспорты
- [ ] Создать `components/sections/ProblemsSection.tsx` → Server Component с grid, номерами #F59E0B, анимацией
- [ ] Обновить `components/sections/index.ts` → экспорт ProblemsSection
- [ ] Добавить в `app/page.tsx` → импорт и рендер <ProblemsSection />

## Verify
- name: Линтинг новых файлов
  command: npx eslint "lib/data/texts.ts" "types/index.ts" "components/sections/ProblemsSection.tsx" "components/sections/index.ts" "app/page.tsx"
- name: Проверка типов
  command: npx tsc --noEmit
- name: Сборка проекта
  command: npm run build
- name: Проверка стилей Tailwind
  command: npx tailwindcss -i ./app/globals.css -o ./out/_next/static/css/test.css --minify