# plan.md

## Этап 1: Подготовка данных
**Цель:** Создать и заполнить статические файлы данных для всех секций.

**Зависимости:** Нет
**Входы:** lib/data/cases.json (существующий), lib/data/texts.ts, lib/data/products.ts, types/index.ts
**Выходы:** 
  - lib/data/cases.ts
  - lib/data/texts.ts (только дополнение)
  - lib/data/products.ts
  - types/index.ts (дополнение)

**DoD:**
- [ ] lib/data/cases.ts содержит массив из 3 кейсов с полями: title, description с подразделами "Задача", "Решение", "Результат", все на русском
- [ ] lib/data/texts.ts — добавить ТОЛЬКО недостающие объекты: hero, problems, results, about. Секцию howWeWork НЕ ТРОГАТЬ
- [ ] lib/data/products.ts содержит простой массив категорий продуктов для маркированного списка
- [ ] types/index.ts дополнен интерфейсами Case, SectionText, ProductCategory (существующие типы не трогать)
- [ ] Данные соответствуют цветовой палитре (#1B2A4A / #F59E0B), нет хардкода в компонентах

**Риски:** Перезапись существующих данных в texts.ts (решение: только добавлять новые ключи)

---

## Этап 2: Реализация статических секций (Server Components)
**Цель:** Полностью реализовать неинтерактивные секции как Server Components.

**Зависимости:** Этап 1
**Входы:** lib/data/*, components/sections/*.tsx, components/ui/Button.tsx
**Выходы:** 
  - components/sections/HeroSection.tsx
  - components/sections/ProblemsSection.tsx
  - components/sections/ResultsSection.tsx
  - components/sections/AboutSection.tsx
  - components/sections/ProductLineSection.tsx

**DoD:**
- [ ] HowWeWorkSection.tsx — НЕ ТРОГАТЬ, файл является финальным эталоном
- [ ] Все новые секции — Server Components (без 'use client'), данные из lib/data/*
- [ ] Hero: заголовок, подзаголовок, CTA кнопка (компонент Button)
- [ ] Problems: 4 боли с иконками Lucide (individual imports)
- [ ] Results: показатели (числа) через Tailwind
- [ ] About: текст о компании
- [ ] ProductLine: маркированный список категорий
- [ ] Адаптивность: Tailwind responsive (sm:, md:, lg:), цвета #1B2A4A / #F59E0B
- [ ] Max nesting DOM 3 уровня, max 40 строк/функция

**Риски:** Перезапись HowWeWorkSection (решение: явный запрет выше)

---

## Этап 3: Реализация интерактивной CasesSection
**Цель:** Создать CasesSection с независимым аккордеоном для 3 кейсов.

**Зависимости:** Этап 1
**Входы:** lib/data/cases.ts, components/sections/CasesSection.tsx (заглушка)
**Выходы:** 
  - components/sections/CasesSection.tsx
  - app/globals.css (добавить стили аккордеона)

**DoD:**
- [ ] 'use client' только в этом компоненте
- [ ] React useState: массив boolean[3] для независимого раскрытия каждого кейса
- [ ] Контент раскрытого кейса: "Задача" / "Решение" / "Результат" из cases.ts
- [ ] CSS transition: max-height + opacity + overflow-hidden (только Tailwind + globals.css)
- [ ] Иконки: import { ChevronDown } from 'lucide-react' (tree-shaking)
- [ ] Адаптив: flex-col на mobile, grid на desktop
- [ ] Без модалов, без JS-анимаций

**Риски:** JS errors в static export (решение: useState корректно работает в 'use client')

---

## Этап 4: Интеграция
**Цель:** Проверить корневые файлы, не перезаписывая готовое.

**Зависимости:** Этапы 2, 3
**Входы:** app/page.tsx, app/layout.tsx, next.config.js
**Выходы:** 
  - app/layout.tsx (только metadata и fonts если не заполнены)
  - next.config.js (подтвердить output: 'export')

**DoD:**
- [ ] app/page.tsx — НЕ ТРОГАТЬ (уже содержит 8 секций в правильном порядке)
- [ ] components/sections/index.ts — НЕ ТРОГАТЬ (уже экспортирует 8 секций)
- [ ] app/globals.css — smooth scroll уже есть, только добавить стили аккордеона если не сделано в Этапе 3
- [ ] app/layout.tsx: проверить metadata (title, description на русском), lang="ru"
- [ ] next.config.js: подтвердить output: 'export', не изменять остальное
- [ ] Bundle < 150 KB First Load JS

**Риски:** Скаро перезапишет page.tsx или index.ts (решение: явный запрет выше)

---

## Verify
- name: Проверка типов
  command: npx tsc --noEmit
- name: Линтинг
  command: npx eslint components/sections/ lib/data/ app/ --max-warnings 0
- name: Билд
  command: npm run build
- name: Bundle size
  command: Get-ChildItem ./out/_next/static/chunks/*.js | Sort-Object Length -Descending | Select-Object -First 5 | ForEach-Object { Write-Output "$($_.Name): $([math]::Round($_.Length/1KB,2)) KB" }