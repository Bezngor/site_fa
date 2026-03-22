## Этап 1: Реализация компонентов Header и Footer

**Цель:** Создать полнофункциональные компоненты Header и Footer как Server Components, используя данные из lib/data/navigation.ts и lib/data/texts.ts. Header — фиксированная навигация с anchor-ссылками на секции, Footer — с копирайтом и контактами. Обеспечить адаптивность (max-w-7xl для контента) и цветовую схему (primary #1B2A4A, accent #F59E0B).

**Зависит от:** Нет (файлы данных существуют)

**Входы:** lib/data/navigation.ts, lib/data/texts.ts, tailwind.config.ts (для цветов), спецификация (светлая тема)

**Выходы:**
- components/layout/Header.tsx (обновить/реализовать)
- components/layout/Footer.tsx (создать)

**Критерии завершения (DoD):**
- [ ] Header отображает логотип, навигационные ссылки (anchor на секции: Hero, Problems и т.д.) и кнопку CTA с amber акцентом
- [ ] Footer содержит копирайт, контакты (email из texts.ts) и ссылки на соцсети (если в данных)
- [ ] Оба компонента используют Tailwind: max-w-7xl mx-auto для контейнера, primary цвет для текста, responsive (mobile: hamburger если нужно)
- [ ] Нет 'use client', чистые Server Components
- [ ] TypeScript типы из types/index.ts (если применимо)
- [ ] Код <40 строк на функцию, nesting <3

**Риски:** Несоответствие данных в lib/data/ (решение: использовать заглушки из spec); перегрузка Header JS (решение: чистый CSS smooth-scroll)

## Этап 2: Реализация корневого макета (Root Layout)

**Цель:** Обновить app/layout.tsx для установки метаданных (Title/Description из FR-01), подключения шрифтов Inter/Montserrat через next/font/google (с кириллицей, preload), включения Header/Footer. Обеспечить lang="ru", светлую тему, отсутствие CLS (font display: swap).

**Зависит от:** Этап 1

**Входы:** Этап 1 (Header/Footer), app/globals.css (Tailwind), спецификация (FR-01..04, NFR-01)

**Выходы:**
- app/layout.tsx (обновить)
- app/globals.css (дополнить классами шрифтов, если нужно: font-inter, font-montserrat)

**Критерии завершения (DoD):**
- [ ] Метаданные: title="FactoryAll — Цифровое управление производством с ИИ", description из FR-01
- [ ] Шрифты: Inter (body), Montserrat (h1-h6), subsets=['latin', 'cyrillic'], variable=--font-inter и т.д., применены в globals.css (@layer base { html { font-family: var(--font-inter) } })
- [ ] Структура: <html lang="ru"><body><Header>{children}<Footer></body>
- [ ] Контейнеры: body с min-h-screen, flex flex-col; секции позволяют full-width bg
- [ ] Нет гидратации ошибок, LCP-ready (preload)
- [ ] Tailwind цвета: primary #1B2A4A в config, light-only (no dark:)

## Verify
- name: Проверка типов
  command: npx tsc --noEmit
- name: Линтинг
  command: npx eslint "app/layout.tsx" "components/layout/"
- name: Форматирование
  command: npx prettier --check "app/layout.tsx" "components/layout/"
- name: Билд проекта
  command: npm run build
- name: Проверка globals.css
  command: Get-Content app/globals.css | Select-String "font-inter|font-montserrat"