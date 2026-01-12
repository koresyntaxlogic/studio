'use server';

import { z } from 'zod';
import { suggestTier } from '@/ai/flows/contact-form-tier-suggestion';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("El correo electrónico no es válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  aiSuggestion?: {
    tier: string;
    reason: string;
  };
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
    const { suggestedTier, reason } = await suggestTier({ message });

    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: process.env.TO_EMAIL!,
        subject: `Nuevo mensaje de contacto de ${name}`,
        react: ContactFormEmail({
          name,
          email,
          message,
          suggestedTier,
          reason,
        }),
      });
    } catch (error) {
       console.error('Email sending error:', error);
       // We can still continue even if email fails
    }

    console.log('Lead received:', validatedFields.data);
    console.log('AI Suggestion:', { suggestedTier, reason });

    return {
      success: true,
      message: "¡Gracias por contactarnos! Tu mensaje ha sido recibido.",
      aiSuggestion: {
        tier: suggestedTier,
        reason: reason,
      },
      errors: null,
    };
  } catch (error) {
    console.error('Error handling contact form:', error);
    return {
      success: false,
      message: "Error al procesar el mensaje. Por favor, inténtelo de nuevo más tarde.",
      errors: null,
    };
  }
}
