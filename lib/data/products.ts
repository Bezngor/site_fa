import { Product } from '../../types/index';

export const products: Product[] = [
  {
    name: 'Экспресс-аудит производства',
    description:
      'Диагностика узких мест и потерь за 2 недели с дорожной картой автоматизации.',
    image: '/images/products/audit.webp',
  },
  {
    name: 'Цифровое управление цехом под ключ',
    description:
      'Полный цикл: от анализа процессов до запуска умной системы управления производством.',
    image: '/images/products/implementation.webp',
  },
  {
    name: 'Переход с Excel на цифру',
    description:
      'Замена ручных таблиц и устаревших систем на автоматизированное управление производством с ИИ.',
    image: '/images/products/migration.webp',
  },
  {
    name: 'Цифровой завод для среднего бизнеса',
    description:
      'Готовое решение для среднего производства — запуск за 3–6 месяцев без остановки работы.',
    image: '/images/products/smb.webp',
  },
  {
    name: 'AI-планировщик производства',
    description:
      'Искусственный интеллект автоматически составляет и оптимизирует производственный план.',
    image: '/images/products/ai-planning.webp',
  },
  {
    name: 'Поддержка и развитие системы',
    description:
      'Техническое сопровождение, обновления и развитие платформы после запуска.',
    image: '/images/products/support.webp',
  },
] as const;
