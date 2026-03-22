# ADR-004: Деплой на Vercel с использованием next export для статического хостинга

**Status:** accepted
**Date:** 2026-03-21

## Context
Требовался простой, бесплатный хостинг для статического сайта с CI/CD, аналитикой и HTTPS.

## Decision
Vercel с next export: автоматический деплой из GitHub, preview на PR, статика в out/, поддержка Next.js фич.

## Alternatives
1. **Netlify:** Аналогичный статический хост — отвергнуто из-за лучшей нативной интеграции Vercel с Next.js (аналитика, edge).
2. **GitHub Pages:** Бесплатный — отвергнуто из-за отсутствия preview/PR и сложностей с Next.js export.

## Consequences
- Positive: Бесплатно, быстро, встроенная аналитика, глобальный CDN.
- Negative: Зависимость от Vercel (vendor lock-in).
- Risks: Лимиты на bandwidth для бесплатного плана.