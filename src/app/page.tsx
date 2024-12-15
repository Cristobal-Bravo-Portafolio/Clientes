'use client';

import { useState, useEffect } from 'react';
import Banner from "@/components/layouts/Banner";
import About from "@/components/layouts/About";
import Menu from "@/components/layouts/Menu";
import Contact from "@/components/layouts/Contact";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="block relative"> {/* Cambiado flex por block */}
      <Banner />
      <About />
      <Menu />
      <Contact />
      
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#F7BA0D] p-4 rounded-full shadow-lg
                   transition-all duration-300 hover:bg-[#D6A00B] hover:scale-110
                   ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        aria-label="Volver arriba"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </main>
  );
}
