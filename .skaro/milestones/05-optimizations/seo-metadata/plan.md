# План реализации: seo-metadata

## Реализованный объём (layout, public, env)

**Цель (достигнута):** Централизованные SEO-метаданные в `app/layout.tsx`, `metadataBase` из `NEXT_PUBLIC_SITE_URL` с fallback, Open Graph и Twitter Cards, статические `public/robots.txt`, `public/sitemap.xml`, `public/og.png`, документ `AI_NOTES.md`, проверки в `verify.yaml`.

**Зависимости:** по devplan — после `images-optimization` (фактически метаданные не блокируются контентом изображений).

**Артефакты:**

- `app/layout.tsx` — `metadata`: `metadataBase`, `title`, `description`, `keywords`, `robots`, `authors`, `creator`, `openGraph` (в т.ч. `locale: 'ru_RU'`, `siteName`, изображение `/og.png` 1200×630), `twitter` (`summary_large_image`), `alternates.canonical`.
- `.env.example` — `NEXT_PUBLIC_SITE_URL` с комментарием (prod / превью).
- `.skaro/milestones/05-optimizations/seo-metadata/AI_NOTES.md` — структура metadata, env, копирайт ≠ шаблон Skaro, чеклист деплоя, опциональные favicon/валидатор.

**Definition of Done (факт):**

- [x] Экспорт `metadata` типа `Metadata` из `next` в `app/layout.tsx`.
- [x] Поля: `title`, `description`, `keywords`, `authors`, `creator`, `robots`.
- [x] `openGraph`: `type: 'website'`, `locale: 'ru_RU'`, `siteName`, title, description, images с относительным URL `/og.png` и размерами.
- [x] `twitter`: `card: 'summary_large_image'`, согласованные title/description/images.
- [x] `metadataBase: new URL(...)` из `process.env.NEXT_PUBLIC_SITE_URL` с fallback `https://factoryall.ru`.
- [x] `<html lang="ru">`.
- [x] `.env.example` содержит `NEXT_PUBLIC_SITE_URL`.
- [x] `AI_NOTES.md` описывает структуру, env, копирайт, пути к OG/robots/sitemap, чеклист шаринга.

**Не в репозитории по умолчанию (KISS):**

- `metadata.icons` — в `public/` нет выделенных favicon/apple-touch под Next metadata; при появлении файлов — добавить в layout (см. `AI_NOTES.md`).
- `lib/utils/seo-validator.ts`, `docs/SEO.md` — не вводились; при необходимости gate — отдельная задача.

**Риски (закрытые меры):**

- Пустой `NEXT_PUBLIC_SITE_URL` в production → fallback на канонический prod-origin в коде + документирование в `.env.example` и `AI_NOTES.md`.
- Дублирование метаданных с `page.tsx` → метаданные только в layout для одностраничника.

---

## Verify

Команды соответствуют [.skaro/milestones/05-optimizations/seo-metadata/verify.yaml](verify.yaml) (запуск из корня репозитория):

```yaml
- name: Проверка типов TypeScript
  command: npx tsc --noEmit

- name: ESLint (только существующие файлы SEO-зоны)
  command: npx eslint app/layout.tsx --max-warnings 0

- name: Prettier (только существующие файлы SEO-зоны)
  command: npx prettier --check app/layout.tsx

- name: Сборка проекта
  command: npm run build

- name: Наличие public/robots.txt, sitemap.xml, og.png
  command: node -e "const fs=require('fs'); const paths=['public/robots.txt','public/sitemap.xml','public/og.png']; for (const p of paths){ if(!fs.existsSync(p)){ console.error('Missing:', p); process.exit(1);} } console.log('OK:', paths.length, 'files');"
```
