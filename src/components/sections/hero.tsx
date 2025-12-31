import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { AnimateOnScroll } from '@/components/ui-elements/animate-on-scroll';

interface HeroProps {
  onCtaClick: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-background bg-[radial-gradient(circle_at_50%_50%,hsl(var(--card))_0%,hsl(var(--background))_70%)] -z-10"></div>
      
      <div className="container pt-[70px]">
        <AnimateOnScroll className="flex flex-col items-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl !leading-tight mb-6 max-w-4xl">
            Transformamos Ideas en <br />
            <span className="text-gradient">Lógica Digital</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg mb-8">
            Expertos en desarrollo web escalable, aplicaciones Android nativas y soluciones de Inteligencia Artificial. Llevamos tu negocio al siguiente nivel tecnológico.
          </p>

          <div className="font-code bg-card/80 p-4 sm:p-6 rounded-lg border border-border text-left max-w-md w-full mb-10 shadow-lg">
            <pre className="text-sm"><code>
              <span className="text-purple-400">const</span> future = {'{'}<br />
              {'  '}innovation: <span className="text-green-400">'Kore Syntax Logic'</span>,<br />
              {'  '}performance: <span className="text-orange-400">'100%'</span><br />
              {'}'}; <Zap className="inline-block h-4 w-4 text-yellow-400" />
            </code></pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="font-headline uppercase tracking-wider bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
              onClick={onCtaClick}
            >
              Solicitar Presupuesto
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="font-headline uppercase tracking-wider bg-accent text-accent-foreground border border-accent hover:bg-transparent hover:text-accent hover:shadow-[0_0_15px_rgba(112,0,255,0.4)] transition-all"
              onClick={scrollToProducts}
            >
              Ver Productos
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
