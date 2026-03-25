# SEO metadata — заметки для агентов и деплоя

## Структура `metadata` в `app/layout.tsx`

- **`metadataBase`:** `new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://factoryall.ru')` — база для абсолютных URL в `<head>` (OG, canonical и т.д.).
- **`title` / `description` / `keywords`:** копирайт лендинга (MES, цифровой контур, ИИ при надёжных данных); не подменять текстом из шаблона Skaro.
- **`robots`:** `{ index: true, follow: true }` (дублирует намерение с `public/robots.txt`).
- **`authors` / `creator`:** бренд FactoryAll.
- **`openGraph`:** `type: 'website'`, `locale: 'ru_RU'`, `url: '/'`, `siteName`, `images` — объект с **`url: '/og.png'`**, размеры 1200×630, `alt`.
- **`twitter`:** `card: 'summary_large_image'`, те же title/description/images, что и у OG.
- **`alternates.canonical`:** `'/'`.

Относительные пути к картинкам (`/og.png`) корректны: Next.js строит абсолютные URL от `metadataBase`.

## `metadataBase` и переменные окружения

- **Prod / превью:** в `.env` или панели хостинга задайте `NEXT_PUBLIC_SITE_URL` на канонический origin (например `https://factoryall.ru` или URL превью Vercel).
- **Локально:** при проверке превью шаринга задайте в `.env.local` `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (или ваш порт).
- При смене домена синхронизируйте **`public/robots.txt`** и **`public/sitemap.xml`** с тем же хостом, что и в env/fallback.

## Почему копирайт ≠ эталон из шаблона Skaro

В шаблоне Skaro встречаются другие формулировки (узкий MES, жёсткие проценты в description, пример OG `og-image.png`). Для этого репозитория принят **копирайт главной** и позиционирование из [.cursor/docs/Pozitsionirovanie-FactoryAll.md](../../../../.cursor/docs/Pozitsionirovanie-FactoryAll.md): MES и цифровой контур, без подмены на «эталонный» текст milestone. OG-файл в проекте — **`og.png`**, не `og-image.png`.

## Статические пути (канон репозитория)

| Файл            | Путь в репо        | Назначение                          |
| --------------- | ------------------ | ----------------------------------- |
| Open Graph      | `public/og.png`    | Превью в соцсетях; в meta — `/og.png` |
| robots          | `public/robots.txt`| Правила обхода для ботов            |
| Карта сайта     | `public/sitemap.xml` | URL главной и метаданные        |

## Чеклист перед / после деплоя

1. **Переменные:** на окружении задан корректный `NEXT_PUBLIC_SITE_URL`.
2. **Файлы:** в `public/` есть `robots.txt`, `sitemap.xml`, `og.png` (см. `verify.yaml` в этой папке).
3. **Ручная проверка шаринга (после выкладки на публичный URL):**
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — сброс кэша при смене OG.
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — превью постов.
   - По желанию: [Twitter/X Card Validator](https://cards-dev.twitter.com/validator) (если доступен), [VK отладчик](https://vk.com/dev/open_graph) при релевантности.
4. **HTML:** открыть главную, убедиться в `<title>`, `meta description`, OG и Twitter-тегах.

## Опционально (не в репозитории по умолчанию)

- **`lib/utils/seo-validator.ts` / `docs/SEO.md`:** только если нужен отдельный gate; иначе достаточно этого файла и `verify.yaml`.
- **Favicon / `metadata.icons`:** в `public/` пока нет отдельных файлов иконок под Next `metadata.icons` — добавить по желанию и прописать пути в `app/layout.tsx`.
