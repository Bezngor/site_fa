'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navLinks } from '@/lib/data/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 z-50 flex h-20 w-full items-center bg-[#1B2A4A] px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold"
          onClick={(e) => handleNavClick(e, '#')}
        >
          <span className="text-white">F</span>
          <span className="text-[#F59E0B]">!</span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group relative text-white transition-colors hover:text-[#F59E0B]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#F59E0B] transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
