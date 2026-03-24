# Tasks: results-section

## Stage 1: Обновление данных и типов для секции результатов
- [ ] Добавить тип `ResultMetric` в `types/index.ts` с полями `value`, `unit`, `label`, `icon?`
- [ ] Создать массив `resultsMetrics: ResultMetric[]` в `lib/data/texts.ts` с 4 метриками из спецификации
- [ ] Экспортировать `resultsMetrics` из `lib/data/texts.ts`

## Stage 2: Реализация компонента ResultsSection
- [ ] Переписать `components/sections/ResultsSection.tsx` как Server Component
- [ ] Импортировать `resultsMetrics` из `lib/data/texts.ts`
- [ ] Реализовать Grid-верстку (4 колонки desktop, 2 tablet, 1 mobile)
- [ ] Применить темный фон (#1B2A4A) и цветовую схему (Amber для цифр, белый для текста)
- [ ] Добавить иконки над каждой метрикой (SVG или Unicode)
- [ ] Добавить ID `results` для якорной навигации
- [ ] Обеспечить адаптивность (responsive padding, typography)

## Stage 3: Интеграция и верификация
- [ ] Проверить импорт `ResultsSection` в `app/page.tsx`
- [ ] Проверить экспорт `ResultsSection` в `components/sections/index.ts`
- [ ] Убедиться в правильном порядке секций на главной странице
- [ ] Выполнить визуальную проверку на desktop/tablet/mobile
- [ ] Запустить `npm run build` и проверить отсутствие ошибок
- [ ] Запустить `npm run lint` и проверить отсутствие ошибок
- [ ] Проверить работу якорной ссылки `#results`