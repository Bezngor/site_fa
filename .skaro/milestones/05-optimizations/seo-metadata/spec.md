# Спецификация: seo-metadata

## Контекст

Настройка SEO-параметров и метаданных для лендинга на базе Next.js 15 (App Router) для корректного отображения в поисковых системах и социальных сетях.

## User Scenarios

1. **Поисковый робот:** Индексирует страницу, считывая заголовок, описание и канонический URL.
2. **Социальные сети / мессенджеры:** Парсят Open Graph (OG) для превью (изображение, заголовок, описание).
3. **Бот:** Проверяет наличие и корректность путей к OG-изображению.

## Functional Requirements

- **FR-01: Централизованное управление метаданными.** Все метаданные (title, description, OG, Twitter, robots, authors/creator, canonical) заданы в `app/layout.tsx` — одностраничный лендинг.
- **FR-02: Базовый URL и абсолютные ссылки.** Используется `NEXT_PUBLIC_SITE_URL` (с fallback на продакшен-origin из кода, сейчас `https://factoryall.ru`) в `metadataBase`; путь к OG — относительный `/og.png`; Next.js формирует абсолютные URL в `<head>`.
- **FR-03: Open Graph.** `og:type` website, `og:site_name`, `og:locale` ru_RU, title, description, image (через `openGraph.images`).
- **FR-04: Twitter Cards.** `twitter:card` = `summary_large_image`, согласованные title/description/images с OG.
- **FR-05: Локализация.** Явно: `openGraph.locale: 'ru_RU'`, `<html lang="ru">`.

Тексты **title** / **description** / **keywords** — копирайт лендинга и [.cursor/docs/Pozitsionirovanie-FactoryAll.md](../../../../.cursor/docs/Pozitsionirovanie-FactoryAll.md), не шаблонные формулировки из старого примера Skaro.

## Non-Functional Requirements

- **NFR-01: SSG.** Метаданные статические, собираются на этапе `next build` / export.
- **NFR-02: Производительность.** API `Metadata` из `next`.

## Boundaries (what is NOT included)

- Google Analytics / Яндекс.Метрика — отдельно.
- Программная генерация `sitemap.xml` / `robots.txt` — используются статические файлы в `public/`.
- `lib/utils/seo-validator.ts` и отдельный `docs/SEO.md` — опционально; по умолчанию достаточно `AI_NOTES.md` и `verify.yaml`.

## Acceptance Criteria

- [x] Метаданные заданы через экспорт `metadata` в `app/layout.tsx`.
- [x] В выводе head присутствуют OG-теги (title, description, image, type, site_name, locale) и Twitter Card `summary_large_image`.
- [x] Абсолютные URL к OG строятся от `metadataBase` и заданного в окружении или fallback базового URL.
- [x] У корневого `<html>` атрибут `lang="ru"`.
- [x] В `public/` доступны по прямым путям `robots.txt`, `sitemap.xml`, `og.png`.

## Open Questions

Нет открытых вопросов по текущему объёму.

---

### AI_NOTES (кратко для spec)

- Fallback в коде: `https://factoryall.ru`, если `NEXT_PUBLIC_SITE_URL` не задан; для локальной отладки превью задайте URL в `.env.local` (см. `AI_NOTES.md` в этой папке).
