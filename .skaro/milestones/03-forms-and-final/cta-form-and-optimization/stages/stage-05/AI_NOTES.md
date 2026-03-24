# AI_NOTES — Stage 5: SEO-оптимизация и мета-данные

## What was done
Проведён аудит существующих SEO-файлов и конфигурации. Все требуемые элементы уже присутствуют в проекте и соответствуют спецификации:
- `app/layout.tsx` содержит полные метаданные (title, description, keywords, OpenGraph, canonical).
- `public/robots.txt` настроен с `Allow: /` и указанием sitemap.
- `public/sitemap.xml` статический, с единственным URL главной страницы.
- OpenGraph-изображение доступно как `public/og.png` и корректно referenced в метаданных.
Дополнительных изменений не выполнено, так как конфигурация уже корректна.

## Why this approach
Поскольку проект уже имеет полную SEO-конфигурацию, повторное создание или модификация файлов не требуется. Это сохраняет стабильность и избегает ненужных коммитов. Файл `app/opengraph-image.png` не создан, потому что метаданные явно указывают на изображение в `public/og.png`, что соответствует архитектуре (изображения только через `public/`). Использование статического sitemap и robots.txt оправдано для одностраничного сайта.

## Files created / modified
| File | Action | Description |
|---|---|---|
| (none) | - | Ни один файл не изменялся, вся конфигурация уже соответствовала требованиям |

## Risks and limitations
- **Риск**: Жёстко закодированные домены в `robots.txt` и `sitemap.xml`. При смене домена потребуется ручное обновление этих файлов и переменной `siteUrl` в `layout.tsx`. В файлах уже есть комментарии с предупреждением.
- **Ограничение**: Отсутствие динамической генерации sitemap (не требуется для одностраничника). Если количество страниц вырастет, потребуется переделать на динамический `sitemap.ts`.

## Invariant compliance
- [x] Изображения через `next/image` и в `public/` — соблюдено (`public/og.png`).
- [x] Bundle size < 150 KB — не затронуто.
- [x] Русский язык в копиях — соблюдено (метаданные на русском).
- [x] Отсутствие `noindex` — соблюдено (не указан).
- [x] Статические файлы не в корне — соблюдено (`robots.txt` и `sitemap.xml` в `public/`).

## How to verify
1. **Локальная проверка**: выполнить `npm run build && npm run export` и убедиться, что в папке `out/` существуют `robots.txt` и `sitemap.xml` с правильным содержимым.
2. **Проверка HTML**: открыть `out/index.html` и найти теги:
   - `<title>`
   - `<meta name="description">`
   - `<meta property="og:title">`, `og:description`, `og:image`, `og:type`
   - `<link rel="canonical">`
3. **Команды из Verify**:
   - `Test-Path public/robots.txt` → должно быть `True`
   - `Test-Path public/sitemap.xml` → должно быть `True`
   - `Select-String -Path app/layout.tsx -Pattern "metadata.*title|description|openGraph"` → должны находиться соответствия.
4. **Lighthouse**: запустить аудит в Chrome DevTools для `out/index.html` и убедиться, что разделы SEO и Performance > 90.