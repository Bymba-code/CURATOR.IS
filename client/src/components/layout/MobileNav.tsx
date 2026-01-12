import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { menuItems, socialLinks } from "@/data/siteStats";
import { ExternalLink } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [location] = useLocation();

  const handleNavClick = () => {
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-64">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-3xl text-primary text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            CURATORS
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8">
          {/* Navigation Menu - Compact & Minimal */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={handleNavClick}
                className={`block px-3 py-2 text-base font-light tracking-wide transition-colors duration-200 ${
                  location === item.path
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.05em' }}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Join Community CTA */}
          <div className="pt-4">
            <Button
              asChild
              className="w-full"
              size="default"
              data-testid="button-nav-join"
            >
              <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
                JOIN COMMUNITY
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
