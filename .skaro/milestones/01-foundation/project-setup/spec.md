Вот обновленная спецификация проекта с учетом всех уточнений.

# Спецификация: project-setup

## Контекст
Задача создает базовую структуру проекта для соблюдения конституции: Next.js 15 App Router, Tailwind CSS 4, SSG с next export, ESLint + Prettier. Проект нацелен на высокую производительность и строгое соответствие архитектурным решениям (ADR).

## User Scenarios
1. **Разработчик:** Инициализирует проект и проверяет, что `next dev` запускается без ошибок.
2. **Разработчик:** Запускает `next build` и видит `out/` директорию со статическими файлами, готовыми к деплою.

## Functional Requirements
- **FR-01: Зависимости.** Создать `package.json` с Next.js 15, React 19, Tailwind CSS 4, Zod, TypeScript.
- **FR-02: Стилизация.** Настроить Tailwind CSS с кастомной палитрой в секции `extend`:
    - `primary`: #1B2A4A
    - `accent`: #F59E0B
    - `white`: #FFFFFF
- **FR-03: Конфигурация Next.js.** Настроить `next.config.ts` (или `.js`):
    - `output: 'export'` для статической генерации.
    - `images: { unoptimized: true }` для поддержки `next/image` в статическом режиме.
    - `basePath` оставить пустым (деплой в корень).
- **FR-04: Шрифты.** Интегрировать Google Fonts через `next/font`:
    - **Inter** для основного текста.
    - **Montserrat** для заголовков.
- **FR-05: Типизация и Линтинг.** 
    - Включить `strict: true` в `tsconfig.json`.
    - Настроить ESLint с расширениями `next/core-web-vitals` и `typescript-eslint/recommended`.

## Non-Functional Requirements
- **NFR-01: Производительность.** Bundle size <150 KB gzipped после билда.
- **NFR-02: Качество кода.** Линтинг и форматирование (Prettier) должны проходить без ошибок.
- **NFR-03: ОС.** Полная совместимость команд с Windows PowerShell.

## Boundaries (what is NOT included)
- Создание контентных секций или UI-компонентов (кроме базового Layout).
- Настройка Formspree (только установка Zod).
- Настройка сквозных тестов Playwright (только структура папок).

## Acceptance Criteria
- [ ] Команда `npm run dev` запускает сервер на http://localhost:3000 без ошибок в консоли.
- [ ] Команда `npm run build` успешно генерирует папку `out/` с `index.html`.
- [ ] Tailwind классы (например, `bg-primary`, `text-accent`) корректно применяются и отображаются в браузере.
- [ ] Шрифты Inter и Montserrat загружаются и применяются к соответствующим элементам.
- [ ] Файлы `.prettierrc` и `.eslintrc.json` присутствуют и корректно интерпретируются IDE.
- [ ] `tsconfig.json` содержит `strict: true`.
- [ ] В `next.config.js` установлены `output: 'export'` и `unoptimized: true`.

## Open Questions
*Вопросов нет. Все уточнения интегрированы в спецификацию.*

---
**AI_NOTES:**
- Использовать `lucide-react` в качестве стандартного набора иконок (рекомендовано для Next.js проектов).
- Убедиться, что в `layout.tsx` правильно настроены переменные CSS для шрифтов через `next/font/google`.