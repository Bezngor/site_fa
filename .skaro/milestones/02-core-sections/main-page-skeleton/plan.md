## Этап 1: Создание заглушек для недостающих секций и обновление экспортов

**Цель:** Создать компоненты-заглушки для 5 недостающих секций (CasesSection, ProductLineSection, ResultsSection, AboutSection, CtaFormSection) с уникальными ID согласно спецификации. Обновить components/sections/index.ts для экспорта всех 8 секций. Это обеспечит наличие всех контейнеров для последующей сборки страницы.

**Зависит от:** ничего

**Входы:** Спецификация (FR-02, FR-03), архитектура (секции в /components/sections/), существующие файлы components/sections/*.tsx, lib/data/navigation.ts (для согласования ID)

**Выходы:**
- `components/sections/CasesSection.tsx`
- `components/sections/ProductLineSection.tsx`
- `components/sections/ResultsSection.tsx`
- `components/sections/AboutSection.tsx`
- `components/sections/CtaFormSection.tsx`
- `components/sections/index.ts` (обновленный)

**Критерии завершения (DoD):**
- [ ] Все 5 новых файлов созданы как Server Components с правильными ID: `cases`, `products`, `results`, `about`, `contact`
- [ ] Каждая заглушка содержит `<section>` с `id`, классами Tailwind для min-h-[200px], bg-gray-100 и текстом "TODO: [Название секции]" (напр., "TODO: CasesSection")
- [ ] `index.ts` экспортирует все 8 секций: HeroSection, ProblemsSection, HowWeWorkSection, CasesSection, ProductLineSection, ResultsSection, AboutSection, CtaFormSection
- [ ] Код соответствует стандартам: max 40 строк на функцию, Tailwind only, PascalCase, нет 'use client'
- [ ] Нет дублирования, типизация TS

**Риски:** Несоответствие ID из navigation.ts (проверить на этапе); перегрузка контекста LLM при генерации 6 файлов (решение: фокус на stubs как на повторяющихся шаблонах)

## Этап 2: Сборка главной страницы, Header и стили для навигации

**Цель:** Собрать все 8 секций в app/page.tsx с ID для Hero, Problems, HowWeWork (workflow). Реализовать Header с sticky навигацией и якорными ссылками на все 8 ID. Добавить CSS для плавной прокрутки. Это завершит скелет с рабочей навигацией.

**Зависит от:** Этап 1

**Входы:** Этап 1 (все секции в index.ts), спецификация (FR-01..FR-05, NFR-01), существующие app/page.tsx, components/layout/Header.tsx, app/globals.css, lib/data/navigation.ts (для ссылок)

**Выходы:**
- `app/page.tsx` (обновленный)
- `components/layout/Header.tsx` (обновленный)
- `app/globals.css` (обновленный)

**Критерии завершения (DoD):**
- [ ] `app/page.tsx`: `<main>` с последовательным рендером 8 секций via `import { ... } from '@/components/sections'`, каждый `<Section id="..." />`, Hero/Problems/HowWeWork используют существующий контент, остальные — stubs
- [ ] ID секций строго: `hero`, `problems`, `how-we-work`, `cases`, `products`, `results`, `about`, `contact`
- [ ] `Header.tsx`: `<header className="sticky top-0 z-50 bg-white/95 backdrop-blur">` с `<nav>` и 8 `<a href="#id">` (ссылки из `navigation.ts` если типизированы)
- [ ] `globals.css`: добавлено `html { scroll-behavior: smooth; }`
- [ ] Семантика: `<header>`, `<main>`, `<section>`; sticky top-0 для Header; плавный скролл работает в современных браузерах
- [ ] Нет Footer; bundle-safe (Server Components); nav labels на русском из `navigation.ts`

**Риски:** Конфликт с существующими signatures в файлах (решение: перезаписать coherentно); bundle size >150KB (риск низкий, stubs минимальны); smooth scroll не работает в IE (по spec OK)

## Verify
- name: Проверка наличия всех секций
  command: Get-ChildItem components/sections -Filter *.tsx | Select-Object Name | Sort-Object Name
- name: Проверка ID в page.tsx
  command: Get-Content app/page.tsx | Select-String 'id="' | Sort-Object Line
- name: Проверка ссылок в Header.tsx
  command: Get-Content components/layout/Header.tsx | Select-String 'href="#' | Sort-Object Line
- name: Проверка smooth scroll в CSS
  command: Get-Content app/globals.css | Select-String 'scroll-behavior'
- name: Билд проекта
  command: npm run build; if ($LASTEXITCODE -ne 0) { throw 'Build failed' } else { Write-Output 'Build success' }
- name: Проверка out/index.html на ID
  command: Get-Content out/index.html | Select-String 'id="hero|problems|workflow|cases|products|results|about|contact"' | Measure-Object | Select-Object Count

---
TASKS---
# Задачи: main-page-skeleton

## Этап 1: Создание заглушек для недостающих секций и обновление экспортов
- [ ] Создать `components/sections/CasesSection.tsx` (stub с id="cases", TODO текст)
- [ ] Создать `components/sections/ProductLineSection.tsx` (stub с id="products", TODO текст)
- [ ] Создать `components/sections/ResultsSection.tsx` (stub с id="results", TODO текст)
- [ ] Создать `components/sections/AboutSection.tsx` (stub с id="about", TODO текст)
- [ ] Создать `components/sections/CtaFormSection.tsx` (stub с id="contact", TODO текст)
- [ ] Обновить `components/sections/index.ts` (export всех 8 секций)

## Этап 2: Сборка главной страницы, Header и стили для навигации
- [ ] Обновить `app/page.tsx` (собрать <main> с 8 <Section id="..."/>, импорты из sections)
- [ ] Обновить `components/layout/Header.tsx` (sticky <nav> с 8 <a href="#id">)
- [ ] Обновить `app/globals.css` (добавить html { scroll-behavior: smooth; })