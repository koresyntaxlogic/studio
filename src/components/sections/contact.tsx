'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Loader2 } from 'lucide-react';
import { AnimateOnScroll } from '../ui-elements/animate-on-scroll';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("El correo electrónico no es válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { name, email, message } = data;
      const mailtoLink = `mailto:koresyntaxlogic@gmail.com?subject=Nuevo mensaje de contacto de ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AEmail de contacto: ${encodeURIComponent(email)}`;
      
      window.location.href = mailtoLink;

      toast({
        title: "¡Gracias por tu mensaje!",
        description: "Se ha abierto tu cliente de correo para que puedas enviarnos el mensaje.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al preparar el mensaje",
        description: "Hubo un problema al intentar abrir tu cliente de correo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <section id="contact" className="py-20 lg:py-28">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl">
              Hablemos de tu <span className="text-gradient">Proyecto</span>
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-muted-foreground">
              ¿Listo para comenzar? Déjanos tus datos y te contactaremos.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <Card className="max-w-2xl mx-auto p-4 sm:p-8 bg-card/50">
              <CardContent className="p-0 sm:p-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-code">Nombre Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-code">Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="ejemplo@correo.com" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-code">Mensaje / Detalles del proyecto</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Necesito una web para mi negocio de..."
                              rows={5}
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full font-headline uppercase tracking-wider bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Abriendo correo...
                        </>
                      ) : (
                        <>
                          Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
