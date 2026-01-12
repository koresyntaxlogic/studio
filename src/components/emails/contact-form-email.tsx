import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
  suggestedTier: string;
  reason: string;
}

export const ContactFormEmail = ({
  name,
  email,
  message,
  suggestedTier,
  reason,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>Nuevo Mensaje de Contacto de {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Nuevo Mensaje de Contacto</Heading>
        <Section>
          <Text style={paragraph}>Has recibido un nuevo mensaje desde el formulario de tu sitio web.</Text>
          <Text style={label}>Nombre:</Text>
          <Text style={value}>{name}</Text>
          <Text style={label}>Correo Electrónico:</Text>
          <Text style={value}>{email}</Text>
          <Text style={label}>Mensaje:</Text>
          <Text style={value}>{message}</Text>
        </Section>
        <Section style={aiSection}>
            <Heading as="h2" style={subHeading}>Sugerencia de la IA</Heading>
            <Text style={label}>Plan Sugerido:</Text>
            <Text style={value}>{suggestedTier}</Text>
            <Text style={label}>Razón:</Text>
            <Text style={value}>{reason}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #e6ebf1',
  borderRadius: '5px',
};

const heading: React.CSSProperties = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '30px 0',
};

const subHeading: React.CSSProperties = {
    color: '#555',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '20px 0',
    padding: '0 40px',
  };

const paragraph: React.CSSProperties = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 40px',
};

const label: React.CSSProperties = {
    color: '#333',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '0 40px',
    margin: '10px 0 0 0',
  };

const value: React.CSSProperties = {
    color: '#555',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '0 40px',
    margin: '0 0 20px 0',
};

const aiSection: React.CSSProperties = {
    backgroundColor: '#f0f8ff',
    marginTop: '20px',
    padding: '20px 0',
}
