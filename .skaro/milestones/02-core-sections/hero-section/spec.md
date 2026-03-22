# Спецификация: hero-section

## Контекст
Hero — первая секция для привлечения внимания, с акцентом на primary цвета (ADR-002).

## User Scenarios
1. **Посетитель: ** Видит hero на главной странице, кликает CTA (smooth scroll).

## Functional Requirements
- FR-01: Импорт текста из texts.ts, рендер h1, p, Button.
- FR-02: Фоновое изображение via next/image (WebP).
- FR-03: Anchor-link на CtaFormSection.

## Non-Functional Requirements
- NFR-01: Responsive (mobile-first).

## Boundaries (what is NOT included)
- Button компонент (создать inline или в ui позже).

## Acceptance Criteria
- [ ] Секция рендерится в page.tsx.
- [ ] Изображение оптимизировано.
- [ ] Smooth scroll работает.

## Open Questions
- Путь к hero изображению?