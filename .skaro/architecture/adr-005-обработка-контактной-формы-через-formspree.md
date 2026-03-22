# ADR-005: Обработка контактной формы через Formspree

**Status:** accepted
**Date:** 2026-03-21

## Context
Нужен способ отправки форм без backend, с email-уведомлениями и валидацией.

## Decision
Formspree: client-side fetch на их endpoint, Zod-валидация, нет секретов или сервера. При ошибке fetch (timeout / downtime) — автоматический 
fallback: JS генерирует mailto:-ссылку с предзаполненными полями (имя, email, сообщение) и открывает её через window.location.

## Alternatives
1. **mailto: ссылка:** Native email — отвергнуто из-за плохого UX (открытие клиента) и отсутствия валидации.
2. **EmailJS:** Альтернатива — отвергнуто из-за дополнительных API-ключей и потенциального bundle size.

## Consequences
- Positive: Простота интеграции, спам-фильтры, аналитика отправок.
- Negative: Зависимость от внешнего сервиса. При downtime — fallback на mailto: (открытие почтового клиента пользователя).
- Risks: Ограничения на бесплатный план (50 submit/мес).