# Specification: cta-form-and-integration

## Context
Финальный блок конверсии и техническая оптимизация.

## Requirements
- Создать `CtaFormSection` ('use client').
- Поля: Имя, Email, Телефон (валидация Zod).
- Отправка на Formspree с использованием `NEXT_PUBLIC_FORMSPREE_ID`.
- Реализовать fallback: при ошибке API показывать ссылку `mailto:`.
- Настроить `robots.txt`, `sitemap.xml` и мета-теги для SEO.

## Acceptance Criteria
- Форма валидируется перед отправкой.
- Успешная отправка данных (имитация или реальный ID).
- Bundle size < 150 KB gzipped.
- Lighthouse score по Performance и SEO > 90.