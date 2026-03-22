import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'FactoryAll | Консалтинговое агентство',
  description: 'Профессиональные консалтинговые услуги для вашего бизнеса.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="pt-20">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
