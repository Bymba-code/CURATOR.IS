import { Button } from "@/components/ui/button";
import { Users, BookOpen, Handshake, TrendingUp, ExternalLink } from "lucide-react";

interface CommunitySectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

const features = [
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Join 1000+ editors sharing techniques, feedback, and creative inspiration daily on Discord.",
    testId: "feature-community"
  },
  {
    icon: BookOpen,
    title: "Learn & Grow",
    description: "Access exclusive workshops, editing challenges, and mentorship from industry professionals.",
    testId: "feature-learning"
  },
  {
    icon: Handshake,
    title: "Collaborate",
    description: "Connect with brands, creators, and fellow editors for real projects and opportunities.",
    testId: "feature-collaboration"
  },
  {
    icon: TrendingUp,
    title: "Showcase Your Work",
    description: "Participate in monthly challenges and competitions. Get featured, gain recognition, level up.",
    testId: "feature-showcase"
  },
];

export function CommunitySection({ sectionRef }: CommunitySectionProps) {
  return (
    <section 
      id="community" 
      className="py-20 md:py-32 px-4 relative section-fade z-10"
      ref={sectionRef}
    >
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-community-title"
          >
            Join the Movement
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-community-description">
            Whether you're crafting viral reels or cinematic masterpieces, Curators is your creative home.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-card/40 border border-border/40 rounded-md p-8 hover-elevate transition-all duration-300"
              data-testid={feature.testId}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3" data-testid={`${feature.testId}-title`}>
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed" data-testid={`${feature.testId}-description`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="default"
            data-testid="button-community-join"
          >
            <a href="https://discord.gg/QxjkvAq8NE" target="_blank" rel="noopener noreferrer">
              JOIN OUR DISCORD
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <p className="mt-6 text-sm md:text-base text-muted-foreground" data-testid="text-community-cta">
            Free to join. No gatekeeping. Just creativity.
          </p>
        </div>
      </div>
    </section>
  );
}
