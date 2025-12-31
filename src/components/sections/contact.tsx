'use client';

import { useFormState as useActionState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';

import { handleContact, type ContactFormState } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, Lightbulb } from 'lucide-react';
import { AnimateOnScroll } from '../ui-elements/animate-on-scroll';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("El correo electrónico no es válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const initialState: ContactFormState = {
  success: false,
  message: '',
};

export function Contact() {
  const [formState, formAction] = useActionState(handleContact, initialState);
  const { toast } = useToast();
  const [showSuggestionDialog, setShowSuggestionDialog] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        if(formState.aiSuggestion){
            setShowSuggestionDialog(true);
        } else {
             toast({ title: "Éxito", description: formState.message });
        }
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: "Error en el formulario",
          description: formState.message,
        });
      }
    }
  }, [formState, toast, form]);

  const onFormSubmit = (data: ContactFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    formAction(formData);
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
                    ref={formRef}
                    action={(formData) => formAction(formData)}
                    onSubmit={form.handleSubmit(() => onFormSubmit(form.getValues()))}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-code">Nombre Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                            <Input placeholder="ejemplo@correo.com" {...field} />
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
                    >
                      Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </section>

      <AlertDialog open={showSuggestionDialog} onOpenChange={setShowSuggestionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
                <Bot className="h-8 w-8 text-primary" />
                <AlertDialogTitle className="font-headline text-2xl">Sugerencia de IA</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base text-muted-foreground pt-2">
              Gracias por tu mensaje. Basado en los detalles de tu proyecto, nuestra IA sugiere el siguiente plan:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Plan Sugerido: {formState.aiSuggestion?.tier}
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">{formState.aiSuggestion?.reason}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuggestionDialog(false)}>
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
