## plan.md

## Этап 1: Подготовка данных и глобальных стилей для HeroSection
**Цель:** Добавить текстовые данные для Hero в централизованное хранилище и обеспечить плавный скролл в глобальном CSS, чтобы подготовить основу для компонента без нарушения архитектуры (статические данные в lib/data, Tailwind/CSS в globals).
**Зависимости:** нет
**Входы:** Спецификация hero-section, lib/data/texts.ts (существующий), app/globals.css (существующий), цветовая палитра из Constitution (#1B2A4A, #F59E0B).
**Выходы:** 
  - `lib/data/texts.ts` (добавление объекта heroTexts с H1, подзаголовком, CTA-текстом на русском)
  - `app/globals.css` (добавление `html { scroll-behavior: smooth; }` и стилей для секции если нужно)
  - `types/index.ts` (расширение типов для HeroText если требуется типизация)
**DoD:**
- [ ] В `types/index.ts` интерфейс `HeroTexts` описывает поля `title` и `subtitle`, `TextsData['hero']` использует этот тип.
- [ ] В `lib/data/texts.ts` секция `hero` содержит актуальные тексты для H1 и подзаголовка (без отдельного `heroTexts` объекта).
- [ ] В `app/globals.css` уже задано `html { scroll-behavior: smooth; }`, что обеспечивает плавный скролл для anchor-ссылок.
- [ ] Код проходит ESLint/Prettier, без дубликатов структур.
**Риски:** Несоответствие текстов ключевым словам из spec (решение: использовать SEO-ориентированные фразы из A4); конфликт с существующими стилями в globals.css (решение: добавить в конец).

## Этап 2: Реализация и интеграция HeroSection
**Цель:** Создать полный Server Component HeroSection с фоновым изображением, оверлеем, контентом и CTA, интегрировать его в главную страницу как первую секцию, обеспечив SSG-совместимость и производительность (priority для LCP).
**Зависимости:** Этап 1 (требуются heroTexts и scroll-behavior)
**Входы:** Спецификация (FR-01..FR-06, NFR-01..03), Этап 1 outputs, текущая структура (app/page.tsx пустой контейнер секций), Tailwind config.
**Выходы:**
  - `components/sections/HeroSection.tsx` (полный компонент: Image с fill/priority/WebP-заглушкой, gradient overlay, центрированный контент, anchor CTA)
  - `app/page.tsx` (импорт HeroSection и рендер как первой секции в контейнере)
  - `components/sections/index.ts` (re-export HeroSection для удобства импорта)
**DoD:**
- [ ] `HeroSection.tsx` — Server Component (`min-h-screen relative`), Image src="/images/hero-bg.webp" (TODO для реального файла в public/images/), gradient `bg-gradient-to-b from-[#1B2A4A]/80 to-transparent`, H1 с span (из texts), CTA `<a href="#cta-form" className="...">` с Tailwind (primary/amber цвета)
- [ ] Адаптив: mobile-first (text-xl md:text-4xl и т.д.), flex/grid центрирование
- [ ] `page.tsx` импортирует и рендерит `<HeroSection />` первой
- [ ] `sections/index.ts` содержит `export { default as HeroSection } from './HeroSection'`
- [ ] Нет 'use client', bundle-оптимизировано, соответствует max nesting/40 lines
**Риски:** Отсутствие изображения (решение: placeholder src с TODO-комментарием); проблемы с z-index/overlay на мобильных (решение: Tailwind absolute inset-0); увеличение bundle (решение: next/image оптимизация).

## Verify
- name: Проверка линтинга
  command: npx eslint components/sections/ app/ lib/data/texts.ts --max-warnings 0
- name: Проверка типов
  command: npx tsc --noEmit
- name: Проверка сборки и экспорта
  command: npm run build ; Remove-Item -Recurse -Force out/ -ErrorAction SilentlyContinue ; npx next export
- name: Проверка наличия Hero в page.tsx
  command: Select-String -Path "app/page.tsx" -Pattern "HeroSection" | Select-Object LineNumber, Line
- name: Проверка scroll-behavior в CSS
  command: Select-String -Path "app/globals.css" -Pattern "scroll-behavior"
- name: Проверка текстов в data
  command: Select-String -Path "lib/data/texts.ts" -Pattern "heroTexts"

---
TASKS---
# Задачи: Реализация HeroSection

## Этап 1: Подготовка данных и глобальных стилей для HeroSection
- [ ] Добавить heroTexts в `lib/data/texts.ts` → `lib/data/texts.ts`
- [ ] Добавить scroll-behavior: smooth в `app/globals.css` → `app/globals.css`
- [ ] Расширить типы для Hero в `types/index.ts` → `types/index.ts`

## Этап 2: Реализация и интеграция HeroSection
- [ ] Создать полный компонент HeroSection с Image, overlay, H1, CTA → `components/sections/HeroSection.tsx`
- [ ] Интегрировать HeroSection в главную страницу → `app/page.tsx`
- [ ] Добавить re-export секции → `components/sections/index.ts`