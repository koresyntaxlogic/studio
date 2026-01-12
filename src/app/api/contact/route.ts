'use server';
import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import {ContactFormEmail} from '@/components/emails/contact-form-email';

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error('Las variables de entorno RESEND_API_KEY o FROM_EMAIL no están configuradas.');
    return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
  }
  
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }
    
    const resend = new Resend(apiKey);
    
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
