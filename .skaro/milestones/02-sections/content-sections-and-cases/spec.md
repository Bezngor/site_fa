# Specification: content-sections-and-cases

## Context
Основной контент лендинга, включая интерактивный блок кейсов.

## Requirements
- Реализовать секции: Hero, Problems (4 боли), HowWeWork (5 этапов), Results, About, ProductLine.
- В `CasesSection` создать карточки с механизмом аккордеона (inline expand) для 3 кейсов.
- Использовать SVG-иконки (Lucide-react или кастомные) для визуализации этапов и преимуществ.
- Данные для кейсов брать из `/lib/data/cases.ts`.

## Acceptance Criteria
- Все секции адаптивны.
- Кейсы раскрываются/закрываются по клику без использования модальных окон.
- Использование Server Components для всех информационных блоков.