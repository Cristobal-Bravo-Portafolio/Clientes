'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../ui/Container';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 120; // Altura del navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = ['Sobre Nosotros', 'Menú', 'Contacto'];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50 shadow-lg">
      <Container>
        <div className="flex items-center justify-between min-h-[120px]">
          <Link href="/" className="flex items-center gap-6 group">
            <Image
              src="/img/logo.png"
              alt="Mitsuha Nikkei Logo"
              width={100}
              height={100}
              className="transform transition-all duration-500 group-hover:scale-105"
              quality={100}
              priority
            />
            <h1 className="overflow-hidden">
              <div className="transform transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#D6A00B]">
                <span className="inline-block font-light text-3xl tracking-wider text-[#F7BA0D]">
                  Mitsuha
                </span>
                <span className="inline-block font-extralight text-2xl tracking-widest ml-2 text-[#F7BA0D]">
                  Nikkei
                </span>
              </div>
            </h1>
          </Link>

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center gap-16">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-white relative text-lg font-light tracking-wider cursor-pointer
                          hover:text-[#F7BA0D] transition-all duration-500
                          after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                          after:w-0 after:h-[1px] after:bg-[#F7BA0D]
                          after:transition-all after:duration-500
                          hover:after:w-full"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Botón Móvil */}
          <button 
            className="p-2 md:hidden group" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú"
          >
            <div className="w-8 h-6 flex flex-col justify-between">
              {[...Array(3)].map((_, i) => (
                <span 
                  key={i} 
                  className={`w-full h-0.5 bg-[#F7BA0D] transition-all duration-300 
                            ${isMenuOpen && i === 0 ? 'rotate-45 translate-y-2.5' : ''}
                            ${isMenuOpen && i === 1 ? 'opacity-0' : ''}
                            ${isMenuOpen && i === 2 ? '-rotate-45 -translate-y-2.5' : ''}
                            group-hover:bg-[#D6A00B]`}
                />
              ))}
            </div>
          </button>
        </div>

        {/* Menú Móvil */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden
                        ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="block w-full text-left px-4 py-2 text-white hover:text-[#F7BA0D] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;