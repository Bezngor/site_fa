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
    <header className="fixed top-0 w-full z-50 bg-[#1B2A4A] h-20 flex items-center px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold"
          onClick={(e) => handleNavClick(e, '#')}
        >
          <span className="text-white">F</span>
          <span className="text-[#F59E0B]">!</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white hover:text-[#F59E0B] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F59E0B] transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
