# Архитектура

## Обзор
Статический одностраничный лендинг-пейдж (SPA-like) на базе Next.js 15 с App Router и Static Site Generation (SSG). Архитектурный стиль: монолитный фронтенд с полной статической генерацией (next export). Сайт состоит из 8 секций, рендерится на билд-тайме в HTML/CSS/JS. Нет серверного рендера или API. Оптимизировано для скорости, SEO и минимального bundle size (<150 KB gzipped). Деплой на Vercel как статический хостинг.

## Компоненты
- **Root Layout** (`app/layout.tsx`): Общий макет страницы (html, body, metadata, Tailwind, fonts).
- **Главная страница** (`app/page.tsx`): Контейнер для всех 8 секций, скролл-based навигация.
- **Секции** (в `/components/sections/`): 
  - HeroSection
  - ProblemsSection
  - HowWeWorkSection
  - CasesSection (с 3 кейсами)
  - ProductLineSection
  - ResultsSection
  - AboutSection
  - CtaFormSection (с формой)
- **UI-компоненты** (`/components/ui/`): Button, Form, Modal (если нужно для кейсов).
- **Хуки и утилиты** (`/lib/utils/`, `/hooks/`): Zod-валидация формы, форматирование данных.
- **Данные** (`/lib/data/`): Статические TS/JSON файлы (cases.json, texts.ts).

Все компоненты — Server Components по умолчанию, 'use client' только для формы (React Context для state).

## Хранение данных
- Нет баз данных или файлового хранилища.
- Статические данные: TS/JSON файлы в `/lib/data/` (тексты секций, кейсы, продуктовые данные).
- Изображения: Оптимизированные WebP в `public/images/`, загружаются через `next/image`.
- Форма: Данные отправляются напрямую на Formspree (без локального хранения).

## Коммуникация
- Нет внутренних API или серверной коммуникации (SSG).
- Клиент-сайд: Форма использует native FormData + fetch на Formspree endpoint.
- Нет WebSockets, events или message brokers.
- Навигация: Anchor-links для секций (smooth scroll via CSS/JS).

## Инфраструктура
- **Деплой**: Vercel (static export via `next export`), автоматический из GitHub.
- **CI/CD**: Vercel Git integration (preview на PR, production на merge).
- **Мониторинг**: Vercel Analytics + Google Analytics (client-side).
- **Тестирование**: Playwright smoke-тесты (рендер 8 секций + submit формы).
- **Билд**: `next build && next export` → out/ директория для статического хостинга.

## Внешние интеграции
- **Formspree**: Обработка контактной формы (POST на их endpoint, email-уведомления).
- **Next/Image**: Оптимизация изображений (WebP, lazy loading).
- **Tailwind CSS 4**: Стилизация.
- Опционально: Google Fonts (preload в layout).

## Безопасность
- Нет аутентификации, секретов или пользовательских данных на сервере.
- Валидация формы: Zod schema на клиенте (email, имя, сообщение).
- XSS-защита: Next.js escaping по умолчанию, нет `dangerouslySetInnerHTML`.
- CSP: Рекомендуется в `next.config.js` (strict-dynamic для скриптов).
- HTTPS: Автоматически на Vercel.

## Известные компромиссы
- Нет динамического контента (кейсы/тексты фиксированы; для обновлений — redeploy).
- Bundle size: Строго <150 KB (Tailwind purge, tree-shaking).
- Форма: Зависимость от Formspree (downtime = no forms); альтернатива — mailto:.
- Нет PWA/offline (фокус на лендинге).
- Предположения: Все копии на русском; 3 кейса в CasesSection как статический массив; нет модалов (inline expand).