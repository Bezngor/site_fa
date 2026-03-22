# Спецификация: root-layout

## Контекст
Корневой макет обеспечивает общую структуру, metadata для SEO и Tailwind (ADR-001).

## User Scenarios
1. **Посетитель: ** Видит title, description в <head> и загружает шрифты.
2. **Бот: ** Парсит metadata для индексации.

## Functional Requirements
- FR-01: Добавить Metadata с title, description на русском.
- FR-02: Подключить Tailwind и Google Fonts (preload).
- FR-03: Базовый body с max-w-7xl mx-auto.

## Non-Functional Requirements
- NFR-01: Preload шрифтов для LCP <2.5s.

## Boundaries (what is NOT included)
- Секции страницы.

## Acceptance Criteria
- [ ] View source показывает metadata.
- [ ] Нет гидратационных ошибок.
- [ ] Tailwind работает.

## Open Questions
- Точное описание сайта для metadata?