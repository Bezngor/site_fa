## План реализации: HowWeWorkSection

## Этап 1: Подготовка статических данных
**Цель:** Добавить в файл данных структуру для шагов процесса работы (howWeWork.steps) согласно FR-01 и спецификации (5 этапов: Аудит, Проектирование, Разработка, Внедрение, Поддержка). Обеспечить типизацию и русскоязычные тексты.

**Зависимости:** Нет
**Входы:** Спецификация (FR-01, этапы из Clarifications Q2), types/index.ts (если нужны типы), существующий lib/data/texts.ts
**Выходы:** 
  - `lib/data/texts.ts` (обновленный с новым объектом howWeWork: { steps: Array<{ title: string; desc: string }> })
**DoD:**
- [ ] В `lib/data/texts.ts` секция `howWeWork` содержит:
      - `title` (например, "Как мы работаем")
      - `steps: HowWeWorkStep[]` из ровно 5 шагов:
        1) Аудит
        2) Проектирование
        3) Разработка
        4) Внедрение
        5) Поддержка
- [ ] Типы в `types/index.ts` остаются прежними: `HowWeWorkStep` и `TextsData['howWeWork']` (без новых интерфейсов)
- [ ] Тексты шагов на русском, без дублирования
- [ ] Файл проходит ESLint/Prettier/tsc
**Риски:** Несоответствие типам в texts.ts (решение: использовать union или existing schema)

## Этап 2: Реализация компонента и интеграция
**Цель:** Создать Server Component HowWeWorkSection с вертикальным таймлайном (FR-02–04), импортировать данные из Этапа 1, обеспечить стилизацию Tailwind (NFR-01–03), экспортировать в index.ts для использования в app/page.tsx.

**Зависимости:** Этап 1
**Входы:** lib/data/texts.ts (обновленный), tailwind.config.ts (палитра), app/globals.css (если нужны кастом стили), спецификация (вертикальный timeline, круги номеров, линия)
**Выходы:** 
  - `components/sections/HowWeWorkSection.tsx` (полный компонент, Server Component без 'use client')
  - `components/sections/index.ts` (добавлен export default или named для HowWeWorkSection)
**DoD:**
- [ ] Компонент рендерит 5 шагов из данных: номера в янтарных кругах (#F59E0B), темно-синий текст (#1B2A4A), вертикальная соединительная линия (CSS :before/:after или border-l)
- [ ] Адаптивность: полный текст на мобильных (flex-col, no truncation)
- [ ] Max nesting DOM 3 уровня, max function length 40 строк
- [ ] Все шаги равнозначны (no выделение), минимализм (только номера, без иконок)
- [ ] Импорт/использование данных из lib/data/texts.ts
**Риски:** Сложность CSS для timeline на всех экранах (решение: relative/absolute для линии, flex для шагов); превышение bundle (решение: Tailwind purge)

## Verify
- name: Проверка типов
  command: npx tsc --noEmit
- name: Линтинг секции
  command: npx eslint components/sections/
- name: Форматирование
  command: npx prettier --check components/sections/ lib/data/texts.ts
- name: Проверка наличия файлов и данных
  command: Get-ChildItem components/sections/HowWeWorkSection.tsx, components/sections/index.ts; (Get-Content lib/data/texts.ts) | Select-String "howWeWork|Аудит|Проектирование|Разработка|Внедрение|Поддержка" | Measure-Object | Select-Object Count
- name: Билд проекта (проверка интеграции)
  command: npm run build

---
TASKS---
# Задачи: Реализация HowWeWorkSection

## Этап 1: Подготовка статических данных
- [ ] Обновить `lib/data/texts.ts` → добавить howWeWork.steps (5 шагов на русском, типизировано)

## Этап 2: Реализация компонента и интеграция
- [ ] Создать `components/sections/HowWeWorkSection.tsx` → Server Component с timeline (вертикальная линия, круги номеров, адаптив)
- [ ] Обновить `components/sections/index.ts` → добавить экспорт HowWeWorkSection