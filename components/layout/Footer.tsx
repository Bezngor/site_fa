export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-[#1B2A4A] py-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="text-sm opacity-80">
            © {currentYear} FactoryAll. Все права защищены.
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <span className="text-sm font-medium">Контакты</span>
            <a
              href="mailto:hello@factoryall.ru"
              className="text-[#F59E0B] hover:underline"
            >
              hello@factoryall.ru
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
