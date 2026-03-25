# Tasks: images-optimization

Статусы соответствуют **текущему коду** после AG-IO-03. Отдельного `npm run export` нет — используется `npm run build` с `output: 'export'`.

## Stage 1: Конфигурация

- [x] `next.config.js`: `output: 'export'`, `images.unoptimized: true`

## Stage 2: Hero

- [x] `HeroSection`: `next/image`, `fill`, `priority`, `fetchPriority="high"`, `sizes="100vw"`
- [x] Пути и alt: `lib/data/texts.ts` (`backgroundSrc`, `backgroundAlt`)
- [x] Ассет: `public/images/hero.webp`

## Stage 3: Cases

- [x] `CasesSection`: `next/image` в раскрытом блоке, `loading="lazy"`, `sizes` для адаптива
- [x] `lib/data/cases.ts`: локальные пути WebP, `imageWidth` / `imageHeight` / `imageAlt`

## Stage 4: ProductLine и About (исключения)

- [x] ProductLine: карточки с иконками Lucide в `ProductCard` — **без** растрового `next/image`
- [x] About: секция **без** фотографий (Lucide + текст); не добавлять растр из старого Stage 4 без ТЗ

## Stage 5: Документация и проверки

- [x] Актуализированы `spec.md`, `plan.md`, `tasks.md`, `verify.yaml`
- [x] Создан `AI_NOTES.md` (архитектура, пути, export, CWV, замена заглушек)
- [ ] README: **опционально** по договорённости команды — подпункт «Изображения» или ссылка на `AI_NOTES.md`
- [x] Примечание в `clarifications.md`: picsum из Q1 не является обязательной стратегией; факт — локальные WebP

## Команды перед закрытием milestone

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
