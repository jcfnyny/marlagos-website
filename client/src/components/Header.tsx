import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import marlagosLogo from "@assets/generated_images/Marlagos_logo_with_wave_design_1c2fd8f5.png";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/guide", label: "Local Guide" },
    { href: "/activities", label: "Activities" },
    { href: "/events", label: "Events" },
    { href: "/guests", label: "Guests" },
    { href: "/history", label: "History" },
    { href: "/location", label: "Location" }
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-2 group">
              <img 
                src={marlagosLogo} 
                alt="Marlagos" 
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-sm hover:drop-shadow-md filter brightness-100 hover:brightness-110"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <span className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/properties" data-testid="button-book-now">
              <Button variant="default">
                Book Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <div 
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-muted'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link href="/properties">
                  <Button 
                    className="w-full"
                    data-testid="button-mobile-book"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}