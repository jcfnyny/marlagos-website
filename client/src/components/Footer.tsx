import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted');
    // TODO: Handle contact form submission
  };

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} social media clicked`);
    // TODO: Open social media links
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Marlagos</h3>
            <p className="text-primary-foreground/80 mb-4 font-body">
              Your gateway to discovering the breathtaking beauty of Lagos, Portugal. 
              Premium vacation rentals and unforgettable experiences await.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => handleSocialClick('Facebook')}
                data-testid="button-social-facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => handleSocialClick('Instagram')}
                data-testid="button-social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => handleSocialClick('Twitter')}
                data-testid="button-social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link href="/properties" data-testid="link-footer-properties">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Our Properties
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/guide" data-testid="link-footer-guide">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Local Guide
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/activities" data-testid="link-footer-activities">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Activities
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/history" data-testid="link-footer-history">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Lagos History
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/location" data-testid="link-footer-location">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Location & Transport
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary-foreground/80" />
                <div>
                  <p className="text-primary-foreground/80 font-body text-sm" data-testid="text-address">
                    Lagos, Algarve<br />
                    Portugal 8600-315
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-foreground/80" />
                <span className="text-primary-foreground/80 font-body" data-testid="text-phone">
                  +351 282 123 456
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-foreground/80" />
                <span className="text-primary-foreground/80 font-body" data-testid="text-email">
                  hello@marlagos.com
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-primary-foreground/80 mb-4 text-sm font-body">
              Get travel tips, special offers, and Lagos insights.
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit"
                variant="secondary"
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                data-testid="button-newsletter-submit"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm font-body" data-testid="text-copyright">
              © 2024 Marlagos. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" data-testid="link-privacy">
                <span className="text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms" data-testid="link-terms">
                <span className="text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}