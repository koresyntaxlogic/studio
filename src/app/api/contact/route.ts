'use server';
import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import {ContactFormEmail} from '@/components/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }

    if (!fromEmail) {
      console.error('La variable de entorno FROM_EMAIL no está configurada.');
      return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
    }
    
    await resend.emails.send({
      from: fromEmail,
      to: ['koresyntaxlogic@gmail.com'],
      subject: `Nuevo mensaje de contacto de ${name}`,
      react: ContactFormEmail({ name, email, message }),
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    });

    return NextResponse.json({ message: 'Correo enviado exitosamente.' }, { status: 200 });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ error: 'Error al enviar el correo.' }, { status: 500 });
  }
}
