# Спецификация: cta-form-section

## Контекст
Интерактивная форма с fallback на mailto:.

## User Scenarios
1. **Посетитель: ** Заполняет форму (имя, email, сообщение), отправляет (success/error).
2. **Без Formspree: ** Fallback mailto: открывается.

## Functional Requirements
- FR-01: Form с Zod schema (name, email, message).
- FR-02: fetch на Formspree, timeout fallback mailto:.
- FR-03: React Context для state (loading, error).

## Non-Functional Requirements
- NFR-01: 'use client' только здесь.

## Boundaries (what is NOT included)
- Серверная валидация.

## Acceptance Criteria
- [ ] Форма валидируется.
- [ ] Mock fetch работает.
- [ ] Все 8 секций в page.tsx.

## Open Questions
- Formspree endpoint?