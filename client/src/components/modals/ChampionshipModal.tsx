import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

interface ChampionshipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChampionshipModal({ open, onOpenChange }: ChampionshipModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="dialog-championship">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl md:text-4xl text-primary mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Short Editing Championship
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-base md:text-lg space-y-6 text-foreground/80 mt-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">What is it?</h3>
            <p className="leading-relaxed">
              A nationwide championship where Mongolia's best short-form editors compete in 3 rounds. 
              Each round features 100 reels showcasing the creative power behind viral content.
            </p>
          </div>

          <div className="w-full h-0.5 bg-destructive/20" />

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Why now?</h3>
            <p className="leading-relaxed">
              Short-form content is the most consumed media today. Editors are the creative power 
              behind viral content, yet their artistry often goes unrecognized. It's time to change that.
            </p>
          </div>

          <div className="w-full h-0.5 bg-destructive/20" />

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Mission</h3>
            <p className="leading-relaxed">
              Start a real creativity competition that doesn't care where you're from, what tools you use, 
              or how old you are. If you have a phone or computer, you can build art with your screen.
            </p>
          </div>

          <div className="w-full h-0.5 bg-destructive/20" />

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">For Sponsors</h3>
            <p className="leading-relaxed">
              Unlock the potential of Mongolian editors and create massive digital engagement around 
              storytelling and brand integration. We can upload 100 different reels about your branding 
              (product) from 100 different accounts.
            </p>
          </div>

          <div className="pt-6">
            <Button
              asChild
              size="lg"
              className="w-full text-base py-6"
              data-testid="button-championship-join"
            >
              <a href="https://discord.gg/QxjkvAq8NE" target="_blank" rel="noopener noreferrer">
                JOIN THE CHAMPIONSHIP
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
