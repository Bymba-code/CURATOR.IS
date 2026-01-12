import { Button } from "@/components/ui/button";
import { ExternalLink, UserPlus } from "lucide-react";
import { siteStats, socialLinks } from "@/data/siteStats";
import { featuredEditors } from "@/data/featuredEditors";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import editorsBg from "@assets/0d2a088ef9ae1e3d041598be25e5566f~2_1761912078689.jpg";
import czSatoruVideo from "@assets/AMV] 4k_1762163316255.mp4";

// Ornate Classical Frame Component with Auto-Play on Scroll
function OrnateVideoFrame({ videoSrc, editorName, editorId }: { videoSrc: string; editorName: string; editorId: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().then(() => {
              setIsPlaying(true);
            }).catch((err) => {
              console.log('Auto-play blocked:', err);
            });
          } else {
            video.pause();
            setIsPlaying(false);
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
    <div className="ornate-frame-container">
      {/* Outermost Frame Layer - Bronze/Brown Gradient Background */}
      <div 
        className="p-4 md:p-6 relative"
        style={{
          background: 'linear-gradient(135deg, #8B4513 0%, #654321 25%, #8B6914 50%, #654321 75%, #8B4513 100%)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 215, 0, 0.2)',
        }}
      >
        {/* Ornate Corner Decorations - Top Left & Right */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-primary opacity-60" 
          style={{ 
            borderImage: 'linear-gradient(135deg, #D4AF37, #FFD700) 1',
          }} 
        />
        <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-primary opacity-60"
          style={{ 
            borderImage: 'linear-gradient(135deg, #FFD700, #D4AF37) 1',
          }}
        />
        
        {/* Ornate Corner Decorations - Bottom Left & Right */}
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-primary opacity-60"
          style={{ 
            borderImage: 'linear-gradient(135deg, #D4AF37, #FFD700) 1',
          }}
        />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-primary opacity-60"
          style={{ 
            borderImage: 'linear-gradient(135deg, #FFD700, #D4AF37) 1',
          }}
        />

        {/* Middle Frame Layer - Golden Beaded Border */}
        <div 
          className="p-2 relative"
          style={{
            background: 'linear-gradient(to bottom, #C9A961, #D4AF37, #C9A961)',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(255, 215, 0, 0.4)',
          }}
        >
          {/* Beaded pattern simulation with repeating gradient */}
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,215,0,0.8) 4px, rgba(255,215,0,0.8) 6px)',
            }}
          />

          {/* Inner Shadow Frame */}
          <div 
            className="p-1 relative"
            style={{
              background: '#2C1810',
              boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Video Container */}
            <div className="aspect-video overflow-hidden bg-black relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={videoSrc}
                loop
                muted={false}
                playsInline
                data-testid={`video-${editorId}`}
                style={{ display: 'block' }}
              />
              
              {/* Subtle overlay to enhance frame presence */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.3)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Decorative Flourish Elements - Simulated Baroque Style */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gradient-to-b from-primary/60 to-transparent opacity-70" 
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gradient-to-t from-primary/60 to-transparent opacity-70"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
          }}
        />
      </div>
    </div>
  );
}

