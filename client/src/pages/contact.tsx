import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, ExternalLink, Send } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { socialLinks } from "@/data/siteStats";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import galleryHero from "@assets/b21f825faa16069b33167366da6bbc19_1762151794769.jpg";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message received.",
      description: "A fellow curator will reach out soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen -mt-16">
      {/* Hero Section with Blade Runner Background */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <motion.div 
          className="absolute inset-0 hero-bg-contact"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            backgroundImage: `url(${galleryHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Dark gradient overlay - lighter for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/50" />
        
        {/* Bottom fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black pointer-events-none" />
        
        {/* Golden radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-3">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-none"
            style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}
            data-testid="text-contact-title"
          >
            CONTACT
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm sm:text-base md:text-lg text-foreground/90 font-light italic" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-contact-subtitle"
          >
            You look lonely. I can fix that.
          </motion.p>
        </div>
        
        <ScrollIndicator />
      </section>

      {/* Content Section */}
      <div className="bg-black py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-24">

          {/* Intro Paragraph */}
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <p className="text-base leading-normal text-foreground/85" data-testid="text-intro-1">
                Even creators need connection.
              </p>
              <p className="text-base leading-normal text-foreground/85" data-testid="text-intro-2">
                Curators exists so you don't have to build alone.
              </p>
              <p className="text-base leading-normal text-foreground/85" data-testid="text-intro-3">
                Write to us, share your vision, or simply say hello —
              </p>
              <p className="text-base leading-normal text-foreground/85" data-testid="text-intro-4">
                because creativity grows stronger together.
              </p>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection>
            <div className="border border-primary/30 bg-black p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
              
              <h2 
                className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center" 
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-form-title"
              >
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-black border-primary/30 text-foreground placeholder:text-muted-foreground"
                    data-testid="input-name"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-black border-primary/30 text-foreground placeholder:text-muted-foreground"
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger 
                      className="bg-black border-primary/30 text-foreground"
                      data-testid="select-subject"
                    >
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-black border-primary/30 text-foreground placeholder:text-muted-foreground resize-none"
                    data-testid="input-message"
                  />
                </div>
                
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-8"
                    data-testid="button-submit"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </AnimatedSection>

          {/* Direct Contact Info */}
          <AnimatedSection>
            <h2 
              className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center" 
              style={{ fontFamily: 'Playfair Display, serif' }}
              data-testid="text-direct-contact-title"
            >
              Connect Directly
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedSection delay={0.1}>
                <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-primary/40" />
                  <div className="w-12 h-12 border border-primary/30 bg-primary/5 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
                  <a 
                    href="mailto:hello@curators.mn" 
                    className="text-primary hover:text-primary/80 transition-colors text-sm"
                    data-testid="link-email"
                  >
                    hello@curators.mn
                  </a>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2}>
                <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-primary/40" />
                  <div className="w-12 h-12 border border-primary/30 bg-primary/5 flex items-center justify-center mx-auto mb-4">
                    <SiDiscord className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Discord Community</h3>
                  <a 
                    href={socialLinks.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors text-sm"
                    data-testid="link-discord"
                  >
                    discord.gg/curators
                  </a>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3}>
                <div className="border border-primary/30 bg-black p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-primary/40" />
                  <div className="w-12 h-12 border border-primary/30 bg-primary/5 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Location</h3>
                  <p className="text-foreground/70 text-sm mb-1">Ulaanbaatar, Mongolia</p>
                  <p className="text-xs text-muted-foreground italic">Global creators. Local roots.</p>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Team Connections */}
          <AnimatedSection>
            <h2 
              className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center" 
              style={{ fontFamily: 'Playfair Display, serif' }}
              data-testid="text-team-title"
            >
              Core Team Channels
            </h2>
            
            <div className="border border-primary/30 bg-black p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <h3 className="text-base font-semibold text-foreground">Editors Department</h3>
                  <a 
                    href="mailto:editors@curators.mn" 
                    className="text-primary hover:text-primary/80 transition-colors text-sm block"
                    data-testid="link-editors-email"
                  >
                    editors@curators.mn
                  </a>
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-base font-semibold text-foreground">Community Growth</h3>
                  <a 
                    href="mailto:community@curators.mn" 
                    className="text-primary hover:text-primary/80 transition-colors text-sm block"
                    data-testid="link-community-email"
                  >
                    community@curators.mn
                  </a>
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-base font-semibold text-foreground">Partnerships & Media</h3>
                  <a 
                    href="mailto:partners@curators.mn" 
                    className="text-primary hover:text-primary/80 transition-colors text-sm block"
                    data-testid="link-partners-email"
                  >
                    partners@curators.mn
                  </a>
                </div>
              </div>
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
                Let's build something timeless.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="px-8"
                  data-testid="button-partner"
                >
                  <a href="/about">
                    Become a Partner
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 bg-background/20 backdrop-blur-sm border-primary/40 hover:border-primary/60"
                  data-testid="button-join"
                >
                  <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                    Join Our Community
                    <SiDiscord className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Footer Highlight */}
          <AnimatedSection direction="fade">
            <div className="flex justify-center py-8">
              <div className="w-24 h-0.5 bg-primary/40" />
            </div>
            <div className="text-center space-y-2">
              <p 
                className="text-base text-foreground/80 italic"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Curators — Gallery of Modern Creators
              </p>
              <p className="text-xs text-muted-foreground">
                © Curators 2025. All Rights Reserved.
              </p>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
