'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Products } from '@/components/sections/products';
import { TechStack } from '@/components/sections/tech-stack';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCtaClick = useCallback((source: string) => {
    if (!isClient) return;
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: 'Interesado en ' + source,
      description: 'Déjanos tus datos y nos pondremos en contacto contigo.',
    });
  }, [toast, isClient]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero onCtaClick={() => handleCtaClick('Presupuesto Web')} />
        <Services />
        <Products onCtaClick={handleCtaClick} />
        <TechStack />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
