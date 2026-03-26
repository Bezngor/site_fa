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
  'FactoryAll — операционное управление производством: предсказуемые сроки и загрузка';
const siteDescription =
  'Консалтинг по операционному управлению: диагностика, внедрение и сопровождение. Наводим порядок в операционке — сроки, загрузка, сырьё, прозрачность цеха. Первый шаг — бесплатная экспресс-диагностика. Проекты внедрения — обычно 3–6 месяцев.';

/** Fallback, если не задан NEXT_PUBLIC_SITE_URL; синхронизируйте с public/robots.txt и public/sitemap.xml при смене хоста. */
const siteUrlFallback = 'https://factoryall.ru';
const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || siteUrlFallback;

const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'FactoryAll — операционное управление производством',
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: siteTitle,
  description: siteDescription,
  robots: { index: true, follow: true },
  authors: [{ name: 'FactoryAll' }],
  creator: 'FactoryAll',
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
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
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
