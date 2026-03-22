# Спецификация: images-optimization

## Контекст
Оптимизация для Core Web Vitals (ADR-001).

## User Scenarios
1. **Посетитель: ** Изображения lazy-load, WebP.

## Functional Requirements
- FR-01: next/image с sizes, priority для hero.
- FR-02: 10-15 изображений (hero, cases и т.д.).

## Non-Functional Requirements
- NFR-01: LCP <2.5s.

## Boundaries (what is NOT included)
- Генерация изображений.

## Acceptance Criteria
- [ ] Нет ошибок изображений.
- [ ] Bundle <150 KB.

## Open Questions
- Список изображений?