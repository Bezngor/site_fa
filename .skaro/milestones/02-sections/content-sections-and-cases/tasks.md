# Tasks: content-sections-and-cases

## Этап 1: Подготовка данных
- [ ] Создать lib/data/cases.ts → 3 кейса с "Задача/Решение/Результат"
- [ ] Обновить lib/data/texts.ts → добавить ТОЛЬКО: hero, problems, results, about (howWeWork не трогать)
- [ ] Обновить lib/data/products.ts → массив категорий продуктов
- [ ] Дополнить types/index.ts → интерфейсы Case, SectionText, ProductCategory (существующие не трогать)

## Этап 2: Реализация статических секций
- [ ] components/sections/HeroSection.tsx → заголовок + подзаголовок + CTA
- [ ] components/sections/ProblemsSection.tsx → 4 боли с Lucide-иконками
- [ ] components/sections/ResultsSection.tsx → показатели
- [ ] components/sections/AboutSection.tsx → текст о компании
- [ ] components/sections/ProductLineSection.tsx → маркированный список категорий
- [ ] HowWeWorkSection.tsx — НЕ ТРОГАТЬ

## Этап 3: CasesSection
- [ ] components/sections/CasesSection.tsx → 'use client', useState boolean[3], аккордеон, ChevronDown из lucide-react
- [ ] app/globals.css → добавить стили .accordion-content для CSS transitions

## Этап 4: Интеграция
- [ ] app/layout.tsx → проверить/обновить metadata (title, description, lang="ru")
- [ ] next.config.js → подтвердить output: 'export'
- [ ] app/page.tsx — НЕ ТРОГАТЬ
- [ ] components/sections/index.ts — НЕ ТРОГАТЬ