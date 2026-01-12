import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";
import { siteStats, socialLinks } from "@/data/siteStats";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import aboutBg from "@assets/122923a872a38e32921b4d4eeeece9b2_1762151893129.jpg";

export default function About() {
  const [hideHeroText, setHideHeroText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHideHeroText(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen -mt-16">
      {/* Hero Section - Full Screen with Gallery Background */}
      <section className="relative h-screen flex items-center justify-center px-4 pt-20 pb-20 overflow-hidden">
        {/* Background Image - Animated Zoom Out */}
        <motion.div 
          className="absolute inset-0 hero-bg-about"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            backgroundImage: `url(${aboutBg})`,
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Black Filter Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/60" />
        
        {/* Bottom Fade to Black */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black pointer-events-none" />
        
        {/* Golden radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        {!hideHeroText && (
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3">
          {/* Main Title - Animated */}
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-none"
            style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}
            data-testid="text-about-title"
          >
            ABOUT
          </motion.h1>

          {/* Subtitle - Animated */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm sm:text-base md:text-lg text-foreground/90 font-light italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-about-subtitle"
          >
            Gallery of Modern Creators
          </motion.p>
        </div>
        )}
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* About Body Section - Black Background */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Paragraph 1 - Origin Story */}
          <AnimatedSection>
            <div className="space-y-6">
              <p 
                className="text-base leading-normal text-foreground/85"
                data-testid="text-origin"
              >
                Curators began as a small creative circle that believed editing is more than cutting videos — it's the art of shaping how people see the world.
              </p>
              <p 
                className="text-base leading-normal text-foreground/85"
                data-testid="text-community"
              >
                Today, we are a growing community of 2,700+ creators united under one vision: to turn creativity into discipline, and discipline into legacy.
              </p>
            </div>
          </AnimatedSection>

          {/* Paragraph 2 - Mission */}
          <AnimatedSection>
            <div className="space-y-6">
              <p 
                className="text-base leading-normal text-foreground/85"
                data-testid="text-mission"
              >
                Our mission is to empower creators to discover the artist within — not through tools, but through mindset.
              </p>
              <p 
                className="text-base leading-normal text-foreground/85"
                data-testid="text-vision"
              >
                We unite editors, designers, and storytellers to build a new creative culture where art, technology, and purpose merge.
              </p>
            </div>
          </AnimatedSection>

          {/* Van Gogh Quote - Center Aligned */}
          <AnimatedSection direction="fade">
            <blockquote 
              className="my-16 text-center"
              data-testid="text-quote"
            >
              <p 
                className="text-lg md:text-xl italic text-primary/90 mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                "We dream our paint and we paint our dream."
              </p>
              <footer className="text-base text-muted-foreground italic">
                — Vincent van Gogh
              </footer>
            </blockquote>
          </AnimatedSection>

          {/* Paragraph 3 - Impact */}
          <AnimatedSection>
            <div className="space-y-6">
              <p 
                className="text-base leading-normal text-foreground/85"
                data-testid="text-impact"
              >
                Since our founding, Curators has organized two major creative events — including the Short Editing Championship — inspiring a new wave of young editors.
              </p>
              <p 
                className="text-base leading-normal text-foreground/85"
                data-testid="text-reach"
              >
                Together, our members have reached over 50 million people across all social platforms.
              </p>
            </div>
          </AnimatedSection>

          {/* Community Stats - Structured Boxes with Golden Accents */}
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
              <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{siteStats.community.activeEditors}+</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">active editors</div>
              </div>
              <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{siteStats.community.totalMembers}+</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Discord members</div>
              </div>
              <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{siteStats.championship.currentEdition}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">events organized</div>
              </div>
              <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>50M+</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">total reach</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Golden Divider Line */}
          <AnimatedSection direction="fade">
            <div className="flex justify-center py-8">
              <div className="w-24 h-0.5 bg-primary/40" />
            </div>
          </AnimatedSection>

          {/* CTA Block */}
          <AnimatedSection>
            <div className="text-center space-y-8">
              <p 
                className="text-xl md:text-2xl text-foreground/90 italic"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-cta"
              >
                If you believe creativity can change the world — you belong here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  className="text-base px-6 py-3"
                  data-testid="button-join-community"
                >
                  <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                    Join Community
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="text-base px-6 py-3 bg-background/20 backdrop-blur-sm border-primary/40 hover:border-primary/60"
                  data-testid="button-watch-trailer"
                >
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Watch Trailer
                    <Play className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
