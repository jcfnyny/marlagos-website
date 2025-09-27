import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Car, 
  Bus, 
  Train, 
  MapPin, 
  Clock, 
  Euro,
  Navigation,
  CarTaxiFront,
  Bike
} from "lucide-react";

export default function Location() {
  // todo: remove mock functionality
  const transportOptions = [
    {
      type: "Airplane",
      icon: <Plane className="h-6 w-6" />,
      title: "Faro Airport (FAO)",
      distance: "95 km from Lagos",
      duration: "1.5 hours by car",
      cost: "€15-25 by bus, €90-120 by taxi",
      description: "Closest international airport with flights from major European cities. Car rental, taxi, and bus services available.",
      frequency: "Daily flights",
      bookingTip: "Book transfers in advance for better rates"
    },
    {
      type: "Car",
      icon: <Car className="h-6 w-6" />,
      title: "Car Rental & Driving",
      distance: "From Lisbon: 300 km",
      duration: "3 hours from Lisbon",
      cost: "€25-50 per day + fuel",
      description: "Most flexible option for exploring the Algarve region. Free parking available at most accommodations.",
      frequency: "24/7 availability",
      bookingTip: "International driving license required for non-EU visitors"
    },
    {
      type: "Bus",
      icon: <Bus className="h-6 w-6" />,
      title: "Eva Bus Service",
      distance: "Regional connections",
      duration: "Multiple daily services",
      cost: "€2-15 depending on route",
      description: "Reliable public transport connecting Lagos to all major Algarve towns and cities.",
      frequency: "Every 30-60 minutes",
      bookingTip: "Buy tickets at the station or use the mobile app"
    },
    {
      type: "Train",
      icon: <Train className="h-6 w-6" />,
      title: "CP Railway",
      distance: "From Lisbon via Tunes",
      duration: "4-5 hours from Lisbon",
      cost: "€20-35 one way",
      description: "Scenic railway journey through Portuguese countryside. Change trains at Tunes junction.",
      frequency: "3-4 daily connections",
      bookingTip: "Book online for discounted advance tickets"
    }
  ];

  const localTransport = [
    {
      type: "Walking",
      icon: <MapPin className="h-5 w-5" />,
      description: "Lagos old town and main attractions are easily walkable",
      cost: "Free",
      bestFor: "City center exploration"
    },
    {
      type: "Local Bus",
      icon: <Bus className="h-5 w-5" />,
      description: "City buses connect residential areas and beaches",
      cost: "€1.50 per trip",
      bestFor: "Reaching distant beaches"
    },
    {
      type: "CarTaxiFront",
      icon: <CarTaxiFront className="h-5 w-5" />,
      description: "Available 24/7, metered rates",
      cost: "€5-15 within city",
      bestFor: "Airport transfers, night travel"
    },
    {
      type: "Bike Rental",
      icon: <Bike className="h-5 w-5" />,
      description: "Perfect for coastal paths and eco-friendly exploring",
      cost: "€10-15 per day",
      bestFor: "Scenic coastal routes"
    }
  ];

  const travelTips = [
    {
      title: "Best Travel Times",
      description: "Avoid rush hours (8-9 AM, 6-7 PM) during summer months. Early morning travel offers cooler temperatures and less traffic.",
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Money Saving Tips",
      description: "Buy transport passes for multiple days. Book accommodation transfers in advance. Consider renting bikes for short distances.",
      icon: <Euro className="h-5 w-5" />
    },
    {
      title: "Navigation Apps",
      description: "Google Maps works well in Portugal. Download offline maps for areas with poor signal. GPS coordinates helpful for remote beaches.",
      icon: <Navigation className="h-5 w-5" />
    }
  ];

  const handleBookTransport = (transportType: string) => {
    console.log(`Booking ${transportType} clicked`);
    // TODO: Open booking modal or redirect to booking partner
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title="Getting to Lagos"
        subtitle="Your complete guide to reaching Portugal's coastal gem"
        height="medium"
        showCTA={false}
      />

      {/* Transport Options Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transportation Options</h2>
            <p className="text-xl text-muted-foreground font-body">
              Choose the best way to reach Lagos based on your starting point, budget, and travel preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {transportOptions.map((option) => (
              <Card key={option.type} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/10 rounded-lg p-3 flex items-center justify-center">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1" data-testid={`text-transport-${option.type.toLowerCase()}`}>
                        {option.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {option.distance}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {option.duration}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {option.cost}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 font-body">
                    {option.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Frequency:</span> {option.frequency}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleBookTransport(option.type)}
                      data-testid={`button-book-${option.type.toLowerCase()}`}
                    >
                      Book Now
                    </Button>
                  </div>

                  <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Tip:</span> {option.bookingTip}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Transportation Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Getting Around Lagos</h2>
            <p className="text-xl text-muted-foreground font-body">
              Local transport options to help you explore the city and surrounding areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localTransport.map((transport, index) => (
              <Card key={transport.type} className="text-center hover-elevate">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    {transport.icon}
                  </div>
                  <h3 className="font-semibold mb-2" data-testid={`text-local-${index}`}>
                    {transport.type}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 font-body">
                    {transport.description}
                  </p>
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-xs">
                      {transport.cost}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {transport.bestFor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Essential Travel Tips</h2>
            <p className="text-xl text-muted-foreground font-body">
              Insider knowledge to make your journey to and around Lagos smoother.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelTips.map((tip, index) => (
              <Card key={tip.title} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 rounded-lg p-2 flex items-center justify-center">
                      {tip.icon}
                    </div>
                    <h3 className="font-semibold" data-testid={`text-tip-${index}`}>
                      {tip.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground font-body">
                    {tip.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lagos Location</h2>
            <p className="text-xl text-muted-foreground font-body">
              Strategically located on Portugal's southern coast in the heart of the Algarve.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Card className="h-96">
                <CardContent className="p-0">
                  <div className="w-full h-full bg-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground font-body">
                        Interactive map showing Lagos location, transport hubs, and routes.
                      </p>
                      <Button 
                        className="mt-4"
                        onClick={() => console.log('Load location map')}
                        data-testid="button-load-location-map"
                      >
                        View Interactive Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Geographic Position</h3>
                <p className="text-muted-foreground font-body">
                  Lagos is located at coordinates 37.1028° N, 8.6742° W on Portugal's 
                  Atlantic coast, approximately 300km south of Lisbon.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Regional Context</h3>
                <p className="text-muted-foreground font-body">
                  Situated in the western Algarve, Lagos serves as a gateway to the 
                  region's most spectacular coastline and natural attractions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Distances</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-body">Lisbon:</span>
                    <span className="text-muted-foreground">300 km (3 hours)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body">Faro Airport:</span>
                    <span className="text-muted-foreground">95 km (1.5 hours)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body">Portimão:</span>
                    <span className="text-muted-foreground">20 km (25 minutes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body">Sagres:</span>
                    <span className="text-muted-foreground">30 km (35 minutes)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Transport Help */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Need Transport Assistance?</h2>
          <p className="text-xl mb-8 opacity-90 font-body">
            Our local team can help arrange transfers, provide transport recommendations, 
            and answer any travel questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => console.log('Contact for transport help')}
              data-testid="button-transport-help"
            >
              Get Transport Help
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => console.log('Book airport transfer')}
              data-testid="button-airport-transfer"
            >
              Book Airport Transfer
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}