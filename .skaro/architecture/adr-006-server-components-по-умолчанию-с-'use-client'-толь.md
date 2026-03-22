# ADR-006: Server Components по умолчанию с 'use client' только для интерактивных частей

**Status:** accepted
**Date:** 2026-03-21

## Context
Оптимизация bundle size и производительности в Next.js 15 App Router.

## Decision
Все секции как Server Components; 'use client' только для CtaFormSection (React Context для state).

## Alternatives
1. **Все 'use client':** Полный клиентский рендер — отвергнуто из-за большего JS-bundle и худшей начальной загрузки.
2. **Pages Router:** Legacy — отвергнуто из-за устаревания и отсутствия RSC.

## Consequences
- Positive: Минимальный JS (<150 KB), лучше SEO и Core Web Vitals.
- Negative: Ограничения RSC (нет useState без 'use client').
- Risks: Неправильное использование приведет к гидратации ошибкам.