# Tasks: seo-metadata

## Выполнено: метаданные и статика

- [x] Импорт типа `Metadata` из `next` в `app/layout.tsx`
- [x] Базовый URL: `metadataBase` из `NEXT_PUBLIC_SITE_URL` с fallback `https://factoryall.ru` → `app/layout.tsx`
- [x] Объект `metadata`: `title`, `description`, `keywords`, `authors`, `creator`, `robots` → `app/layout.tsx`
- [x] Объект `openGraph`: type, locale, siteName, title, description, images (`/og.png`) → `app/layout.tsx`
- [x] Объект `twitter`: `card: 'summary_large_image'` → `app/layout.tsx`
- [x] `alternates.canonical` → `app/layout.tsx`
- [x] Атрибут `lang="ru"` на `<html>` → `app/layout.tsx`
- [x] Переменная `NEXT_PUBLIC_SITE_URL` в `.env.example`
- [x] `AI_NOTES.md` в milestone: структура metadata, env, копирайт, пути, чеклист деплоя
- [x] `verify.yaml`: tsc, eslint/prettier для `app/layout.tsx`, build, проверка `public/*` через Node

## Опционально / вне текущего объёма

- [ ] `metadata.icons` (после добавления файлов в `public/`) → `app/layout.tsx`
- [ ] `lib/utils/seo-validator.ts` и использование в тестах — только при явной потребности в gate
- [ ] `docs/SEO.md` — только при отдельном согласовании на отдельный markdown в репозитории
