import { Button } from "@/components/ui/button";
import { BookOpen, Users, DollarSign, Trophy, ExternalLink, Info } from "lucide-react";
import { siteStats, socialLinks } from "@/data/siteStats";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import communityBg from "@assets/7e6e6a6655a8f7296de6ce8a8b74f3c1_1761910884910.jpg";

const editorLevels = [
  { number: "1", name: "Overlayer", description: "Beginner editors learning rhythm and timing." },
  { number: "2", name: "Editor", description: "Edits using simple apps with clarity and purpose." },
  { number: "3", name: "Curator", description: "Advanced short-form editor mastering story and flow." },
  { number: "4", name: "Composer", description: "Long-form, complex edits blending emotion and pace." },
  { number: "5", name: "Designer", description: "Animation, motion graphics, and artistic visual identity." },
];

const features = [
  {
    icon: BookOpen,
    title: "Learn & Grow",
    description: "Exclusive courses, workshops, and live mentorship.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "Partner with editors, creators, and influencers.",
  },
  {
    icon: DollarSign,
    title: "Earn",
    description: "Access client jobs and monetization systems.",
  },
  {
    icon: Trophy,
    title: "Showcase",
    description: "Participate in challenges like the Short Editing Championship.",
  },
];

export default function Community() {
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
          className="absolute inset-0 hero-bg-community"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            backgroundImage: `url(${communityBg})`,
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
            data-testid="text-community-title"
          >
            COMMUNITY
          </motion.h1>

          {/* Subtitle - Animated */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm sm:text-base md:text-lg text-foreground/90 font-light italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-community-subtitle"
          >
            Where creativity becomes a craft.
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
                Curators is more than a network of editors — it's a living gallery of creative minds.
                Here, learning, collaboration, and discipline come together to shape the next generation of storytellers.
              </p>
            </div>
          </AnimatedSection>

          {/* Levels Block */}
          <AnimatedSection>
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-12"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-levels-heading"
              >
                Five Levels of Editors
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - Description */}
                <div className="flex items-center">
                  <p className="text-base leading-normal text-foreground/85">
                    Our structure defines growth. Every level represents a deeper understanding of visual storytelling — from first edit to artistic mastery.
                  </p>
                </div>

                {/* Right Column - Levels List */}
                <div className="space-y-4">
                  {editorLevels.map((level, idx) => (
                    <AnimatedSection key={level.number} delay={idx * 0.1}>
                      <div 
                        className="border border-primary/20 bg-black p-4 relative"
                        data-testid={`level-${level.number}`}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/40" />
                        <div className="ml-4">
                          <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-primary/60 text-xs font-light">{level.number}</span>
                            <h3 className="text-base font-semibold text-foreground uppercase tracking-wide">{level.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{level.description}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Feature Block */}
          <AnimatedSection>
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-features-heading"
              >
                What Members Gain
              </h2>
              <p 
                className="text-lg text-center text-muted-foreground mb-12"
                data-testid="text-features-subheading"
              >
                Inside the Curators ecosystem.
              </p>

              {/* 4-Block Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <AnimatedSection key={index} delay={index * 0.1}>
                    <div 
                      className="border border-primary/20 bg-black p-6 relative"
                      data-testid={`feature-${index}`}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/40" />
                      <div className="ml-4 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 border border-primary/30 bg-primary/5 flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-foreground mb-2 uppercase tracking-wide">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Statistics Block */}
          <AnimatedSection>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <AnimatedSection delay={0.1}>
                  <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden" data-testid="stat-editors">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{siteStats.community.activeEditors}+</div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">active editors</div>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                  <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden" data-testid="stat-members">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{siteStats.community.totalMembers}+</div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Discord members</div>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.3}>
                  <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden" data-testid="stat-reach">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>50M+</div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">total reach</div>
                  </div>
                </AnimatedSection>
              </div>
              <p className="text-base text-center text-muted-foreground italic max-w-2xl mx-auto">
                A digital nation of editors — connected through Discord, bonded through creation.
              </p>
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
                Join our movement. Edit your mind. Curate your craft.
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
                  data-testid="button-learn-more"
                >
                  <a href="/about">
                    Learn More
                    <Info className="ml-2 h-4 w-4" />
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
