# AI_NOTES — Этап 2: Реализация статических секций

## Что было сделано
- Реализованы компоненты `HeroSection`, `ProblemsSection`, `ResultsSection`, `AboutSection`, `ProductLineSection`.
- Все компоненты являются Server Components (без 'use client').
- Использованы иконки `lucide-react` с индивидуальным импортом для оптимизации.
- Данные импортируются из `lib/data/`.
- Соблюдены требования по цветовой палитре (#1B2A4A, #F59E0B) и адаптивности через Tailwind.

## Почему выбран такой подход
- Использование Server Components обеспечивает максимальную производительность и минимальный размер JS-бандла.
- Структура компонентов соответствует требованиям по ограничению в 40 строк и 3 уровня вложенности.

## Файлы созданы / изменены
| Файл | Action | Description |
|---|---|---|
| `components/sections/HeroSection.tsx` | created | Главный экран с CTA |
| `components/sections/ProblemsSection.tsx` | created | Секция проблем с иконками |
| `components/sections/ResultsSection.tsx` | created | Статистика достижений |
| `components/sections/AboutSection.tsx` | created | О компании |
| `components/sections/ProductLineSection.tsx` | created | Маркированный список продуктов |

## Риски и ограничения
- Секция `HowWeWorkSection` не затрагивалась, как и требовалось.
- Иконки Lucide импортируются точечно для соответствия бюджету бандла.

## Invariant compliance
- [x] Server Components — соблюдено.
- [x] Отсутствие БД — соблюдено.
- [x] Цветовая палитра — соблюдено.
- [x] Max 40 строк — соблюдено.

## How to verify
1. Выполнить `npx tsc --noEmit`.
2. Проверить рендер секций на странице `app/page.tsx`.