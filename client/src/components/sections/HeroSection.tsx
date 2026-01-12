import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import galleryHero from "@assets/501a3423af1aef06a5542c8cc008949d_1761566269222.jpg";

interface HeroSectionProps {
  scrollY: number;
  onChampionshipClick: () => void;
}

export function HeroSection({ scrollY, onChampionshipClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
      {/* Artistic Gallery Photo Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${galleryHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/75 pointer-events-none" />
      
      {/* Golden radial glow for elegance */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 hero-content">
        {/* Main Title - Golden - Artistic Font */}
        <h1 
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary tracking-tight leading-none hero-title mb-8"
          style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}
          data-testid="text-hero-title"
        >
          CURATORS
        </h1>

        {/* Slogan - Artistic Font */}
        <p 
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground/90 font-light italic hero-slogan"
          style={{ fontFamily: 'Playfair Display, serif' }}
          data-testid="text-slogan"
        >
          Edit mind, not video.
        </p>

        {/* Van Gogh Quote - Artistic Font */}
        <blockquote className="max-w-3xl mx-auto pt-6 hero-quote">
          <p 
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light italic leading-relaxed"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-quote"
          >
            "We dream our paint and we paint our dream."
          </p>
          <footer className="text-sm md:text-base text-muted-foreground/70 mt-3" data-testid="text-quote-author">
            — Vincent van Gogh
          </footer>
        </blockquote>

        {/* CTA Buttons - Same font for both, smaller size */}
        <div className="pt-8 hero-button flex flex-wrap items-center justify-center gap-4">
          {/* Championship Button */}
          <Button
            size="default"
            onClick={onChampionshipClick}
            className="bg-destructive text-destructive-foreground border-2 border-destructive"
            data-testid="badge-championship-banner"
          >
            Championship
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* JOIN COMMUNITY Button - Same font as Championship */}
          <Button
            asChild
            size="default"
            data-testid="button-join-community"
          >
            <a href="https://discord.gg/QxjkvAq8NE" target="_blank" rel="noopener noreferrer">
              JOIN COMMUNITY
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Subtle scroll indicator */}
        <div className="pt-16 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
