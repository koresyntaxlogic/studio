'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from 'lucide-react';
import { AnimateOnScroll } from "@/components/ui-elements/animate-on-scroll";

const products = [
  {
    id: 1,
    title: 'Pack Web Corporativa',
    price: '$499',
    desc: 'Sitio web profesional listo para comenzar.',
    features: ['Diseño Responsive', '5 Secciones', 'Formulario de Contacto', 'Hosting Gratis 1 año']
  },
  {
    id: 2,
    title: 'Sistema Web a Medida',
    price: 'Desde $1,500',
    desc: 'Panel de administración y gestión de datos.',
    features: ['Dashboard Personalizado', 'Base de Datos Integrada', 'Gestión de Usuarios', 'API Rest']
  },
  {
    id: 3,
    title: 'App Android Starter',
    price: '$800',
    desc: 'Aplicación móvil nativa funcional.',
    features: ['Des. Android Studio', 'Integración API', 'Publicación en PlayStore', 'Soporte Push']
  }
];

interface ProductsProps {
  onCtaClick: (productTitle: string) => void;
}

export function Products({ onCtaClick }: ProductsProps) {
  return (
    <section id="products" className="py-20 lg:py-28 bg-card/20">
      <div className="container">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl">
            Productos <span className="text-gradient">Digitales</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Soluciones empaquetadas para acelerar tu presencia digital.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AnimateOnScroll key={product.id} delay={index * 100}>
              <Card className="h-full flex flex-col bg-card/50 border-border hover:border-primary/50 transition-colors">
                <CardHeader className="text-center bg-gradient-to-br from-accent/5 to-primary/5 p-8">
                  <CardTitle className="font-headline text-xl">{product.title}</CardTitle>
                  <p className="text-3xl font-bold text-primary mt-2">{product.price}</p>
                </CardHeader>
                <CardContent className="flex-grow p-8">
                  <CardDescription className="mb-6">{product.desc}</CardDescription>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-muted-foreground">
                        <Check className="h-4 w-4 mr-2 text-green-400" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button
                    className="w-full font-headline uppercase tracking-wider bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => onCtaClick(product.title)}
                  >
                    Comprar / Consultar
                  </Button>
                </CardFooter>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
