import Link from 'next/link';
import { navLinks } from '@/lib/data/navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1B2A4A] text-white shadow-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          Factory<span className="text-[#F59E0B]">All</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-[#F59E0B]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="rounded-md bg-[#F59E0B] px-5 py-2 text-sm font-bold text-[#1B2A4A] transition-transform hover:scale-105"
          >
            Связаться
          </a>
        </nav>
      </div>
    </header>
  );
}
