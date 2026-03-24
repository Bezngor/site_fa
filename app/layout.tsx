import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
});

const siteTitle =
  'FactoryAll — MES и цифровой контур операционного управления производством';
const siteDescription =
  'Внедряем MES и единый цифровой контур: планирование, исполнение заказов, прозрачность цеха и учёт сырья. ИИ — для аналитики и развития системы там, где уже есть надёжные данные. Проекты внедрения — обычно 3–6 месяцев.';

/** Продакшен-домен для canonical и абсолютных URL в метаданных; синхронизируйте с public/robots.txt и public/sitemap.xml при смене хоста. */
const siteUrl = 'https://factoryall.ru';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'FactoryAll',
    'MES',
    'цифровой контур производства',
    'операционное управление производством',
    'планирование производства',
    'учёт на производстве',
    'MES внедрение',
    'цифровизация цеха',
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: 'FactoryAll',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'FactoryAll — MES и цифровой контур производства',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${montserrat.variable} font-sans`}
    >
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}