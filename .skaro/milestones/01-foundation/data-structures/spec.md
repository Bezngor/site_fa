# Спецификация: data-structures

## Контекст
Статические TS/JSON файлы обеспечивают типобезопасность и нулевую задержку (ADR-003).

## User Scenarios
1. **Компонент: ** Импортирует данные из /lib/data/texts.ts и рендерит текст секции.
2. **Компонент CasesSection: ** Читает cases.json с 3 кейсами.

## Functional Requirements
- FR-01: Создать texts.ts с типами для текстов 8 секций (heroTitle, problemsList и т.д.).
- FR-02: Создать cases.json с 3 кейсами (каждый: title, description, image, metrics).
- FR-03: Создать products.ts для ProductLineSection (массив продуктов).

## Non-Functional Requirements
- NFR-01: Полная типизация TypeScript без ошибок компиляции.

## Boundaries (what is NOT included)
- Изображения (добавятся позже).
- Динамические данные.

## Acceptance Criteria
- [ ] Файлы экспортируют типизированные данные.
- [ ] tsc --noEmit проходит без ошибок.
- [ ] Данные на русском языке.

## Open Questions
- Точные метрики для кейсов (ROI, рост)?