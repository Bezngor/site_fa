# FactoryAll — лендинг (Next.js)

Статический сайт (`output: 'export'`), App Router.

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Артефект экспорта — каталог `out/`.

## E2E (Playwright)

Smoke-тесты главной и контактной формы. Подробности и требования к окружению: [e2e/README.md](e2e/README.md).

```bash
npx playwright install chromium
npm run test:e2e
```

## Прочее

- Линт: `npm run lint`
- Проверка типов: `npm run type-check`
