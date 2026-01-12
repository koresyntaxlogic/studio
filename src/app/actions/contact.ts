'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';


const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("El correo electrónico no es válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
};

export async function handleContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Error en el formulario. Por favor, corrija los campos.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { name, email, message } = validatedFields.data;

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('La clave de API de Resend no está configurada.');
    }
    if (!process.env.FROM_EMAIL) {
      throw new Error('El correo electrónico de origen no está configurado.');
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: "koresyntaxlogic@gmail.com",
      subject: `Nuevo mensaje de contacto de ${name}`,
      react: ContactFormEmail({
        name,
        email,
        message,
      }),
    });

    console.log('Lead received and email sent:', validatedFields.data);

    return {
      success: true,
      message: "¡Gracias por contactarnos! Tu mensaje ha sido recibido.",
      errors: null,
    };
  } catch (error) {
    console.error('Error al procesar el formulario de contacto:', error);
    return {
      success: false,
      message: "Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.",
      errors: null,
    };
  }
}
