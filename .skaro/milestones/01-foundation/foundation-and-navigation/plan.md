## Этап 1: Настройка базовой структуры проекта Next.js

**Цель:** Создать полную структуру Next.js 15 проекта с App Router, Tailwind CSS 4, TypeScript, конфигурационными файлами, глобальными стилями (включая scroll-behavior: smooth), базовым layout.tsx и page.tsx. Подготовить структуру директорий для компонентов и данных согласно Architecture и Constitution.

**Зависимости:** Нет

**Входы:** Спецификация, Constitution, Architecture (app/, components/, lib/)

**Выходы:**
- package.json (с зависимостями: next@15, react@18, typescript, tailwindcss@4, eslint, prettier и т.д.; scripts: dev, build, lint, type-check)
- tsconfig.json
- next.config.js (с output: 'export' для SSG)
- tailwind.config.ts (с цветами: navy, amber, white, gray-light; content paths)
- app/globals.css (с @tailwind directives, scroll-behavior: smooth, системные шрифты)
- app/layout.tsx (RootLayout с metadata, Tailwind, базовый <html><body>)
- app/page.tsx (пустой контейнер для секций, импорт Header)
- .eslintrc.json (next/core-web-vitals + typescript-eslint)
- .prettierrc
- components/layout/ (пустая директория)
- lib/data/ (пустая директория)
- public/ (пустая для будущих изображений)

**DoD:**
- [ ] Структура директорий соответствует Architecture: app/, components/layout/, lib/data/
- [ ] Tailwind config определяет цвета navy (#1B2A4A), amber (#F59E0B), white (#FFFFFF), gray-light (#F8F9FA)
- [ ] globals.css содержит scroll-behavior: smooth и базовые стили
- [ ] layout.tsx рендерит children в <main>
- [ ] package.json имеет все зависимости и scripts (npm install должен работать)
- [ ] Нет ошибок в ESLint и TypeScript на базовых файлах

**Риски:** Несовместимость версий Next.js 15 / Tailwind 4 (решение: точные версии из Constitution)

## Этап 2: Создание данных навигации и Header компонента

**Цель:** Реализовать статические данные navLinks в lib/data/navigation.ts и полный Header.tsx с 'use client', sticky поведением, логотипом «F!», десктопным/мобильным меню, индикацией активных ссылок (линия под текстом), кнопкой CTA, блокировкой скролла body, автоматическим закрытием мобильного меню при клике.

**Зависимости:** Этап 1

**Входы:** navLinks из spec (Проблемы#problems, Как работаем#how-we-work и т.д., Записаться#cta)

**Выходы:**
- lib/data/navigation.ts (export const navLinks: Array<{label: string, href: string}>)
- components/layout/Header.tsx ('use client', useState для isMenuOpen, useEffect для body overflow, hamburger SVG или CSS, overlay меню, smooth scroll via window.scrollTo({behavior: 'smooth'}), hover/active стили с border-bottom amber)

**DoD:**
- [ ] navLinks содержит 6 элементов: 5 меню + CTA
- [ ] Header sticky z-50, фон navy непрозрачный
- [ ] Логотип: span с font-bold white для 'F', amber для '!'
- [ ] Мобильное: бургер → overlay, body overflow hidden при open, close on link click + scroll
- [ ] Адаптив: <768px бургер, >768px inline nav
- [ ] Интеграция navLinks для рендера меню
- [ ] Нет TS/ESLint ошибок

**Риски:** Проблемы с body scroll lock в разных браузерах (решение: useEffect cleanup)

## Этап 3: Интеграция Header в layout/page и финальная настройка

**Цель:** Интегрировать Header в layout.tsx, добавить якоря в page.tsx для будущих секций, доработать стили globals.css/Tailwind для Header (z-index, transitions), обеспечить SEO (nav с aria-label), проверить адаптивность и smooth scroll.

**Зависимости:** Этапы 1 и 2

**Входы:** Header.tsx, navLinks

**Выходы:**
- app/layout.tsx (обновлено: импорт и рендер <Header /> над <main>)
- app/page.tsx (обновлено: <Header />, <main> с id для секций: #problems, #how-we-work и т.д. как placeholders)
- app/globals.css (дополнено: стили для Header, мобильного overlay, системные шрифты font-bold)

**DoD:**
- [ ] Header отображается в layout
- [ ] page.tsx имеет 8 placeholder div с id (hero без id, problems#problems и т.д.)
- [ ] Smooth scroll работает на всех ссылках (тест: клик → скролл)
- [ ] Адаптив: мобильное меню блокирует скролл, закрывается на клик
- [ ] ESLint, TypeScript, Prettier чисто
- [ ] next build && next export succeeds без ошибок

**Риски:** Конфликты z-index с будущими секциями (решение: z-50 в Header)

## Verify
- name: Установка зависимостей
  command: npm install
- name: Проверка линтинга
  command: npx eslint . --ext .ts,.tsx --quiet
- name: Проверка типов
  command: npx tsc --noEmit
- name: Форматирование
  command: npx prettier --check .
- name: Билд и экспорт
  command: npm run build
- name: Проверка структуры файлов
  command: Get-ChildItem -Recurse app/,components/,lib/ | Select-Object FullName | Format-Table