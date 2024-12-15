'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from '../ui/Container';
import Button from '../ui/Button';

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/img/banner/imgb1.jpg', '/img/banner/imgb2.jpg', '/img/banner/imgb3.jpg'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Cambio cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={img}
            alt={`Mitsuha Nikkei Banner ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        </div>
      ))}

      <Container className="relative h-full flex items-center">
        <div className="text-white max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-medium mb-6 font-nikkei">
            Mitsuha Nikkei
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 font-nikkei">
            Fusión de sabores japoneses y peruanos
          </p>
          <Button 
            href="#menu" 
            size="lg"
            className="bg-yellow-500/90 hover:bg-yellow-400 text-black font-medium px-10 py-4"
          >
            Ver Menú
          </Button>
        </div>

        {/* Indicadores de imagen */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300
                ${index === currentImage ? 'bg-yellow-500 w-8' : 'bg-white/50'}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Banner;