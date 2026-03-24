# План реализации: ProductLineSection

## Обзор
Задача: Реализовать секцию продуктовой линейки (`ProductLineSection`) с отображением 3 продуктов в виде сетки карточек. Каждая карточка содержит иконку, название, список фич и кнопку CTA к форме заказа.

**Принцип разбиения:** Логическая когезия — один этап = один завершённый модуль. Проект уже имеет структуру, поэтому Stage 1 (Project Structure Setup) не требуется.

**Количество этапов:** 2 (данные + компонент UI)

---

## Stage 1: Подготовка данных продуктов

**Цель:** Создать типизированную структуру данных для продуктов в `lib/data/products.ts` и обновить глобальные типы.

**Зависит от:** нет

**Входы:**
- Спецификация (3 продукта, список фич, иконки)
- Существующая структура `lib/data/`
- `types/index.ts`

**Выходы:**
- `lib/data/products.ts` — массив из 3 продуктов с полями: id, name, features (string[]), icon (путь к SVG или placeholder), ctaLabel
- `types/index.ts` — добавлен интерфейс `Product`

**DoD:**
- [ ] Интерфейс `Product` экспортирован из `types/index.ts` с полями: id, name, features, icon, ctaLabel
- [ ] `lib/data/products.ts` содержит массив `products` с 3 элементами
- [ ] Каждый продукт имеет 3-5 фич в виде строк
- [ ] Поле `icon` содержит путь к абстрактной SVG-иконке в цвете `#1B2A4A` (placeholder)
- [ ] `ctaLabel` для каждого продукта — "Выбрать" или "Заказать"
- [ ] Данные на русском языке

**Риски:**
- Отсутствие реальных иконок → используем inline SVG или data URI для placeholder
- Несоответствие типов → TypeScript проверит на этапе билда

---

## Stage 2: Реализация компонента ProductLineSection

**Цель:** Создать Server Component `ProductLineSection` с адаптивной сеткой карточек продуктов и интеграцией в главную страницу.

**Зависит от:** Stage 1

**Входы:**
- `lib/data/products.ts` (массив продуктов)
- `types/index.ts` (интерфейс Product)
- `components/ui/Button.tsx` (переиспользуемая кнопка)
- `app/page.tsx` (для интеграции секции)
- `lib/data/texts.ts` (для заголовка и подзаголовка секции)

**Выходы:**
- `components/sections/ProductLineSection.tsx` — основной компонент секции (Server Component)
- `components/sections/ProductCard.tsx` — подкомпонент карточки продукта (для соблюдения лимита 40 строк)
- `components/sections/index.ts` — обновлён экспорт ProductLineSection
- `lib/data/texts.ts` — добавлены тексты для секции (заголовок, подзаголовок)
- `app/page.tsx` — интегрирована ProductLineSection между ResultsSection и AboutSection

**DoD:**
- [ ] `ProductLineSection` — Server Component, импортирует данные из `products.ts`
- [ ] Сетка: 3 колонки на десктопе (Tailwind: `grid grid-cols-1 md:grid-cols-3 gap-6`)
- [ ] `ProductCard` — подкомпонент в `components/ui/ProductCard.tsx` с пропсами `product: Product`
- [ ] Карточка содержит:
  - [ ] Иконку (SVG из Lucide, цвет `#1B2A4A`, размер 64x64px)
  - [ ] Название продукта (h3, Tailwind: `text-xl font-semibold text-[#1B2A4A]`)
  - [ ] Список фич (маркированный список, Tailwind: `list-disc list-inside text-gray-700`)
  - [ ] Кнопку CTA — простой `<a href="#contact">` (якорная ссылка, без JS)
- [ ] Заголовок и подзаголовок секции загружаются из `texts.ts`
- [ ] Адаптивность: 1 колонка на мобильных (<768px), 3 на десктопе
- [ ] Цветовая палитра: primary `#1B2A4A`, accent `#F59E0B`
- [ ] `ProductLineSection` ≤40 строк
- [ ] Секция имеет `id="products"` (уже задан в существующем компоненте — не менять)
- [ ] `app/page.tsx` — НЕ ТРОГАТЬ (ProductLineSection уже интегрирована)
- [ ] `components/sections/index.ts` — НЕ ТРОГАТЬ (экспорт уже есть)

**Риски:**
- Превышение лимита 40 строк → решено через подкомпонент ProductCard
- Проблемы с прокруткой к форме → использовать `<a href="#cta-form">` или `onClick` с `document.getElementById`
- Некорректное отображение SVG → проверить inline SVG или next/image для статических иконок

---

## Verify. Команды для ручной проверки (запускать по одной в PowerShell)

### 1. Проверка типов
npx tsc --noEmit

### 2. Билд
npm run build

### 3. Наличие секции в HTML
Select-String -Path "out/index.html" -Pattern 'id="products"'
```