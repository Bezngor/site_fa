## Stage 1: Создание библиотеки UI-компонентов
**Goal:** Реализовать базовые UI-компоненты Button и FormInput согласно спецификации, включая экспорт через index.ts. Компоненты будут использовать Tailwind CSS, поддерживать все указанные пропсы, варианты, состояния и валидацию. Обеспечить отсутствие внешних отступов, доступность и совместимость с Server Components (добавить 'use client' только если необходимо для интерактивности).

**Depends on:** none
**Inputs:** Спецификация ui-components, tailwind.config.ts, types/index.ts, проектная конституция, архитектура (компоненты в /components/ui/)
**Outputs:** 
  - `components/ui/Button.tsx`
  - `components/ui/FormInput.tsx`
  - `components/ui/index.ts`
**DoD:**
- [ ] Button.tsx: поддержка variants ('primary', 'secondary'), isLoading (спиннер + disabled), type ('button'|'submit'|'reset'), Tailwind-стили (amber #F59E0B, primary #1B2A4A), нет margin, ARIA для loading/focus
- [ ] FormInput.tsx: пропс as ('input'|'textarea'), label, error (красный текст + border), стандартные HTML-атрибуты (type, placeholder), forwardRef, resize-y для textarea, нет margin
- [ ] index.ts: экспорт Button и FormInput как default/named
- [ ] Код соответствует стандартам: <40 строк/функция, nesting <3, TypeScript-типы, no 'use client' без justification (props-based, server-ok)
- [ ] Нет дублирования классов, использование цвета из палитры (primary, accent)
**Risks:** Несовместимость с Tailwind 4 (проверить config), отсутствие типов в types/index.ts (расширить если нужно), bundle size рост (purge Tailwind минимизирует)

## Verify
- name: Lint UI-компонентов
  command: npx eslint components/ui
- name: Проверка типов
  command: npx tsc --noEmit
- name: Сборка проекта
  command: npm run build
- name: Проверка форматирования
  command: npx prettier --check components/ui
---
# Tasks: ui-components

## Stage 1: Создание библиотеки UI-компонентов
- [ ] Реализовать Button.tsx с variants, isLoading, type → `components/ui/Button.tsx`
- [ ] Реализовать FormInput.tsx с as, label, error → `components/ui/FormInput.tsx`
- [ ] Создать index.ts для экспорта компонентов → `components/ui/index.ts`