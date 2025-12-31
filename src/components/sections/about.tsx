import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AnimateOnScroll } from '@/components/ui-elements/animate-on-scroll';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const stats = [
  { number: '50+', label: 'Proyectos Entregados' },
  { number: '100%', label: 'Clientes Satisfechos' },
  { number: '24/7', label: 'Soporte Técnico' },
  { number: '5+', label: 'Años de Exp.' },
];

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <section id="about" className="py-20 lg:py-28 bg-gradient-to-b from-background to-card/20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateOnScroll>
            <h2 className="font-headline text-3xl md:text-4xl mb-6">
              Sobre <span className="text-gradient">Kore Syntax</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Somos una empresa dedicada a la excelencia tecnológica. En Kore Syntax Logic, no solo escribimos código; diseñamos el futuro digital de nuestros clientes combinando lógica impecable con interfaces modernas.
              </p>
              <p>
                Nuestro enfoque se basa en tres pilares: Calidad, Innovación y Escalabilidad. Cada línea de código está pensada para soportar el crecimiento de tu negocio.
              </p>
            </div>
            <Button size="lg" variant="secondary" className="mt-8 font-headline uppercase tracking-wider bg-accent text-accent-foreground border border-accent hover:bg-transparent hover:text-accent">
              Más sobre nosotros
            </Button>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-6 text-center bg-card/50">
                  <span className="block font-headline text-4xl font-bold text-primary">{stat.number}</span>
                  <span className="block mt-1 text-sm text-muted-foreground">{stat.label}</span>
                </Card>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
