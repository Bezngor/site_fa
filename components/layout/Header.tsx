import Link from 'next/link';
import { navLinks } from '@/lib/data/navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur shadow-sm">
      <div className="container-custom flex h-20 items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-[#1B2A4A]">
          Factory<span className="text-[#F59E0B]">All</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#1B2A4A] transition-colors hover:text-[#F59E0B]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}