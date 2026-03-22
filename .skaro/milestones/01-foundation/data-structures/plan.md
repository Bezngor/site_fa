## Этап 1: Создание системы типов
**Цель:** Определить полную TypeScript-типизированную схему для всех структур данных (интерфейсы для текстов секций, кейсов, продуктов, шагов работы и метрик) в едином файле типов. Это обеспечит типобезопасность при использовании данных в компонентах.

**Зависит от:** ничего
**Входы:** Спецификация data-structures, Constitution, ADR-003
**Выходы:** 
  - `types/index.ts`
**Критерии завершения (DoD):**
- [ ] Директория `types/` создана (если отсутствует)
- [ ] Экспортированы интерфейсы: `TextsData`, `HeroTexts`, `HowWeWorkStep`, `Case`, `Metric`, `Product` и другие необходимые для всех FR
- [ ] Интерфейсы соответствуют FR-01–FR-06: `metric: { label: string; value: string; unit: string }`, `howWeWork: HowWeWorkStep[]` и т.д.
- [ ] `tsc --noEmit` проходит без ошибок для нового файла
- [ ] Нет заглушек (stubs), все типы полные и конкретные
**Риски:** Несоответствие интерфейсов будущим данным (решение: строгие типы с `as const` в виду)

## Этап 2: Реализация статических данных
**Цель:** Создать все файлы данных с полным контентом на русском языке, соответствующими типам, путями к изображениям и `as const`. Покрыть все 8 секций текстов, 3 кейса, плоский массив продуктов и массив шагов "Как мы работаем".

**Зависит от:** Этап 1
**Входы:** Спецификация data-structures (FR-01–FR-06, Acceptance Criteria), `types/index.ts`
**Выходы:** 
  - `lib/data/texts.ts`
  - `lib/data/cases.json`
  - `lib/data/products.ts`
**Критерии завершения (DoD):**
- [ ] `texts.ts`: Объект `texts` с полями для 8 секций (heroTitle/description, problemsTitle/list, howWeWork: [{step, title, description}] минимум 4 шага, casesIntro, productsTitle, resultsTitle/list, aboutTitle/description, ctaTitle/description), `export const texts = { ... } as const`
- [ ] `cases.json`: Массив из 3 кейсов, каждый с `title`, `description`, `image: '/images/cases/case1.webp'`, `metrics: Metric[]` (реалистичные данные, напр. "+20%", "2 дня")
- [ ] `products.ts`: Плоский массив минимум 4–6 продуктов `{ name, description, image: '/images/products/prod1.webp' }`, `export const products = [...] as const`
- [ ] Все пути `/images/...webp`, тексты на русском по теме "Завод сайтов", нет i18n
- [ ] `tsc --noEmit` проходит для всех файлов, типы совпадают
- [ ] Нет пустых объектов/строк, полные реалистичные данные
**Риски:** Несовпадение типов с данными (решение: импорт типов в data-файлы и валидация на этапе 2); превышение bundle size (данные статические, минимальны)

## Verify
- name: Проверка типов
  command: npx tsc --noEmit
- name: Линтинг новых файлов
  command: npx eslint types/ lib/data/ --ext .ts,.tsx,.json
- name: Проверка форматирования
  command: npx prettier --check types/ lib/data/
- name: Проверка существования файлов
  command: Get-ChildItem types/index.ts, lib/data/texts.ts, lib/data/cases.json, lib/data/products.ts | Select-Object Name, Length
---
# Задачи: Реализация структур данных (data-structures)

## Этап 1: Создание системы типов
- [ ] Создать директорию `types/` и файл `types/index.ts` с полными интерфейсами для всех данных (TextsData, Case, Metric, Product, HowWeWorkStep и т.д.)
- [ ] Экспортировать типы строго по спецификации (строгие схемы для метрик, шагов, текстов секций)

## Этап 2: Реализация статических данных
- [ ] Создать `lib/data/texts.ts` с типизированными текстами для 8 секций, включая массив `howWeWork` (минимум 4 шага), `as const`
- [ ] Создать `lib/data/cases.json` с массивом из 3 кейсов (title, description, image, metrics[] по схеме)
- [ ] Создать `lib/data/products.ts` с плоским массивом продуктов (минимум 4–6, name, description, image), `as const`