import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import lagosHero from "@assets/generated_images/Lagos_Portugal_coastal_hero_view_35b5bef9.png";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  showCTA?: boolean;
  height?: "full" | "medium";
  backgroundImage?: string;
}

export default function HeroSection({ 
  title, 
  subtitle, 
  showCTA = true, 
  height = "full",
  backgroundImage = lagosHero
}: HeroSectionProps) {
  const heightClass = height === "full" ? "h-screen" : "h-[60vh]";

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const [, setLocation] = useLocation();

  const handleExploreClick = () => {
    setLocation('/properties');
  };

  const handleBookClick = () => {
    setLocation('/properties');
  };

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl mb-8 opacity-90 font-body drop-shadow-md">
          {subtitle}
        </p>
        
        {showCTA && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
              data-testid="button-hero-explore"
              onClick={handleExploreClick}
            >
              Explore Properties
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-3 text-lg"
              data-testid="button-hero-book"
              onClick={handleBookClick}
            >
              Book Your Stay
            </Button>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      {height === "full" && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:bg-white/20 animate-bounce"
          onClick={handleScrollDown}
          data-testid="button-scroll-down"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      )}
    </section>
  );
}