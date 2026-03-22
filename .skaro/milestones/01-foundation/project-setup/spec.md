# Спецификация: project-setup

## Контекст
Задача создает базовую структуру проекта для соблюдения конституции: Next.js 15 App Router, Tailwind CSS 4, SSG с next export, ESLint + Prettier.

## User Scenarios
1. **Разработчик: ** Инициализирует проект и проверяет, что `next dev` запускается без ошибок.
2. **Разработчик: ** Запускает `next build && next export` и видит out/ директорию со статическими файлами.

## Functional Requirements
- FR-01: Создать package.json с Next.js 15, React 18, Tailwind CSS 4, Zod, TypeScript.
- FR-02: Настроить tailwind.config.ts с цветовой палитрой (primary #1B2A4A, accent #F59E0B, white #FFFFFF).
- FR-03: Настроить next.config.js с output: 'export', images.domains для Vercel.

## Non-Functional Requirements
- NFR-01: Bundle size <150 KB после билда (Tailwind purge).
- NFR-02: Линтинг и форматирование без ошибок.

## Boundaries (what is NOT included)
- Создание секций или UI-компонентов.
- Настройка Formspree или тестов.

## Acceptance Criteria
- [ ] `next dev` работает на http://localhost:3000.
- [ ] `next build && next export` генерирует out/index.html.
- [ ] Tailwind классы компилируются (проверить в dev).
- [ ] .prettierrc и .eslintrc.json настроены.

## Open Questions
- Какие Google Fonts использовать (если нужны)?