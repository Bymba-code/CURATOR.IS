import { BookOpen } from "lucide-react";

interface AboutSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

export function AboutSection({ sectionRef }: AboutSectionProps) {
  return (
    <section 
      id="about" 
      className="py-20 md:py-32 px-4 relative section-fade z-10"
      ref={sectionRef}
    >
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 border-2 border-primary/30 mb-8">
          <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        </div>

        <h2 
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-8"
          style={{ fontFamily: 'Playfair Display, serif' }}
          data-testid="text-about-title"
        >
          Our Mission
        </h2>

        <div className="space-y-8 text-lg md:text-xl text-foreground/80 leading-relaxed">
          <p data-testid="text-about-mission">
            Curators is a <span className="text-primary font-semibold">creative movement</span> dedicated to celebrating 
            the artistry of digital editors in Mongolia and beyond. We believe editing is not just a technical skill — 
            it's a form of storytelling, an art that shapes how the world sees content.
          </p>

          <p data-testid="text-about-vision">
            Like curators in a museum select and present masterpieces, editors curate raw footage into compelling narratives. 
            We're building a community where this invisible art becomes visible, celebrated, and elevated.
          </p>

          <blockquote 
            className="border-l-4 border-primary/40 pl-6 my-10 text-2xl md:text-3xl font-serif italic text-muted-foreground"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-about-quote"
          >
            "Edit mind, not video."
          </blockquote>

          <p data-testid="text-about-philosophy">
            This philosophy drives everything we do. We don't just teach editing techniques — we cultivate <em>editorial thinking</em>, 
            the mindset that transforms ordinary content into extraordinary experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
