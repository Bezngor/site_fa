# План реализации: about-section

## Stage 1: Обновление данных в lib/data/texts.ts
**Цель:** Добавить структуру данных для секции «О нас» в централизованный файл текстов.

**Зависит от:** нет

**Входные данные:**
- Существующий файл `lib/data/texts.ts`
- Спецификация about-section
- Цветовая палитра проекта (#1B2A4A, #F59E0B)

**Выходные данные:**
- `lib/data/texts.ts` (модифицирован)

**DoD:**
- [ ] Добавлен экспортируемый объект `about` с полями: `title`, `description`, `features` (массив из 3-4 элементов), `ctaText`
- [ ] Каждый элемент `features` содержит: `icon` (строка с именем иконки из lucide-react), `title`, `text`
- [ ] Все тексты на русском языке
- [ ] Тексты соответствуют тематике производства и ценностям компании
- [ ] TypeScript типы корректны и экспортированы

**Риски:**
- Нет рисков (простое добавление данных)

---

## Stage 2: Реализация компонента AboutSection
**Цель:** Создать полнофункциональный Server Component для секции «О нас» с адаптивной версткой, интеграцией данных и CTA-кнопкой.

**Зависит от:** Stage 1

**Входные данные:**
- `lib/data/texts.ts` (объект `about`)
- Существующий файл `components/sections/AboutSection.tsx` (если есть заглушка)
- `components/ui/Button.tsx` (для CTA)
- Tailwind конфигурация
- Иконки из `lucide-react`

**Выходные данные:**
- `components/sections/AboutSection.tsx` (полная реализация)
- `components/sections/index.ts` (обновлен экспорт, если нужно)

**DoD:**
- [ ] Компонент импортирует данные из `lib/data/texts.ts` (объект `about`)
- [ ] Отображается заголовок секции (`about.title`)
- [ ] Отображается описание (`about.description`)
- [ ] Рендерится список из 3-4 ключевых фактов с иконками из `lucide-react`
- [ ] Каждый факт содержит иконку, заголовок и текст
- [ ] CTA-кнопка «Связаться с нами» ведет к `#contact` (якорная ссылка; плавный скролл — `scroll-behavior` в layout при наличии)
- [ ] Компонент является Server Component (нет директивы 'use client')
- [ ] Адаптивная верстка: на мобильных устройствах факты выстраиваются вертикально (flex-col), на десктопе — в сетку (grid 2x2 или 4 колонки)
- [ ] Используется фирменная палитра: Primary #1B2A4A для текста/заголовков, Accent #F59E0B для акцентов/иконок
- [ ] Секция имеет `id="about"` для навигации
- [ ] Отступы и типографика соответствуют общему стилю лендинга
- [ ] Нет блоков для изображений (одноколоночный макет, контент на всю ширину контейнера)
- [ ] Код соответствует стандартам: camelCase, max 40 строк на функцию, max 3 уровня вложенности
- [ ] Все комментарии и AI_NOTES на русском языке

**Риски:**
- Возможна несовместимость версий `lucide-react` — проверить установку пакета
- Smooth scroll может не работать в старых браузерах — использовать CSS `scroll-behavior: smooth` как fallback

---

## Stage 3: Интеграция секции в главную страницу и финальная проверка
**Цель:** Интегрировать AboutSection в основной лендинг, проверить корректность работы навигации и адаптивности.

**Зависит от:** Stage 2

**Входные данные:**
- `app/page.tsx`
- `components/sections/AboutSection.tsx`
- `components/sections/index.ts`
- `lib/data/navigation.ts` (если требуется обновление навигации)

**Выходные данные:**
- `app/page.tsx` (модифицирован)
- `lib/data/navigation.ts` (модифицирован, если нужно добавить пункт «О нас»)
- `AI_NOTES.md` (создан в корне проекта)

**DoD:**
- [ ] `AboutSection` импортирован и добавлен в `app/page.tsx` в правильной последовательности (после ResultsSection, перед CtaFormSection)
- [ ] Секция корректно рендерится на странице
- [ ] Якорная ссылка `#about` работает из навигации (если добавлена в Header)
- [ ] CTA-кнопка в AboutSection корректно скроллит к `#contact`
- [ ] Проверена адаптивность на мобильных и десктопных разрешениях (DevTools)
- [ ] Нет ошибок TypeScript при сборке (`npm run build`)
- [ ] Нет ошибок ESLint (`npm run lint`)
- [ ] Создан файл `AI_NOTES.md` с описанием реализации, архитектурных решений и потенциальных улучшений
- [ ] `AI_NOTES.md` содержит секции: Обзор, Реализованные требования, Архитектурные решения, Известные ограничения, Возможные улучшения
- [ ] Все тексты в `AI_NOTES.md` на русском языке

**Риски:**
- Возможны конфликты стилей с другими секциями — проверить изоляцию Tailwind классов
- Навигация может не обновиться автоматически — требуется ручное добавление пункта в `navigation.ts`

---

## Verify

```yaml
- name: TypeScript компиляция
  command: npx tsc --noEmit

- name: ESLint проверка
  command: npx eslint components/sections/AboutSection.tsx lib/data/texts.ts app/page.tsx

- name: Prettier форматирование
  command: npx prettier --check components/sections/AboutSection.tsx lib/data/texts.ts

- name: Сборка проекта
  command: npm run build

- name: Проверка наличия файлов
  command: |
    if (Test-Path components/sections/AboutSection.tsx) { Write-Host "✓ AboutSection.tsx exists" } else { Write-Host "✗ AboutSection.tsx missing"; exit 1 };
    if (Test-Path AI_NOTES.md) { Write-Host "✓ AI_NOTES.md exists" } else { Write-Host "✗ AI_NOTES.md missing"; exit 1 }
```