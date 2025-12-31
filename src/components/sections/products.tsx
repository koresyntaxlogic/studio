'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from 'lucide-react';
import { AnimateOnScroll } from "@/components/ui-elements/animate-on-scroll";

const products = [
  {
    id: 1,
    title: 'Pack Web Corporativa',
    price: '$180.000 – $300.000 CLP',
    desc: 'Sitio web profesional de hasta 5 secciones (Home, Servicios, Nosotros, Portafolio, Contacto).',
    features: ['Diseño responsive', 'SEO básico', 'Formulario de contacto', 'Hasta 5 secciones'],
    buttonText: 'Contratar Pack Web Corporativa'
  },
  {
    id: 2,
    title: 'Sistema Web a Medida',
    price: 'Desde $450.000 CLP',
    desc: 'Desarrollo de sistema web personalizado (login, base de datos, panel administrador, API).',
    features: ['Integración con servicios', 'Automatizaciones', 'Panel de administrador', 'Base de datos'],
    buttonText: 'Solicitar Cotización Personalizada'
  },
  {
    id: 3,
    title: 'App Android Starter',
    price: 'Desde $350.000 CLP',
    desc: 'Aplicación móvil básica para Android (pantallas, navegación, conexión a API).',
    features: ['Pantallas y navegación', 'Conexión a API', 'Publicación en Google Play incluida', 'Diseño nativo'],
    buttonText: 'Contratar App Android Starter'
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
                    {product.buttonText}
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
