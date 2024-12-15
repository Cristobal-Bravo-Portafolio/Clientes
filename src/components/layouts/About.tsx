'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Card from '../ui/Card';
import Container from '../ui/Container';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.querySelectorAll('.animate-on-scroll').forEach(el => {
            if (entry.isIntersecting) {
              el.classList.add('show-animate');
              el.classList.remove('hide-animate');
            } else {
              el.classList.remove('show-animate');
              el.classList.add('hide-animate');
            }
          });
        });
      },
      { threshold: 0.2 }
    );
  
    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      id="sobre-nosotros"
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
      style={{
        height: 'calc(100vh - 130px)',
        padding: '40px',
        maxWidth: '100vw'
      }}
    >
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full h-full items-center max-w-[100%]">
      <Card
  variant="about"
  fullWidth
  className="animate-on-scroll text-animation bg-[#1A1C2C] shadow-lg p-6 md:p-10 flex flex-col justify-center h-full rounded-lg w-full"
>
          <h2 className="text-3xl md:text-4xl font-light text-[#F7BA0D] mb-6">
            Sobre Nosotros
          </h2>
          <div className="space-y-5">
            <p className="text-base md:text-lg text-white/90 font-light leading-relaxed">
              En Mitsuha Nikkei, fusionamos la delicadeza de la cocina japonesa con
              los vibrantes sabores de la gastronomía peruana.
            </p>
            <p className="text-base md:text-lg text-white/90 font-light leading-relaxed">
              Cada plato es una obra maestra que refleja nuestra pasión por crear
              experiencias culinarias únicas.
            </p>
          </div>
        </Card>
        <div className="animate-on-scroll image-animation relative w-full h-full">
  <Image
    src="/img/imgabout.jpg"
    alt="Experiencia Mitsuha"
    fill
    className="object-cover rounded-lg"
    priority
  />
</div>
      </Container>
    </section>
  );
};

export default About;








