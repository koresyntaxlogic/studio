import { Badge } from "@/components/ui/badge";
import { Atom, Smartphone, ServerCog, Code2, Database, Cloud } from 'lucide-react';
import { AnimateOnScroll } from "@/components/ui-elements/animate-on-scroll";

const techs = [
  { name: 'React', icon: Atom },
  { name: 'Android Studio', icon: Smartphone },
  { name: 'Node.js', icon: ServerCog },
  { name: 'Python AI', icon: Code2 },
  { name: 'Database SQL', icon: Database },
  { name: 'Cloud APIs', icon: Cloud }
];

export function TechStack() {
  return (
    <section id="tech" className="py-20 lg:py-28">
      <div className="container">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl">
            Tecnologías <span className="text-gradient">Core</span>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="flex flex-wrap justify-center gap-4">
            {techs.map((tech) => (
              <Badge
                key={tech.name}
                variant="outline"
                className="font-code text-base px-6 py-3 border-border bg-card/50 hover:border-accent hover:shadow-[0_0_15px_rgba(112,0,255,0.2)] transition-all cursor-default"
              >
                <tech.icon className="h-5 w-5 mr-2" />
                {tech.name}
              </Badge>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
