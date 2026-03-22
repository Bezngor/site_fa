# AI_NOTES — Этап 4: Реализация HeroSection

## Что было сделано
- Обновлены типы в `types/index.ts` для поддержки структуры данных Hero.
- Добавлены тексты в `lib/data/texts.ts`.
- Настроен `scroll-behavior: smooth` в `app/globals.css`.
- Создан компонент `components/sections/HeroSection.tsx` с использованием `next/image` (WebP, priority) и градиентным оверлеем.
- Интегрирован `HeroSection` в `app/page.tsx`.
- Добавлен экспорт компонента через `components/sections/index.ts`.

## Почему выбран такой подход
- Использование `next/image` с `fill` и `priority` обеспечивает оптимальный LCP.
- Якорная ссылка на `#cta-form` позволяет реализовать навигацию без дополнительного JS, используя CSS `scroll-behavior`.
- Компонент является Server Component, что соответствует требованиям SSG.

## Файлы созданы / изменены
| Файл | Действие | Описание |
|---|---|---|
| `types/index.ts` | изменено | Добавлены интерфейсы HeroTexts |
| `lib/data/texts.ts` | изменено | Добавлены данные для Hero |
| `app/globals.css` | изменено | Добавлен плавный скролл |
| `components/sections/HeroSection.tsx` | создано | Компонент Hero-секции |
| `components/sections/index.ts` | создано | Индексный файл секций |
| `app/page.tsx` | изменено | Интеграция HeroSection |

## Риски и ограничения
- Требуется наличие файла `/public/images/hero-bg.webp`.

## Invariant compliance
- [x] TypeScript — соблюдено.
- [x] Server Components — соблюдено.
- [x] Tailwind CSS 4 — соблюдено.
- [x] Отсутствие серверного рантайма — соблюдено.

## Как проверить
1. Запустить `npm run build` для проверки сборки.
2. Проверить отображение заголовка и кнопки на главной странице.
3. Убедиться, что клик по кнопке вызывает плавный скролл.