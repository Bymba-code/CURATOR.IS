import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { SiDiscord, SiFacebook, SiTiktok, SiInstagram } from "react-icons/si";
import { socialLinks } from "@/data/siteStats";

export function Footer() {
  return (
    <footer className="relative py-12 md:py-16 px-4 border-t border-border/30 z-10">
      <div className="absolute inset-0 bg-card/20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <h3 
            className="text-3xl md:text-4xl font-bold text-primary mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-footer-brand"
          >
            CURATORS
          </h3>
          <p className="text-sm md:text-base text-muted-foreground italic" data-testid="text-footer-tagline">
            Edit mind, not video.
          </p>
        </div>

        {/* Join Community CTA */}
        <div className="flex justify-center mb-8">
          <Button
            asChild
            size="lg"
            data-testid="button-footer-join"
          >
            <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
              JOIN COMMUNITY
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <a
            href={socialLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-card border border-border/40 flex items-center justify-center hover-elevate active-elevate-2 transition-all duration-300"
            aria-label="Join our Discord"
            data-testid="link-discord"
          >
            <SiDiscord className="h-5 w-5 text-primary" />
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-card border border-border/40 flex items-center justify-center hover-elevate active-elevate-2 transition-all duration-300"
            aria-label="Follow on Facebook"
            data-testid="link-facebook"
          >
            <SiFacebook className="h-5 w-5 text-primary" />
          </a>
          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-card border border-border/40 flex items-center justify-center hover-elevate active-elevate-2 transition-all duration-300"
            aria-label="Follow on TikTok"
            data-testid="link-tiktok"
          >
            <SiTiktok className="h-5 w-5 text-primary" />
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-card border border-border/40 flex items-center justify-center hover-elevate active-elevate-2 transition-all duration-300"
            aria-label="Follow on Instagram"
            data-testid="link-instagram"
          >
            <SiInstagram className="h-5 w-5 text-primary" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground" data-testid="text-copyright">
          <p>Curators © 2025 — A Gallery of Modern Creativity</p>
        </div>
      </div>
    </footer>
  );
}
