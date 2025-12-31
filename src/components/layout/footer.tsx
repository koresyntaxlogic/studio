import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: '#' },
    { icon: Github, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-background/50 border-t border-border mt-20">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
          <Link href="#home" className="font-headline text-lg font-bold">
            KORE<span className="text-accent">SYNTAX</span>_LOGIC
          </Link>
          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`Social link ${index + 1}`}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Kore Syntax Logic. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
