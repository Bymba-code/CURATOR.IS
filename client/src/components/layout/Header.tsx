import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-4 flex items-center justify-end">
          {/* Hamburger Menu Button - Only element in header */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMenuOpen(true)}
            className="hover:bg-transparent no-default-hover-elevate no-default-active-elevate"
            data-testid="button-menu-toggle"
          >
            <Menu className="h-8 w-8 text-primary" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
