# Development Plan

_Generated: 2026-03-21_

## Фундамент проекта
_Directory: `milestones/01-foundation/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | project-setup | planned | — | Инициализация Next.js 15 проекта с App Router, установка зависимостей, настройка ESLint, Prettier, Tailwind CSS 4 и next.config.js для SSG. |
| 2 | data-structures | planned | project-setup | Создание статических файлов данных в /lib/data/ для текстов секций, кейсов и продуктов с TypeScript типами. |
| 3 | root-layout | planned | project-setup | Реализация app/layout.tsx с metadata, Tailwind, шрифтами и базовым HTML-структурой для SEO. |

## Основные секции
_Directory: `milestones/02-core-sections/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | hero-section | planned | root-layout, data-structures | Создание HeroSection с заголовком, подзаголовком, CTA и фоновым изображением. |
| 2 | problems-section | planned | root-layout, data-structures | ProblemsSection с списком проблем клиентов в формате grid/list. |
| 3 | how-we-work-section | planned | root-layout, data-structures | HowWeWorkSection с шагами процесса (3-5 шагов). |
| 4 | main-page-skeleton | planned | root-layout | app/page.tsx как контейнер для секций с smooth scroll навигацией. |

## Кейсы и продукты
_Directory: `milestones/03-cases-products/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | cases-section | planned | data-structures, main-page-skeleton | CasesSection с каруселью или grid 3 кейсов из cases.json. |
| 2 | product-line-section | planned | data-structures, main-page-skeleton | ProductLineSection с карточками продуктов. |

## Результаты, о нас и CTA
_Directory: `milestones/04-results-about-cta/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | results-section | planned | data-structures, main-page-skeleton | ResultsSection с ключевыми метриками (числа, графики). |
| 2 | about-section | planned | data-structures, main-page-skeleton | AboutSection с информацией о компании. |
| 3 | cta-form-section | planned | data-structures, main-page-skeleton | 'use client' CtaFormSection с формой, Zod валидацией и Formspree (ADR-005, ADR-006). |

## Оптимизации и инфраструктура
_Directory: `milestones/05-optimizations/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | images-optimization | planned | cta-form-section | Добавление WebP изображений в public/images/, использование next/image во всех секциях. |
| 2 | ui-components | planned | project-setup | Общие UI: Button, FormInput в /components/ui/. |
| 3 | seo-metadata | planned | images-optimization | Расширение metadata, OpenGraph, schema.org в layout и page. |

## Тестирование и деплой
_Directory: `milestones/06-testing-deployment/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | playwright-tests | planned | seo-metadata | Playwright smoke-тесты: рендер 8 секций + form submit. |
| 2 | vercel-deploy-config | planned | playwright-tests | Vercel настройки: vercel.json, Git integration (ADR-004). |

---

## Status Legend
- **idea** — not yet scoped
- **planned** — scoped, assigned to milestone
- **in-progress** — actively being developed
- **done** — completed and reviewed
- **cut** — removed from scope (with reason)

## Change Log

- 2026-03-21: Confirmed 17 tasks: 01-foundation/project-setup, 01-foundation/data-structures, 01-foundation/root-layout, 02-core-sections/hero-section, 02-core-sections/problems-section, 02-core-sections/how-we-work-section, 02-core-sections/main-page-skeleton, 03-cases-products/cases-section, 03-cases-products/product-line-section, 04-results-about-cta/results-section, 04-results-about-cta/about-section, 04-results-about-cta/cta-form-section, 05-optimizations/images-optimization, 05-optimizations/ui-components, 05-optimizations/seo-metadata, 06-testing-deployment/playwright-tests, 06-testing-deployment/vercel-deploy-config
- 2026-03-21: Initial plan created with 17 tasks across 6 milestones