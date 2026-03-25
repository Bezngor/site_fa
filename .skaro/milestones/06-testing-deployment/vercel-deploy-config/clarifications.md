# Clarifications: vercel-deploy-config

## Question 1
Как должна обрабатываться маршрутизация для несуществующих страниц в статическом режиме Vercel?

*Context:* При использовании output: export Next.js генерирует статический 404.html, который нужно правильно сопоставить в конфигурации Vercel.

**Options:**
- A) Добавить правило routes в vercel.json для перенаправления всех ненайденных путей на 404.html
- B) Использовать стандартное поведение Vercel для статических сайтов без дополнительных правил
- C) Настроить rewrite для поддержки чистых URL (без .html) через cleanUrls в vercel.json

**Answer:**
Настроить rewrite для поддержки чистых URL (без .html) через cleanUrls в vercel.json

## Question 2
Какую команду сборки следует прописать в настройках проекта Vercel?

*Context:* Архитектура требует SSG (next export), что влияет на то, какую команду Vercel должен запускать для получения артефактов.

**Options:**
- A) next build (с установленным output: 'export' в next.config.js)
- B) npm run build && next export (устаревший метод для старых версий)
- C) Оставить по умолчанию 'next build', так как Next.js 15 сам определит экспорт

**Answer:**
next build (с установленным output: 'export' в next.config.js)

## Question 3
Требуется ли настройка заголовков безопасности (Security Headers) в vercel.json?

*Context:* В архитектуре упомянута CSP, но для статического экспорта заголовки должны задаваться на уровне платформы хостинга.

**Options:**
- A) Добавить блок headers в vercel.json с Content-Security-Policy, X-Frame-Options и т.д.
- B) Не настраивать заголовки в vercel.json, полагаться на стандартные настройки Vercel
- C) Ограничиться только CSP в meta-тегах внутри layout.tsx

**Answer:**
Добавить блок headers в vercel.json с Content-Security-Policy, X-Frame-Options и т.д.

## Question 4
Как организовать обработку trailing slashes для SEO и консистентности ссылок?

*Context:* Статические сайты могут по-разному обрабатывать пути типа /about и /about/.

**Options:**
- A) Установить trailingSlash: true в next.config.js для генерации папок с index.html
- B) Установить trailingSlash: false для генерации файлов типа about.html
- C) Использовать настройку trailingSlash в vercel.json для автоматического редиректа

**Answer:**
Установить trailingSlash: true в next.config.js для генерации папок с index.html

## Question 5
Нужна ли конфигурация для оптимизации кэширования статических ассетов (изображений)?

*Context:* Поскольку используется next/image с SSG, изображения оптимизируются при сборке и сохраняются в _next/static/media.

**Options:**
- A) Добавить правила кэширования для папки _next/static в vercel.json на длительный срок
- B) Использовать стандартное кэширование Vercel (L1/L2 Edge Cache)
- C) Не настраивать кэширование вручную

**Answer:**
Использовать стандартное кэширование Vercel (L1/L2 Edge Cache)
