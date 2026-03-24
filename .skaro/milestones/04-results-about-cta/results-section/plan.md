# План реализации: results-section

## Stage 1: Обновление данных и типов для секции результатов

**Цель:** Добавить структуру данных для метрик результатов в `lib/data/texts.ts` и соответствующие TypeScript типы в `types/index.ts`.

**Зависит от:** нет

**Входные данные:**
- Спецификация (конкретные метрики из FR-02)
- Существующий `lib/data/texts.ts`
- Существующий `types/index.ts`

**Выходные данные:**
- `lib/data/texts.ts` (модифицирован — добавлен экспорт `resultsMetrics`)
- `types/index.ts` (модифицирован — добавлен тип `ResultMetric`)

**Definition of Done:**
- [ ] Тип `ResultMetric` определен с полями `value`, `unit`, `label`, `icon` (опционально)
- [ ] Массив `resultsMetrics` экспортирован из `lib/data/texts.ts` с 4 метриками из FR-02
- [ ] Все метрики типизированы как `ResultMetric[]`
- [ ] Данные соответствуют спецификации: '3–6 мес', '30%+', '20–35%', '3 кейса'

**Риски:**
- Несоответствие структуры данных требованиям компонента (минимизируется четкой типизацией)

---

## Stage 2: Реализация компонента ResultsSection

**Цель:** Создать полнофункциональный Server Component для отображения метрик результатов с адаптивной сеткой и иконками.

**Зависит от:** Stage 1

**Входные данные:**
- `lib/data/texts.ts` (с `resultsMetrics`)
- `types/index.ts` (с типом `ResultMetric`)
- Существующий `components/sections/ResultsSection.tsx` (для замены)
- Tailwind конфигурация (`tailwind.config.ts`)

**Выходные данные:**
- `components/sections/ResultsSection.tsx` (полная переработка)

**Definition of Done:**
- [ ] Компонент является Server Component (без 'use client')
- [ ] Импортирует `resultsMetrics` из `lib/data/texts.ts`
- [ ] Использует Grid-верстку: 4 колонки на desktop (lg:grid-cols-4), 2 на tablet (md:grid-cols-2), 1 на mobile
- [ ] Темный фон секции (#1B2A4A / bg-primary)
- [ ] Числовые значения (`value`) отображаются цветом Amber (#F59E0B / text-accent)
- [ ] Единицы измерения (`unit`) отображаются рядом с числом
- [ ] Подписи (`label`) отображаются белым цветом под числами
- [ ] Иконки над числами (использовать SVG-иконки или Unicode-символы как fallback)
- [ ] Секция имеет ID `results` для якорной навигации
- [ ] Адаптивные отступы и размеры шрифтов (responsive typography)
- [ ] Соответствие стилю остальных секций (padding, container)

**Риски:**
- Отсутствие готовых SVG-иконок (решение: использовать простые геометрические формы или Unicode)
- Проблемы с выравниванием текста в Grid (решение: flexbox внутри Grid-ячеек)

---

## Stage 3: Интеграция и верификация

**Цель:** Убедиться, что секция корректно отображается на главной странице и соответствует всем требованиям спецификации.

**Зависит от:** Stage 2

**Входные данные:**
- `app/page.tsx` (главная страница)
- `components/sections/ResultsSection.tsx` (новая версия)
- `components/sections/index.ts` (barrel export)

**Выходные данные:**
- `app/page.tsx` (проверка импорта и порядка секций)
- `components/sections/index.ts` (проверка экспорта `ResultsSection`)

**Definition of Done:**
- [ ] `ResultsSection` импортирован и размещен в правильном порядке на `app/page.tsx` (между `ProductLineSection` и `AboutSection`)
- [ ] Секция экспортируется через `components/sections/index.ts`
- [ ] Визуальная проверка: все 4 метрики отображаются
- [ ] Визуальная проверка: цвета соответствуют палитре (Navy фон, Amber цифры, белый текст)
- [ ] Адаптивность: корректное отображение на desktop (1920px), tablet (768px), mobile (375px)
- [ ] Нет ошибок TypeScript при сборке (`npm run build`)
- [ ] Нет ошибок ESLint (`npm run lint`)
- [ ] Секция доступна по якорной ссылке `#results`

**Риски:**
- Конфликт стилей с соседними секциями (решение: проверка z-index и margins)
- Проблемы с SSG-экспортом (решение: убедиться, что нет клиентского кода)

---

## Verify

```yaml
- name: TypeScript type check
  command: npx tsc --noEmit

- name: ESLint check
  command: npx eslint components/sections/ResultsSection.tsx lib/data/texts.ts types/index.ts

- name: Build static export
  command: npm run build

- name: Verify output files exist
  command: Test-Path out/index.html
```