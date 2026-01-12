import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';
import 'dotenv/config';

const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("El correo electrónico no es válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedFields = contactFormSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({
        message: 'Error en el formulario. Por favor, corrija los campos.',
        errors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { name, email, message } = validatedFields.data;

    if (!process.env.RESEND_API_KEY) {
      console.error('La clave de API de Resend no está configurada.');
      return NextResponse.json({ message: "Error del servidor: La configuración de correo no está completa." }, { status: 500 });
    }
    if (!process.env.FROM_EMAIL) {
      console.error('El correo electrónico de origen no está configurado.');
      return NextResponse.json({ message: "Error del servidor: La configuración de correo no está completa." }, { status: 500 });
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

    return NextResponse.json({
      success: true,
      message: "¡Gracias por contactarnos! Tu mensaje ha sido recibido.",
    }, { status: 200 });

  } catch (error) {
    console.error('Error al procesar el formulario de contacto:', error);
    return NextResponse.json({
      success: false,
      message: "Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.",
    }, { status: 500 });
  }
}
