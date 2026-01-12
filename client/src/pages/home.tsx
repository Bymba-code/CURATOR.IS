import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, BookOpen, Trophy, Users, Package } from "lucide-react";
import { Link } from "wouter";
import { socialLinks, siteStats } from "@/data/siteStats";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import galleryHero from "@assets/e27d6ea8b5bd8f646777eb4d534e62d8_1761899036239.jpg";
import czSatoruVideo from "@assets/AMV] 4k_1762163316255.mp4";

// Simple Auto-Play Video Component for Home Page
function AutoPlayVideo({ videoSrc, testId }: { videoSrc: string; testId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch((err) => {
              console.log('Auto-play blocked:', err);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.5] }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      src={videoSrc}
      loop
      muted={false}
      playsInline
      data-testid={testId}
      style={{ display: 'block' }}
    />
  );
}

export default function Home() {
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
    <>
      <div className="-mt-16">
      {/* Hero Section with Darkened Black Filter - Full Screen */}
      <section className="relative h-screen flex items-center justify-center px-4 pt-20 pb-20 overflow-hidden">
        {/* Background Image - Animated Zoom Out */}
        <motion.div 
          className="absolute inset-0 hero-bg-home"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            backgroundImage: `url(${galleryHero})`,
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Black Filter Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/50" />
        
        {/* Bottom Fade to Black - Creates smooth transition */}
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
            data-testid="text-hero-title"
          >
            CURATORS
          </motion.h1>

          {/* Slogan - Animated */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm sm:text-base md:text-lg text-foreground/90 font-light italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-slogan"
          >
            Edit mind, not video.
          </motion.p>
        </div>
        )}
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Main Content - Black Background */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* Stats Section */}
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
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
          </AnimatedSection>

          {/* About Preview */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
                Gallery of Modern Creators
              </h2>
              <p className="text-base leading-normal text-foreground/85">
                Curators began as a small creative circle that believed editing is more than cutting videos — it's the art of shaping how people see the world.
                We unite editors, designers, and storytellers to build a new creative culture where art, technology, and purpose merge.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" className="bg-background/20 backdrop-blur-sm border-primary/40">
                  <Link href="/about">
                    Learn Our Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* The Artists Behind the Cut */}
          <AnimatedSection>
            <div>
              <div className="flex justify-center mb-8">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                The Artists Behind the Cut
              </h2>
              <p className="text-base text-center text-foreground/85 mb-12 max-w-3xl mx-auto">
                In Curators, editors are not just technicians — they are storytellers, craftsmen, and digital artists. Each frame they create carries rhythm, emotion, and meaning.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-8">
                {/* Video Showcase */}
                <div className="order-2 md:order-1">
                  <div className="aspect-video border border-primary/30 overflow-hidden bg-black">
                    <AutoPlayVideo videoSrc={czSatoruVideo} testId="featured-video-home" />
                  </div>
                </div>

                {/* Editor Info */}
                <div className="order-1 md:order-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        CZ Satoru
                      </h3>
                      <div className="inline-block px-4 py-1 border border-primary/30 bg-primary/5 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/40" />
                        <span className="text-xs font-medium text-primary uppercase tracking-wide ml-2">Curator</span>
                      </div>
                    </div>
                    
                    <blockquote 
                      className="text-lg md:text-xl italic text-primary/90 border-l-2 border-primary/40 pl-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      "Every frame tells a story — anime, vlogs, or cinema."
                    </blockquote>
                    
                    <p className="text-base leading-normal text-foreground/85">
                      CZ Satoru specializes in anime edits, vlogs, subtitles, and 3D motion. With nearly 2K YouTube subscribers, his dynamic style blends fast-paced cuts and immersive storytelling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button asChild variant="outline" className="bg-background/20 backdrop-blur-sm border-primary/40">
                  <Link href="/editors">
                    Meet Our Editors
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Community Levels Preview */}
          <AnimatedSection>
            <div>
              <div className="flex justify-center mb-8">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Five Levels of Growth
              </h2>
              <p className="text-base text-center text-foreground/85 mb-12 max-w-3xl mx-auto">
                Our structure defines growth. Every level represents a deeper understanding of visual storytelling — from first edit to artistic mastery.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
                {[
                  { num: "1", name: "Overlayer" },
                  { num: "2", name: "Editor" },
                  { num: "3", name: "Curator" },
                  { num: "4", name: "Composer" },
                  { num: "5", name: "Designer" }
                ].map((level, idx) => (
                  <AnimatedSection key={level.num} delay={idx * 0.1}>
                    <div className="border border-primary/20 bg-black p-4 flex items-center gap-3 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/40" />
                      <span className="text-primary/60 text-xs font-light ml-3">{level.num}</span>
                      <span className="text-sm font-medium text-foreground uppercase tracking-wide">{level.name}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              <div className="text-center">
                <Button asChild variant="outline" className="bg-background/20 backdrop-blur-sm border-primary/40">
                  <Link href="/community">
                    Explore Community
                    <Users className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Championship Preview */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
                Short Editing Championship
              </h2>
              <p className="text-base leading-normal text-foreground/85">
                Mongolia's first national creative battle for editors — a stage where discipline meets imagination.
                Three rounds of competition testing creativity, storytelling, and technique. 
                Judged by expert editors and public votes.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" className="bg-background/20 backdrop-blur-sm border-primary/40">
                  <Link href="/championship">
                    View Championship
                    <Trophy className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Editors Preview */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
                The Artists Behind the Cut
              </h2>
              <p className="text-base leading-normal text-foreground/85">
                In Curators, editors are not just technicians — they are storytellers, craftsmen, and digital artists.
                Each frame they create carries rhythm, emotion, and meaning.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" className="bg-background/20 backdrop-blur-sm border-primary/40">
                  <Link href="/editors">
                    Meet Our Editors
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Resources Preview */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
                Creative Toolkit
              </h2>
              <p className="text-base leading-normal text-foreground/85">
                A living library of learning materials, templates, mindset guides, and community tools.
                From editing packs to creative psychology — everything designed to help you create with clarity and discipline.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" className="bg-background/20 backdrop-blur-sm border-primary/40">
                  <Link href="/resources">
                    Explore Resources
                    <Package className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Final CTA */}
          <AnimatedSection>
            <div className="text-center space-y-8">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>
              <p 
                className="text-lg md:text-xl text-foreground/90 italic"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Join our movement. Edit your mind. Curate your craft.
              </p>
              <Button
                asChild
                size="lg"
                data-testid="button-join-community"
              >
                <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                  Join Community
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </AnimatedSection>

        </div>
      </section>
      </div>
    </>
  );
}