export default function Editors() {
  const [hideHeroText, setHideHeroText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHideHeroText(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load and process Instagram embeds
  useEffect(() => {
    const igScript = document.createElement('script');
    igScript.src = 'https://www.instagram.com/embed.js';
    igScript.async = true;
    igScript.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };
    document.body.appendChild(igScript);
    
    const igTimer = setTimeout(() => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    }, 1000);
    
    return () => {
      clearTimeout(igTimer);
      if (document.body.contains(igScript)) {
        document.body.removeChild(igScript);
      }
    };
  }, []);

  // Load and process TikTok embeds
  useEffect(() => {
    const ttScript = document.createElement('script');
    ttScript.src = 'https://www.tiktok.com/embed.js';
    ttScript.async = true;
    document.body.appendChild(ttScript);
    
    return () => {
      if (document.body.contains(ttScript)) {
        document.body.removeChild(ttScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen -mt-16">
      {/* Hero Section - Full Screen with Dramatic Statue Background */}
      <section className="relative h-screen flex items-center justify-center px-4 pt-20 pb-20 overflow-hidden">
        {/* Background Image - Animated Zoom Out */}
        <motion.div 
          className="absolute inset-0 hero-bg-editors"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            backgroundImage: `url(${editorsBg})`,
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Black Filter Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/65 to-black/70" />
        
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
            data-testid="text-editors-title"
          >
            EDITORS
          </motion.h1>

          {/* Subtitle - Animated */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm sm:text-base md:text-lg text-foreground/90 font-light italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-editors-subtitle"
          >
            The artists behind the cut.
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
                In Curators, editors are not just technicians — they are storytellers, craftsmen, and digital artists.
                Each frame they create carries rhythm, emotion, and meaning.
                This page honors those who shape the unseen stories of our generation.
              </p>
            </div>
          </AnimatedSection>

          {/* Overview Block - The Spirit of a Curator */}
          <AnimatedSection>
            <div>
              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-spirit-heading"
              >
                The Spirit of a Curator
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-base leading-normal text-foreground/85 text-center">
                  Our editors redefine creativity in motion.
                  They work behind the screen, yet their impact reaches millions.
                  From short-form reels to cinematic storytelling, each editor builds art with precision, patience, and vision.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Featured Editors Block */}
          <AnimatedSection>
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-16"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-featured-heading"
              >
                Featured Editors
              </h2>

              <div className="space-y-20">
                {featuredEditors.map((editor, idx) => (
                  <AnimatedSection key={editor.id} delay={idx * 0.2}>
                    <div 
                      className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                        editor.imagePosition === 'left' ? 'md:flex-row-reverse' : ''
                      }`}
                      data-testid={`editor-${editor.id}`}
                    >
                      {/* Video or Image Placeholder */}
                      <div className={editor.imagePosition === 'left' ? 'md:order-1' : 'md:order-2'}>
                        {(editor as any).videoPath ? (
                          <OrnateVideoFrame videoSrc={czSatoruVideo} editorName={editor.name} editorId={editor.id} />
                        ) : (editor as any).instagramLink ? (
                          <div className="border border-primary/30 overflow-hidden bg-black flex items-center justify-center min-h-[400px]">
                            <blockquote 
                              className="instagram-media" 
                              data-instgrm-permalink={editor.instagramLink}
                              data-instgrm-version="14"
                              style={{ 
                                background: '#000',
                                border: 0,
                                borderRadius: 0,
                                boxShadow: 'none',
                                margin: '0 auto',
                                maxWidth: '540px',
                                minWidth: '326px',
                                padding: 0,
                                width: 'calc(100% - 2px)'
                              }}
                              data-testid={`instagram-${editor.id}`}
                            />
                          </div>
                        ) : editor.tiktokLink ? (
                          <div className="aspect-[9/16] max-w-[325px] mx-auto border border-primary/30 overflow-hidden bg-black">
                            <blockquote 
                              className="tiktok-embed" 
                              cite={editor.tiktokLink}
                              data-video-id={editor.tiktokLink.split('/').pop()?.split('?')[0]}
                              style={{ 
                                maxWidth: '325px',
                                minWidth: '325px'
                              }}
                              data-testid={`tiktok-${editor.id}`}
                            >
                              <section>
                                <a 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  href={editor.tiktokLink}
                                >
                                  View on TikTok
                                </a>
                              </section>
                            </blockquote>
                          </div>
                        ) : (
                          <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                            <div className="text-center p-8">
                              <div className="text-6xl mb-4">🎬</div>
                              <p className="text-muted-foreground text-sm">
                                {editor.name}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Text Content */}
                      <div className={editor.imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                              {editor.name}
                            </h3>
                            <div className="inline-block px-4 py-1 border border-primary/30 bg-primary/5 relative">
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/40" />
                              <span className="text-xs font-medium text-primary uppercase tracking-wide ml-2">{editor.level}</span>
                            </div>
                          </div>
                          
                          <blockquote 
                            className="text-lg md:text-xl italic text-primary/90 border-l-2 border-primary/40 pl-4"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                          >
                            "{editor.quote}"
                          </blockquote>
                          
                          <p className="text-base leading-relaxed text-foreground/85">
                            {editor.bio}
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
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <div className="text-center space-y-6">
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-lg md:text-xl font-semibold">
                  <span className="text-primary" data-testid="stat-active-editors">{siteStats.community.activeEditors}+ Active Editors</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-primary" data-testid="stat-members">{siteStats.community.totalMembers}+ Members</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-primary" data-testid="stat-reach">50M+ Total Social Reach</span>
                </div>
                <p className="text-base text-muted-foreground italic">
                  Every cut is part of a collective masterpiece — each editor, a curator of the digital age.
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
                Do you believe editing is more than just cutting clips? Join us. Become a curator.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  className="text-base px-6 py-3"
                  data-testid="button-apply-editor"
                >
                  <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                    Apply as Editor
                    <UserPlus className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="text-base px-6 py-3 bg-background/20 backdrop-blur-sm border-primary/40 hover:border-primary/60"
                  data-testid="button-join-discord"
                >
                  <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                    Join Discord
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
