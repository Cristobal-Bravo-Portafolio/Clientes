'use client';
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Container from '../ui/Container';
import Card from '../ui/Card';
import { menuData } from '../../lib/menuData.json';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [velocity, setVelocity] = useState(0);

  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const firstHalf = menuData.slice(0, Math.ceil(menuData.length / 2));
  const secondHalf = menuData.slice(Math.ceil(menuData.length / 2));

  const selectedCategoryData = menuData.find((cat) => cat.id === selectedCategory);

  const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>, row: HTMLDivElement | null) => {
    if (!row) return;
    setIsDragging(true);
    setStartX(e.pageX - row.offsetLeft);
    setScrollLeft(row.scrollLeft);
    setLastTime(Date.now());
    setVelocity(0);
    row.classList.add('cursor-grabbing');
  }, []);

  const handleDrag = useCallback((e: React.MouseEvent<HTMLDivElement>, row: HTMLDivElement | null) => {
    if (!isDragging || !row) return;
    e.preventDefault();

    const x = e.pageX - row.offsetLeft;
    const walk = (x - startX) * 2;
    const newScrollLeft = scrollLeft - walk;

    const now = Date.now();
    const dt = now - lastTime;
    const newVelocity = (newScrollLeft - row.scrollLeft) / dt;

    setVelocity(newVelocity);
    setLastTime(now);

    if (newScrollLeft >= row.scrollWidth / 3) {
      row.scrollLeft = 0;
    } else if (newScrollLeft <= 0) {
      row.scrollLeft = row.scrollWidth / 3;
    } else {
      row.scrollLeft = newScrollLeft;
    }
  }, [isDragging, startX, scrollLeft, lastTime]);

  const handleDragEnd = useCallback((row: HTMLDivElement | null) => {
    if (!row) return;
    setIsDragging(false);
    row.classList.remove('cursor-grabbing');

    let currentVelocity = velocity;
    const decelerate = () => {
      if (Math.abs(currentVelocity) < 0.1 || !row) {
        cancelAnimationFrame(animationFrameRef.current!);
        return;
      }

      currentVelocity *= 0.95;
      row.scrollLeft += currentVelocity * 16;

      if (row.scrollLeft >= row.scrollWidth / 3) {
        row.scrollLeft = 0;
      } else if (row.scrollLeft <= 0) {
        row.scrollLeft = row.scrollWidth / 3;
      }

      animationFrameRef.current = requestAnimationFrame(decelerate);
    };

    if (Math.abs(velocity) > 0.1) {
      decelerate();
    }
  }, [velocity]);

  const scrollToSection = useCallback(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const RowContent = ({ items, rowKey }: { items: typeof firstHalf, rowKey: string }) => (
    <>
      {[...items, ...items, ...items].map((category, index) => (
        <Card
          key={`${rowKey}-${category.id}-${index}`}
          variant="menu-category"
          className="w-[650px] h-[32vh] shrink-0 transform transition-all duration-500 
                   hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-[#F7BA0D]/20"
          onClick={() => {
            if (!isDragging) {
              setSelectedCategory(category.id);
              setTimeout(scrollToSection, 100);
            }
          }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-xl group">
            <Image
              src={category.image}
              alt={category.title}
              fill
              priority
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent 
                          group-hover:from-black/70 transition-all duration-500" />
            <span className="absolute bottom-6 left-6 text-3xl text-white font-light 
                         transition-all duration-500 group-hover:text-[#F7BA0D] group-hover:translate-x-2">
              {category.title}
            </span>
          </div>
        </Card>
      ))}
    </>
  );

  const MenuItem = ({ item }: { item: any }) => (
    <Card className="bg-black/50 rounded-xl overflow-hidden hover:bg-black/70 transition-duration-500">
      <div className="aspect-video relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-2xl font-light text-[#F7BA0D]">{item.name}</h3>
            {item.description && (
              <p className="text-gray-300 mt-2">{item.description}</p>
            )}
          </div>
          <p className="text-xl text-white font-light whitespace-nowrap">
            ${item.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <section className="relative bg-[#1A1C2C] text-white min-h-screen w-screen">
      <nav className="sticky top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-40">
        <Container className="py-4">
          <h2 className="text-4xl text-center font-light text-[#F7BA0D] hover:text-[#D6A00B] transition-all duration-500">
            Nuestra Carta
          </h2>
        </Container>
        
        {selectedCategory && (
          <>
            <div className="border-t border-[#F7BA0D]/20">
              <Container className="py-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setIsMenuOpen(false);
                  }}
                  className="text-[#F7BA0D] hover:text-[#D6A00B] transition-colors text-xl"
                >
                  ← Volver a la carta
                </button>
                <div className="text-center">
                  <h3 className="text-3xl text-white font-light hover:text-[#F7BA0D] transition-colors">
                    {selectedCategoryData?.title}
                  </h3>
                  {selectedCategoryData?.subtitle && (
                    <p className="text-lg text-gray-400 mt-1">{selectedCategoryData.subtitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-[#F7BA0D] hover:text-[#D6A00B] p-2"
                  >
                    <div className="w-6 h-5 flex flex-col justify-between">
                      {[...Array(3)].map((_, i) => (
                        <span key={i} className="w-full h-0.5 bg-current transition-all duration-300" />
                      ))}
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = menuData.findIndex((c) => c.id === selectedCategory);
                      setSelectedCategory(menuData[(currentIndex + 1) % menuData.length].id);
                    }}
                    className="text-[#F7BA0D] hover:text-[#D6A00B] transition-colors text-xl"
                  >
                    Siguiente →
                  </button>
                </div>
              </Container>
            </div>

            {isMenuOpen && (
              <div className="border-t border-[#F7BA0D]/20 bg-black/95">
                <Container className="py-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuData.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsMenuOpen(false);
                          setTimeout(scrollToSection, 100);
                        }}
                        className="text-left p-6 hover:bg-[#F7BA0D]/10 rounded-lg transition-colors"
                      >
                        <h4 className="text-[#F7BA0D] text-2xl">{category.title}</h4>
                      </button>
                    ))}
                  </div>
                </Container>
              </div>
            )}
          </>
        )}
      </nav>

      {!selectedCategory ? (
        <div className="pt-8 w-full">
          <div className="relative mb-8 h-[42vh] w-screen overflow-hidden">
            <div className="absolute inset-0 bg-[#1A1C2C]/80" />
            <div className="absolute inset-0 flex items-center">
              <div
                ref={topRowRef}
                className="flex gap-8 pl-8 cursor-grab overflow-x-auto hide-scrollbar select-none w-[300vw] menu-row"
                onMouseDown={(e) => handleDragStart(e, topRowRef.current)}
                onMouseMove={(e) => handleDrag(e, topRowRef.current)}
                onMouseUp={() => handleDragEnd(topRowRef.current)}
                onMouseLeave={() => handleDragEnd(topRowRef.current)}
              >
                <RowContent items={firstHalf} rowKey="top" />
              </div>
            </div>
          </div>
          <div className="relative h-[42vh] w-screen overflow-hidden -mt-12">
            <div className="absolute inset-0 bg-[#1A1C2C]/80" />
            <div className="absolute inset-0 flex items-center">
              <div
                ref={bottomRowRef}
                className="flex gap-8 pl-8 cursor-grab overflow-x-auto hide-scrollbar select-none w-[300vw] menu-row"
                onMouseDown={(e) => handleDragStart(e, bottomRowRef.current)}
                onMouseMove={(e) => handleDrag(e, bottomRowRef.current)}
                onMouseUp={() => handleDragEnd(bottomRowRef.current)}
                onMouseLeave={() => handleDragEnd(bottomRowRef.current)}
              >
                <RowContent items={secondHalf} rowKey="bottom" />
              </div>
            </div>
          </div>
        </div>
      ) : selectedCategoryData ? (
        <div ref={sectionRef} className="w-full py-12">
          {selectedCategoryData.description && (
            <Container className="mb-8">
              <p className="text-gray-300 text-lg text-center">{selectedCategoryData.description}</p>
            </Container>
          )}
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedCategoryData.items.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </Container>
        </div>
      ) : null}
    </section>
  );
};

export default Menu;