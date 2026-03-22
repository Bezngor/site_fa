# ADR-002: Использовать Tailwind CSS 4 для стилизации

**Status:** accepted
**Date:** 2026-03-21

## Context
Нужен быстрый способ стилизации лендинга с purge для минимального CSS, без CSS Modules или кастомных стилей.

## Decision
Tailwind CSS 4 выбран за utility-first подход, отличный purge (tree-shaking), интеграцию с Next.js и поддержку новой цветовой палитры проекта.

## Alternatives
1. **CSS Modules:** Локальные стили — отвергнуто из-за большего объема кода и отсутствия готовых утилит для responsive дизайна.
2. **Chakra UI или Headless UI:** Компонентная библиотека — отвергнуто из-за лишнего bundle size и несоответствия требованию Tailwind only.

## Consequences
- Positive: Быстрая разработка, минимальный итоговый CSS (<10 KB после purge), responsive по умолчанию.
- Negative: Кривая обучения для новичков, потенциально verbose HTML.
- Risks: Переизбыток классов может усложнить поддержку без linting.