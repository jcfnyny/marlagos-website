import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-6">
            <Compass className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 font-body">
            Oops! The page you're looking for seems to have drifted away like a boat in Lagos harbor. 
            Let's get you back to exploring Portugal's beautiful coast.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" data-testid="link-home">
            <Button className="w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground font-body mb-3">
            If you're looking for something specific, try these popular sections:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/properties" data-testid="link-properties">
              <Button variant="ghost" size="sm">Properties</Button>
            </Link>
            <Link href="/activities" data-testid="link-activities">
              <Button variant="ghost" size="sm">Activities</Button>
            </Link>
            <Link href="/guide" data-testid="link-guide">
              <Button variant="ghost" size="sm">Local Guide</Button>
            </Link>
            <Link href="/history" data-testid="link-history">
              <Button variant="ghost" size="sm">History</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
