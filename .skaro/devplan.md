# Development Plan

_Generated: 2026-03-22_

## Фундамент проекта
_Directory: `milestones/01-foundation/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | project-setup | done | — | Инициализация Next.js 15 проекта с App Router, установка зависимостей, настройка ESLint, Prettier, Tailwind CSS 4 и next.config.js для SSG. |
| 2 | data-structures | done | project-setup | Создание статических файлов данных в /lib/data/ для текстов секций, кейсов и продуктов с TypeScript типами. |
| 3 | root-layout | done | project-setup | Реализация app/layout.tsx с metadata, Tailwind, шрифтами и базовым HTML-структурой для SEO. |

## Основные секции
_Directory: `milestones/02-core-sections/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | hero-section | done | root-layout, data-structures | Создание HeroSection с заголовком, подзаголовком, CTA и фоновым изображением. |
| 2 | problems-section | done | root-layout, data-structures | ProblemsSection с списком проблем клиентов в формате grid/list. |
| 3 | how-we-work-section | done | root-layout, data-structures | HowWeWorkSection с шагами процесса (3-5 шагов). |
| 4 | main-page-skeleton | done | root-layout | app/page.tsx как контейнер для секций с smooth scroll навигацией. |

## Кейсы и продукты
_Directory: `milestones/03-cases-products/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | cases-section | done | data-structures, main-page-skeleton | CasesSection с inline expand (accordion) для 3 кейсов из cases.json. Используется раскрывающийся блок вместо модальных окон (ADR-007). |
| 2 | product-line-section | done | data-structures, main-page-skeleton | ProductLineSection с карточками продуктов. |

## Результаты, о нас и CTA
_Directory: `milestones/04-results-about-cta/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | results-section | done | data-structures, main-page-skeleton | ResultsSection: заголовок, вводный текст, три колонки с буллетами из данных (без отдельных графиков). |
| 2 | about-section | done | data-structures, main-page-skeleton | AboutSection с информацией о компании на главной. |
| 3 | cta-form-section | done | data-structures, main-page-skeleton | 'use client' CtaFormSection: поля имя, email, телефон, сообщение; Zod; Formspree через NEXT_PUBLIC_FORMSPREE_ID; honeypot _gotcha; таймаут 12 с; fallback mailto и NEXT_PUBLIC_CONTACT_EMAIL. UI-компоненты в components/ui. |

## Оптимизации и инфраструктура
_Directory: `milestones/05-optimizations/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | images-optimization | done | cta-form-section | Локальные WebP в public/images/, next/image для Hero и Cases; export через next build; images.unoptimized; ProductLine/About — Lucide без растровых карточек/фото. Детали: `.skaro/milestones/05-optimizations/images-optimization/AI_NOTES.md`. |
| 2 | ui-components | done | project-setup | Общие UI: Button, FormInput в /components/ui/. |
| 3 | seo-metadata | done | images-optimization | layout + public: `metadataBase` из `NEXT_PUBLIC_SITE_URL` с fallback, title/description/keywords, Open Graph + Twitter (`summary_large_image`), robots meta, authors/creator, canonical; `public/robots.txt`, `sitemap.xml`, `og.png`; `AI_NOTES.md`, `verify.yaml`. Favicon/`metadata.icons` и schema.org — опционально позже. Детали: `.skaro/milestones/05-optimizations/seo-metadata/AI_NOTES.md`. |

## Тестирование и деплой
_Directory: `milestones/06-testing-deployment/`_

| # | Task | Status | Dependencies | Description |
|---|------|--------|--------------|-------------|
| 1 | playwright-tests | planned | seo-metadata | Playwright smoke-тесты: рендер 8 секций + form submit. |
| 2 | vercel-deploy-config | planned | playwright-tests | Vercel настройки: vercel.json, Git integration (ADR-004). Настройка environment variables для Formspree ID. |

---

## Status Legend
- **idea** — not yet scoped
- **planned** — scoped, assigned to milestone
- **in-progress** — actively being developed
- **done** — completed and reviewed
- **cut** — removed from scope (with reason)

## Change Log

- 2026-03-25: Закрыт блок AG-SEO-03 (синхронизация milestone seo-metadata с кодом). `seo-metadata` → done. Обновлены `spec.md`, `plan.md`, `tasks.md`, `clarifications.md` под факт: env + fallback, OG/Twitter, статические robots/sitemap/og.png, без обязательного Stage 2 (валидатор/docs); журнал в `.cursor/plans/seo-metadata-agent-blocks.plan.md` §6.
- 2026-03-25: Закрыт блок AG-IO-03 (документация и verify milestone images-optimization). `images-optimization` → done. Спецификация и план приведены к факту: локальные WebP, `npm run build` вместо несуществующего `npm run export`, исключения ProductLine (Lucide) и About (без фото), исправлен `verify.yaml`, добавлен `AI_NOTES.md`.
- 2026-03-24: Закрыт блок AG-CF-05 (регрессия и документация). `cta-form-section` → done; `results-section`, `about-section` → done по фактической главной; `seo-metadata` → in-progress с уточнением: базовые meta/OG/robots/sitemap/og уже в репозитории, schema.org вне текущего объёма. Подробности в `.skaro/milestones/03-forms-and-final/cta-form-and-optimization/AI_NOTES.md`.
- 2026-03-22 (обновление 3): Синхронизированы статусы на основе фактического прогресса. Задачи cases-section и product-line-section переведены в 'done' (progress=83%, все stages завершены). Все задачи из milestones 01-foundation, 02-core-sections и 03-cases-products теперь имеют статус 'done'. Остальные задачи (04-results-about-cta, 05-optimizations частично, 06-testing-deployment) остаются 'planned' с progress=16%.
- 2026-03-22 (обновление 2): Синхронизированы статусы на основе фактического прогресса задач. cases-section переведена в 'in-progress' (progress=83%, stage 4/4 в content-sections-and-cases). Обновлены описания задач с учетом ADR-007 (inline expand для кейсов, SVG-графика, env variables для Formspree). Уточнены зависимости и описания для cta-form-section и images-optimization.
- 2026-03-22: Синхронизированы статусы задач на основе текущего состояния прогресса. Задачи с progress=83% и завершенными stages (project-setup, data-structures, root-layout, hero-section, problems-section, how-we-work-section, main-page-skeleton, ui-components) отмечены как 'done'. Остальные задачи с progress=16% оставлены как 'planned'.
- 2026-03-21: Confirmed 17 tasks: 01-foundation/project-setup, 01-foundation/data-structures, 01-foundation/root-layout, 02-core-sections/hero-section, 02-core-sections/problems-section, 02-core-sections/how-we-work-section, 02-core-sections/main-page-skeleton, 03-cases-products/cases-section, 03-cases-products/product-line-section, 04-results-about-cta/results-section, 04-results-about-cta/about-section, 04-results-about-cta/cta-form-section, 05-optimizations/images-optimization, 05-optimizations/ui-components, 05-optimizations/seo-metadata, 06-testing-deployment/playwright-tests, 06-testing-deployment/vercel-deploy-config
- 2026-03-21: Initial plan created with 17 tasks across 6 milestones