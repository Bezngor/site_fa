# План реализации: images-optimization

План приведён в соответствие с **фактической** реализацией: `output: 'export'`, `images.unoptimized: true`, локальные WebP в `public/images/`, сборка **`npm run build`** (отдельного `npm run export` в проекте нет). Чекбоксы DoD ниже — для ручной верификации, без преждевременных «готово».

---

## Stage 1: Конфигурация Next.js для статического экспорта и изображений

**Цель:** Статический экспорт и отключение on-demand optimization изображений, совместимые с хостингом без Image Optimization API.

**Выходные данные:**

- `next.config.js`: `output: 'export'`, `images.unoptimized: true`

**DoD:**

- [ ] В конфиге включён статический экспорт и `images.unoptimized`
- [ ] Документировано в `AI_NOTES.md`, зачем нужен `unoptimized` при `export`

**Риски:** Без CDN/внешнего оптимизатора вес и размеры WebP нужно контролировать при подготовке файлов в `public/`.

---

## Stage 2: Hero — приоритетная загрузка

**Цель:** LCP-элемент — фон Hero через `next/image` с приоритетом.

**Выходные данные:**

- `components/sections/HeroSection.tsx`
- `texts.hero.backgroundSrc` / `backgroundAlt` в `lib/data/texts.ts`
- Ассет: `public/images/hero.webp`

**DoD:**

- [ ] `next/image` с `fill`, `priority`, `fetchPriority="high"`, `sizes="100vw"`
- [ ] Overlay для читаемости текста
- [ ] Контейнер секции задаёт минимальную высоту первого экрана без лишнего CLS

---

## Stage 3: Cases — lazy и раскрытие блока

**Цель:** Изображения кейсов только после раскрытия; корректные `sizes`.

**Выходные данные:**

- `components/sections/CasesSection.tsx`
- `lib/data/cases.ts` — пути `/images/cases/*.webp`, `imageWidth` / `imageHeight` / `imageAlt`

**DoD:**

- [ ] `next/image` с `fill` в контейнере с фиксированным соотношением сторон
- [ ] `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- [ ] Изображение монтируется только при открытом аккордеоне; `loading="lazy"`

---

## Stage 4: ProductLine и About — исключения

**Цель:** Зафиксировать намеренное отсутствие растра в этих секциях.

**Факт:**

- **ProductLine:** `ProductCard` — только иконки **Lucide**, растровый `next/image` не используется.
- **About:** Только текст и Lucide; **фотографии не входят** в scope; не подмешивать картинки из старых черновиков Stage 4 без нового ТЗ.

**DoD:**

- [ ] Поведение отражено в `spec.md` и `AI_NOTES.md`
- [ ] В плане/tasks нет ложных требований «next/image для каждого продукта / фото About»

---

## Stage 5: Валидация и документация

**Цель:** Проверки сборки, `verify.yaml`, `AI_NOTES.md`.

**Выходные данные:**

- `.skaro/.../AI_NOTES.md` — архитектура, пути, export, CWV-чеклист
- `verify.yaml` — рабочие команды (без `require` сырого `.ts`)

**DoD:**

- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` проходят
- [ ] `verify.yaml` обновлён (в т.ч. проверка наличия файлов в `public/` через Node)
- [ ] Опциональная проверка размера артефактов — с комментарием про ОС (см. файл)
- [ ] **README:** только по договорённости команды; иначе достаточно `AI_NOTES.md` (краткая отсылка из devplan при необходимости)

---

## Verify (эталон — `verify.yaml`)

Команды: `npm run build`, `npx tsc --noEmit`, `npm run lint`, проверка путей к WebP через Node; опционально — размер чанков (PowerShell vs Unix — в комментарии к шагу).
