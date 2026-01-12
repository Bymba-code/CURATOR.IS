import { Button } from "@/components/ui/button";
import { BookOpen, Package, Lightbulb, Users, ExternalLink, Download } from "lucide-react";
import { socialLinks } from "@/data/siteStats";
import { useState, useEffect } from "react";
import resourcesBg from "@assets/8bb605414a528f2e917b82f96e81177f_1761912526279.jpg";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";

const resourceCategories = [
  {
    icon: BookOpen,
    title: "Learning",
    description: "Video lessons, editing breakdowns, and storytelling tutorials — from beginner to master level.",
    buttonText: "Watch Lessons",
    buttonLink: socialLinks.discord,
  },
  {
    icon: Package,
    title: "Templates & Presets",
    description: "Editing packs, overlays, and assets curated by our top editors.",
    buttonText: "Download Packs",
    buttonLink: socialLinks.discord,
  },
  {
    icon: Lightbulb,
    title: "Mindset & Growth",
    description: "Guides about discipline, focus, and creative psychology — the mind behind the edit.",
    buttonText: "Read Guides",
    buttonLink: socialLinks.discord,
  },
  {
    icon: Users,
    title: "Community Tools",
    description: "Access Discord job lists, collaboration channels, and editor challenges.",
    buttonText: "Join the System",
    buttonLink: socialLinks.discord,
  },
];

export default function Resources() {
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
      {/* Hero Section - Full Screen with Artistic Background */}
      <section className="relative h-screen flex items-center justify-center px-4 pt-20 pb-20 overflow-hidden">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 hero-bg-resources"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            backgroundImage: `url(${resourcesBg})`,
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Black Filter Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/50" />
        
        {/* Bottom Fade to Black */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black pointer-events-none" />
        
        {/* Golden radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        {!hideHeroText && (
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3">
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-none"
            style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}
            data-testid="text-resources-title"
          >
            RESOURCES
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm sm:text-base md:text-lg text-foreground/90 font-light italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-resources-subtitle"
          >
            Tools and knowledge for the modern creator.
          </motion.p>
        </div>
        )}
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Content Section - Black Background */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-5xl mx-auto space-y-20">
          
          {/* Intro Paragraph */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <p 
                className="text-base md:text-lg leading-normal text-foreground/85 text-center"
                data-testid="text-intro"
              >
                In Curators, we believe creativity grows when shared.
                This page is a living library — a place for editors to learn, explore, and elevate their craft.
                From editing packs to mindset guides, everything here is designed to help you create with clarity and discipline.
              </p>
            </div>
          </AnimatedSection>

          {/* Resource Category Grid */}
          <AnimatedSection>
            <div>
              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-12"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-toolkit-heading"
              >
                Explore Our Creative Toolkit
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resourceCategories.map((category, index) => (
                  <AnimatedSection key={index} delay={index * 0.1}>
                    <div 
                      className="border border-primary/20 bg-black p-8 space-y-4 relative hover-elevate transition-all duration-300"
                      data-testid={`category-${index}`}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/40" />
                      <div className="flex items-center gap-4 ml-4">
                        <div className="w-12 h-12 border border-primary/30 bg-primary/5 flex items-center justify-center flex-shrink-0">
                          <category.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground uppercase tracking-wide">
                          {category.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed ml-4">
                        {category.description}
                      </p>
                      <div className="pt-2 ml-4">
                        <Button
                          asChild
                          variant="outline"
                          size="default"
                          className="bg-background/20 backdrop-blur-sm border-primary/40 hover:border-primary/60"
                        >
                          <a href={category.buttonLink} target="_blank" rel="noopener noreferrer">
                            {category.buttonText}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Featured Resource Block */}
          <AnimatedSection>
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-starter-heading"
              >
                Editor's Starter Pack
              </h2>
              <p className="text-base leading-normal text-foreground/85 text-center max-w-3xl mx-auto mb-8">
                A curated collection of essential tools for every Curator — from LUTs and fonts to motion assets.
                Available exclusively for registered members.
              </p>
              <div className="flex justify-center">
                <Button
                  asChild
                  className="text-base px-6 py-3"
                  data-testid="button-download-pack"
                >
                  <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                    Download Starter Pack
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats Block */}
          <AnimatedSection>
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <div className="text-center space-y-6">
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-lg md:text-xl font-semibold">
                  <span className="text-primary" data-testid="stat-packs">100+ Shared Editing Packs</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-primary" data-testid="stat-tutorials">30+ Tutorials</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-primary" data-testid="stat-challenges">5+ Ongoing Challenges</span>
                </div>
                <p className="text-base text-muted-foreground italic">
                  Every resource is tested, crafted, and shared by real editors.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Golden Divider */}
          <div className="flex justify-center">
            <div className="w-24 h-0.5 bg-primary/40" />
          </div>

          {/* CTA Block */}
          <AnimatedSection>
            <div className="text-center space-y-8">
              <p 
                className="text-xl md:text-2xl text-foreground/90 italic"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-cta"
              >
                Create smarter. Learn faster. Edit beyond tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  className="text-base px-6 py-3"
                  data-testid="button-explore-all"
                >
                  <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                    Explore All
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="text-base px-6 py-3 bg-background/20 backdrop-blur-sm border-primary/40 hover:border-primary/60"
                  data-testid="button-join-curators"
                >
                  <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                    Join Curators
                    <ExternalLink className="ml-2 h-4 w-4" />
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
