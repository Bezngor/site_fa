## Review

### Слабые места (Weaknesses)
- **HIGH**: Зависимость от Formspree для формы (fault tolerance). Остановка сервиса приведёт к полной неработоспособности формы. Рекомендация: Добавить fallback на mailto: ссылку с предзаполненными полями (JS-генерация).
- **MEDIUM**: Обновление статических данных требует redeploy (scalability/maintainability). Для лендинга приемлемо, но при росте контента (больше кейсов) усложнит итерации. Рекомендация: Подтвердить в ADR, рассмотреть CMS как Netlify CMS для Git-based обновлений без кода.
- **MEDIUM**: Ограниченная observability. Только Vercel Analytics + GA, нет error tracking для формы (client-side fetch). Рекомендация: Добавить Sentry (client-side, static-friendly) для JS-ошибок и form submissions.
- **LOW**: Структура компонентов (/components/sections/) не полностью колокирована с routes (app/page.tsx как контейнер). Удобно, но может усложнить навигацию в большом проекте. Рекомендация: Сохранить, так как соответствует LLM rules; добавить index в sections/.
- **LOW**: Нет явного мониторинга bundle size в CI (consistency). Рекомендация: Добавить скрипт в package.json для проверки после build.

### Соответствие Constitution (Constitution compliance)
- Полное соответствие: SSG, Next.js 15 App Router, Tailwind 4, Server Components по умолчанию ('use client' только для формы), React Context только для form state, next/image, Zod client-side, Playwright smoke tests, bundle <150KB, no db/auth, Russian copy.
- Мелкие несоответствия: Colocate "with routes in app/" — частично (page.tsx контейнер), но LLM rules уточняют /components/sections/ — принято как приоритет. Нет упоминания max function length/nesting в архитектуре — добавить в invariants.

### Спорные решения (Controversial decisions)
- **Formspree vs mailto**: Trade-off — удобство (Formspree) vs надёжность (mailto). Альтернатива: Гибрид (fetch → fallback mailto на error/timeout).
- **Нет модалов для кейсов**: Inline expand хорошо для SEO/SSG, но на мобильных может быть UX-issues. Альтернатива: CSS-only accordions (no JS).
- **Статические данные в /lib/data/**: Просто, но не масштабируемо. Альтернатива: MDX для контента (SSG-friendly).

### Рекомендуемые ADR (ADR recommendations)
1. **ADR-001: Обработка контактной формы** — Выбор Formspree + mailto fallback, retry logic.
2. **ADR-002: Структура статических данных** — TS/JSON vs MDX, redeploy workflow.
3. **ADR-003: Client-side boundaries** — 'use client' только для form Context, justification.
4. **ADR-004: Observability stack** — Vercel + GA + Sentry.

### Рекомендуемые диаграммы (Diagrams)
1. **Диаграмма компонентов** (Component diagram): page.tsx → 8 sections, ui/ components.
2. **Поток данных формы** (Data flow diagram): Client Form → Zod → fetch(Formspree) → fallback mailto.
3. **Структура страницы** (Page structure): Layout → page → sections stack с anchor-links.