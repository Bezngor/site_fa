# Задачи: foundation-and-navigation

## Этап 1: Настройка базовой структуры проекта Next.js
- [ ] Создать package.json с зависимостями Next.js 15, Tailwind 4, TS, ESLint, Prettier → package.json
- [ ] Создать tsconfig.json, next.config.js (output: 'export'), tailwind.config.ts с цветами
- [ ] Создать app/globals.css с scroll-behavior: smooth и @tailwind
- [ ] Создать app/layout.tsx (RootLayout с metadata)
- [ ] Создать app/page.tsx (базовый контейнер)
- [ ] Создать .eslintrc.json, .prettierrc
- [ ] Создать директории: components/layout/, lib/data/, public/

## Этап 2: Создание данных навигации и Header компонента
- [ ] Создать lib/data/navigation.ts с массивом navLinks (6 элементов)
- [ ] Создать components/layout/Header.tsx ('use client', sticky navy header, логотип F!, меню, мобильный overlay, scroll lock, auto-close)

## Этап 3: Интеграция Header в layout/page и финальная настройка
- [ ] Обновить app/layout.tsx: добавить <Header />
- [ ] Обновить app/page.tsx: добавить placeholders с id для 8 секций
- [ ] Дополнить app/globals.css: стили для Header, transitions, шрифты