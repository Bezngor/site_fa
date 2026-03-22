## План реализации

## Этап 1: Конфигурация зависимостей и сборки
**Цель:** Обновить зависимости, скрипты npm, tsconfig и next.config для поддержки Next.js 15, SSG и строгой типизации.
**Зависимости:** Нет
**Входы:** Спецификация (FR-01, FR-03, FR-05), текущая структура проекта
**Выходы:**
- `package.json` (добавить Zod, lucide-react; НЕ понижать уже установленные версии Next.js/React/Tailwind)
- `tsconfig.json` (strict: true)
- `next.config.js` (output: 'export', images: { unoptimized: true } — СОХРАНИТЬ существующие значения)
**DoD:**
- [ ] tsconfig.json имеет "strict": true
- [ ] next.config.js содержит output: 'export' и images: { unoptimized: true }
- [ ] npm install проходит без ошибок
**Риски:** НЕ менять версии Next.js, React, Tailwind если они уже установлены и работают.

## Этап 2: Настройка стилизации Tailwind
**Цель:** Расширить Tailwind палитрой проекта и настроить globals.css.
**Зависимости:** Этап 1
**Входы:** Спецификация (FR-02), tailwind.config.ts (существующий)
**Выходы:**
- `tailwind.config.ts` (theme.extend.colors: { primary: '#1B2A4A', accent: '#F59E0B' })
- `app/globals.css` (Tailwind imports, antialiased, scroll-behavior: smooth)
- `.prettierrc` (обновить при необходимости)
**DoD:**
- [ ] tailwind.config.ts имеет theme.extend.colors с primary и accent
- [ ] app/globals.css содержит Tailwind directives
- [ ] npx prettier --check . проходит

## Этап 3: Интеграция шрифтов и базовый layout
**Цель:** Добавить Google Fonts (Inter, Montserrat) через next/font и обновить layout.
**Зависимости:** Этап 1, Этап 2
**Входы:** Спецификация (FR-04), app/layout.tsx (существующий)
**Выходы:**
- `app/layout.tsx` (next/font Inter/Montserrat, metadata — СОХРАНИТЬ import Header from "@/components/layout/Header" и <Header /> в JSX)
- `app/page.tsx` (базовый контент с bg-primary, text-accent для проверки Tailwind)
- `app/globals.css` (font-family CSS vars если нужно)
**DoD:**
- [ ] layout.tsx использует Inter для body, Montserrat для заголовков
- [ ] layout.tsx содержит <Header /> компонент
- [ ] npm run build генерирует out/index.html

## Этап 4: Линтинг и финальная настройка инструментов
**Цель:** Настроить ESLint с typescript-eslint и next/core-web-vitals.
**Зависимости:** Этап 1
**Входы:** Спецификация (FR-05), eslint.config.mjs (существующий)
**Выходы:**
- `eslint.config.mjs` (extends: next/core-web-vitals + typescript-eslint/recommended)
- `package.json` (добавить eslint devDeps если отсутствуют)
**DoD:**
- [ ] ТОЛЬКО eslint.config.mjs — НЕ создавать .eslintrc.json (Flat Config является единственной конфигурацией)
- [ ] npx eslint . --quiet проходит без ошибок
- [ ] npx prettier --check . проходит
**Риски:** НЕ создавать .eslintrc.json — это вызовет конфликт с eslint.config.mjs.

## Verify
- name: Установка зависимостей
  command: npm install
- name: Проверка типов
  command: npx tsc --noEmit
- name: Линтинг (Flat Config — без --ext)
  command: npx eslint . --quiet
- name: Проверка форматирования
  command: npx prettier --check .
- name: Билд и экспорт
  command: npm run build

---
TASKS---
# Задачи: project-setup

## Этап 1: Конфигурация зависимостей и сборки
- [ ] Обновить `package.json` → deps Next.js 15, React 19, Tailwind 4, Zod; scripts dev/build/lint
- [ ] Обновить `tsconfig.json` → strict: true
- [ ] Обновить `next.config.js` → output: 'export', images.unoptimized: true

## Этап 2: Настройка стилизации Tailwind
- [ ] Обновить `tailwind.config.ts` → extend.colors primary/accent/white
- [ ] Обновить `app/globals.css` → @tailwind imports, antialiased
- [ ] Создать/обновить `.prettierrc` → Tailwind sorting rules

## Этап 3: Интеграция шрифтов и базовый layout
- [ ] Обновить `app/layout.tsx` → next/font Inter/Montserrat, metadata, шрифты
- [ ] Обновить `app/page.tsx` → тестовый контент с Tailwind/шрифтами
- [ ] Дополнить `app/globals.css` → font-family CSS vars

## Этап 4: Линтинг и финальная настройка инструментов
- [ ] Обновить `eslint.config.mjs` → next/core-web-vitals + typescript-eslint
- [ ] Дополнить `package.json` → eslint devDeps
- [ ] Проверить `.eslintrc.json` (если нужно) → flat config priority