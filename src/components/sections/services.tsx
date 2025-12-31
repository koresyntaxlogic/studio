import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Smartphone, Search, BrainCircuit } from 'lucide-react';
import { AnimateOnScroll } from "@/components/ui-elements/animate-on-scroll";

const services = [
  { icon: Code, title: 'Desarrollo Web', desc: 'Sitios corporativos, e-commerce y sistemas web a medida. Arquitectura robusta y diseño moderno.' },
  { icon: Smartphone, title: 'Apps Android', desc: 'Desarrollo nativo con Android Studio. Rendimiento óptimo y experiencia de usuario fluida.' },
  { icon: Search, title: 'Búsqueda Inteligente', desc: 'Integración de sistemas de búsqueda avanzada y filtros complejos para grandes volúmenes de datos.' },
  { icon: BrainCircuit, title: 'Integración IA', desc: 'Soluciones basadas en Inteligencia Artificial para automatizar procesos y predecir comportamientos.' }
];

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl">
            Nuestros <span className="text-gradient">Servicios</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Soluciones tecnológicas integrales diseñadas para escalar con tu negocio.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.title} delay={index * 100}>
              <Card className="h-full bg-card/50 hover:border-primary hover:bg-card/80 transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <div className="mb-4">
                    <service.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
