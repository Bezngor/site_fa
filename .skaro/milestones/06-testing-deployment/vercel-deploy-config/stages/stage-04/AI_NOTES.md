# AI_NOTES — Stage 4: Валидация (без отдельного Playwright под заголовки)

## Что было сделано
- Создан файл конфигурации GitHub Actions `.github/workflows/verify.yaml` для автоматической проверки конфигурации Vercel и артефактов сборки.
- Конфигурация запускает проверки на двух операционных системах: Ubuntu и Windows.

## Почему такой подход
- Требуется кроссплатформенная проверка (Windows и Unix). GitHub Actions поддерживает matrix-запуски, что позволяет легко проверить совместимость на разных ОС.
- Проверка включает:
  - Валидацию `vercel.json` и `next.config.js` через `npm run validate:vercel`.
  - Сборку статического сайта через `npm run build`.
  - Проверку наличия `out/index.html` и `out/404/index.html` через `npm run check:out`.
- Для успешной сборки задаются переменные окружения `NEXT_PUBLIC_FORMSPREE_ID` и `NEXT_PUBLIC_SITE_URL`, так как компонент формы использует `NEXT_PUBLIC_FORMSPREE_ID` при рендеринге.

## Файлы, созданные/изменённые
| Файл | Действие | Описание |
|---|---|---|
| `.github/workflows/verify.yaml` | создан | Конфигурация GitHub Actions для запуска валидации и сборки на Ubuntu и Windows |

## Риски и ограничения
- Конфигурация предполагает, что `npm run build` завершается успешно при наличии `NEXT_PUBLIC_FORMSPREE_ID` и `NEXT_PUBLIC_SITE_URL`. Если в проекте потребуются дополнительные переменные окружения, их нужно добавить в шаг Build.
- Заголовки безопасности из `vercel.json` (CSP) не проверяются в этом workflow, так как они применяются только при деплое на Vercel. Для их проверки требуется деплой или локальный запуск `vercel dev`.

## Соответствие инвариантам архитектуры
- [x] Статическая генерация (SSG) — respected: workflow запускает `next build` с `output: 'export'`.
- [x] Bundle size <150 KB — respected: не влияет на конфигурацию CI.
- [x] Server Components по умолчанию — respected: не влияет.
- [x] Изображения через `next/image` — respected: не влияет.
- [x] Tailwind CSS 4 — respected: не влияет.
- [x] Форма через Formspree — respected: задаётся `NEXT_PUBLIC_FORMSPREE_ID` для сборки.
- [x] Я