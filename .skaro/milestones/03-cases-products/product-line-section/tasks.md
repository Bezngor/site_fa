# Tasks: ProductLineSection

## Stage 1: Подготовка данных продуктов
- [ ] Добавить интерфейс `Product` в `types/index.ts` → `types/index.ts`
- [ ] Создать массив из 3 продуктов в `lib/data/products.ts` → `lib/data/products.ts`
- [ ] Добавить поля: id, name, features (3-5 строк), icon (SVG placeholder), ctaLabel → `lib/data/products.ts`
- [ ] Убедиться, что все тексты на русском языке → `lib/data/products.ts`

## Stage 2: Реализация компонента ProductLineSection
- [ ] Создать подкомпонент `ProductCard` с пропсами `product: Product` → `components/sections/ProductCard.tsx`
- [ ] Реализовать карточку: иконка (64x64px, цвет #1B2A4A), название (h3), список фич (маркированный), кнопка CTA → `components/sections/ProductCard.tsx`
- [ ] Создать `ProductLineSection` (Server Component) с сеткой 3 колонок → `components/sections/ProductLineSection.tsx`
- [ ] Импортировать данные из `products.ts` и отрендерить 3 карточки → `components/sections/ProductLineSection.tsx`
- [ ] Добавить заголовок и подзаголовок секции из `texts.ts` → `lib/data/texts.ts`, `components/sections/ProductLineSection.tsx`
- [ ] Настроить кнопку CTA для прокрутки к `#cta-form` → `components/sections/ProductCard.tsx`
- [ ] Добавить адаптивность: 1 колонка на мобильных, 3 на десктопе → `components/sections/ProductLineSection.tsx`
- [ ] Обновить экспорт в `components/sections/index.ts` → `components/sections/index.ts`
- [ ] Интегрировать `ProductLineSection` в `app/page.tsx` после `ResultsSection` → `app/page.tsx`
- [ ] Проверить соблюдение лимита 40 строк для основного компонента → `components/sections/ProductLineSection.tsx`