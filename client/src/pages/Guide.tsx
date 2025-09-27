import HeroSection from "@/components/HeroSection";
import InteractiveMap from "@/components/InteractiveMap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Phone, Globe, Navigation, Waves } from "lucide-react";

export default function Guide() {
  // todo: remove mock functionality
  const mockAttractions = [
    {
      id: 'ponta-da-piedade',
      name: 'Ponta da Piedade',
      category: 'Natural Wonder',
      description: 'Breathtaking limestone cliffs with golden rock formations and hidden grottos. One of the most photographed locations in the Algarve.',
      rating: 4.9,
      reviews: 2340,
      estimatedTime: '2-3 hours',
      difficulty: 'Easy',
      coordinates: '37.0833, -8.6667'
    },
    {
      id: 'praia-do-camilo',
      name: 'Praia do Camilo',
      category: 'Beach',
      description: 'Small, secluded beach accessed by wooden steps carved into the cliff. Crystal clear waters and dramatic rock formations.',
      rating: 4.8,
      reviews: 1875,
      estimatedTime: '3-4 hours',
      difficulty: 'Moderate',
      coordinates: '37.0833, -8.6667'
    },
    {
      id: 'forte-da-ponta-da-bandeira',
      name: 'Forte da Ponta da Bandeira',
      category: 'Historical Site',
      description: 'Historic 17th-century fortress guarding Lagos harbor. Maritime museum with artifacts from the Age of Discovery.',
      rating: 4.6,
      reviews: 892,
      estimatedTime: '1-2 hours',
      difficulty: 'Easy',
      coordinates: '37.1000, -8.6700'
    },
    {
      id: 'church-santo-antonio',
      name: 'Igreja de Santo António',
      category: 'Cultural Site',
      description: 'Baroque church with stunning gilded wood carvings and azulejo tiles. One of the finest examples of religious art in Lagos.',
      rating: 4.7,
      reviews: 654,
      estimatedTime: '45 minutes',
      difficulty: 'Easy',
      coordinates: '37.1025, -8.6700'
    }
  ];

  const mockRestaurants = [
    {
      id: 'adega-da-marina',
      name: 'Adega da Marina',
      cuisine: 'Portuguese',
      priceRange: '€€€',
      rating: 4.8,
      reviews: 1234,
      speciality: 'Fresh seafood & traditional dishes',
      phone: '+351 282 764 284'
    },
    {
      id: 'tasca-do-kiko',
      name: 'Tasca do Kiko',
      cuisine: 'Local Tavern',
      priceRange: '€€',
      rating: 4.9,
      reviews: 987,
      speciality: 'Authentic Portuguese tapas',
      phone: '+351 282 463 169'
    },
    {
      id: 'ocean-restaurant',
      name: 'Ocean Restaurant',
      cuisine: 'Fine Dining',
      priceRange: '€€€€',
      rating: 4.6,
      reviews: 543,
      speciality: 'Michelin-quality seafood',
      phone: '+351 282 240 100'
    },
    {
      id: 'restaurante-o-camilo',
      name: 'Restaurante O Camilo',
      cuisine: 'Seafood',
      priceRange: '€€€',
      rating: 4.7,
      reviews: 892,
      speciality: 'Clifftop dining with ocean views',
      phone: '+351 282 763 445'
    },
    {
      id: 'cafe-gil-eanes',
      name: 'Café Gil Eanes',
      cuisine: 'Café',
      priceRange: '€',
      rating: 4.5,
      reviews: 456,
      speciality: 'Traditional pastries & coffee',
      phone: '+351 282 762 906'
    },
    {
      id: 'nah-nah-bah',
      name: 'Nah Nah Bah',
      cuisine: 'International',
      priceRange: '€€',
      rating: 4.6,
      reviews: 678,
      speciality: 'Creative dishes & cocktails',
      phone: '+351 282 762 553'
    }
  ];

  const mockBeaches = [
    {
      id: 'praia-dona-ana',
      name: 'Praia Dona Ana',
      type: 'Sandy Beach',
      description: 'Golden sand beach surrounded by dramatic limestone cliffs. Perfect for swimming and sunbathing with excellent facilities.',
      rating: 4.8,
      reviews: 2100,
      facilities: ['Parking', 'Restaurant', 'Lifeguard', 'Toilets'],
      walkTime: '15 min from center'
    },
    {
      id: 'meia-praia',
      name: 'Meia Praia',
      type: 'Long Sandy Beach',
      description: '4km stretch of golden sand, perfect for long walks and water sports. Less crowded with ample space for families.',
      rating: 4.6,
      reviews: 1350,
      facilities: ['Beach Bars', 'Water Sports', 'Parking', 'Restaurants'],
      walkTime: '10 min from center'
    },
    {
      id: 'praia-do-camilo',
      name: 'Praia do Camilo',
      type: 'Secluded Cove',
      description: 'Small, picturesque beach accessed via wooden steps. Crystal clear waters surrounded by golden cliffs.',
      rating: 4.9,
      reviews: 1875,
      facilities: ['Snack Bar', 'Viewpoint'],
      walkTime: '20 min from center'
    },
    {
      id: 'praia-da-batata',
      name: 'Praia da Batata',
      type: 'Town Beach',
      description: 'Closest beach to town center with calm waters, ideal for families. Rich historical significance as former port.',
      rating: 4.4,
      reviews: 980,
      facilities: ['Cafés', 'Easy Access', 'Historic Fort'],
      walkTime: '5 min from center'
    }
  ];

  const handleDirections = (coordinates: string) => {
    const [lat, lng] = coordinates.split(', ');
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleCallRestaurant = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title="Your Lagos Local Guide"
        subtitle="Discover hidden gems, local favorites, and must-see attractions"
        height="medium"
        showCTA={false}
      />

      {/* Attractions Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Must-See Attractions</h2>
            <p className="text-xl text-muted-foreground font-body">
              Explore the natural wonders, historic sites, and cultural treasures that make Lagos special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockAttractions.map((attraction) => (
              <Card key={attraction.id} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1" data-testid={`text-attraction-${attraction.id}`}>
                        {attraction.name}
                      </h3>
                      <Badge variant="outline" className="mb-2">
                        {attraction.category}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{attraction.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 font-body">
                    {attraction.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {attraction.estimatedTime}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {attraction.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {attraction.reviews} reviews
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">View on Map</span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleDirections(attraction.coordinates)}
                      data-testid={`button-directions-${attraction.id}`}
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Local Dining</h2>
            <p className="text-xl text-muted-foreground font-body">
              Savor the flavors of Lagos at these carefully selected restaurants and local favorites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1" data-testid={`text-restaurant-${restaurant.id}`}>
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{restaurant.cuisine}</Badge>
                        <span className="text-muted-foreground">{restaurant.priceRange}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 font-body">
                    {restaurant.speciality}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-muted-foreground">
                      {restaurant.reviews} reviews
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleCallRestaurant(restaurant.phone)}
                        data-testid={`button-call-${restaurant.id}`}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(restaurant.name + ' Lagos menu')}`, '_blank')}
                        data-testid={`button-menu-${restaurant.id}`}
                      >
                        Menu
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beaches Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Best Beaches in Lagos</h2>
            <p className="text-xl text-muted-foreground font-body">
              Discover pristine beaches, from hidden coves to expansive sandy shores perfect for every taste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockBeaches.map((beach) => (
              <Card key={beach.id} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1" data-testid={`text-beach-${beach.id}`}>
                        {beach.name}
                      </h3>
                      <Badge variant="outline" className="mb-2">
                        {beach.type}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{beach.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 font-body">
                    {beach.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {beach.walkTime}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {beach.reviews} reviews
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Facilities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {beach.facilities.map((facility) => (
                        <Badge key={facility} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center text-muted-foreground">
                      <Waves className="h-4 w-4 mr-1" />
                      <span className="text-sm">Beach Details</span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(beach.name + ' Lagos Portugal')}`, '_blank')}
                      data-testid={`button-beach-details-${beach.id}`}
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interactive Lagos Map</h2>
            <p className="text-xl text-muted-foreground font-body">
              Explore all attractions, restaurants, and points of interest on our detailed map.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium">Attractions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                <span className="text-sm font-medium">Restaurants</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium">Beaches</span>
              </div>
            </div>
          </div>

          <InteractiveMap 
            attractions={mockAttractions}
            restaurants={mockRestaurants}
            beaches={mockBeaches}
          />
        </div>
      </section>

      {/* Local Tips & Practical Information */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Local Insider Tips</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-lg font-semibold mb-2">Best Times to Visit</h3>
              <p className="opacity-90 font-body mb-2">
                Early morning or late afternoon for attractions. Sunset at Ponta da Piedade is magical.
              </p>
              <p className="opacity-90 font-body text-sm">
                May-September: Peak season, warm weather<br/>
                March-May & September-November: Perfect weather, fewer crowds
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Getting Around</h3>
              <p className="opacity-90 font-body mb-2">
                Most attractions are walkable. Rent a bike for coastal paths or use local buses.
              </p>
              <p className="opacity-90 font-body text-sm">
                Bus tickets: €1.50 single journey<br/>
                Taxi to Sagres: ~€25<br/>
                Bike rentals: €15-20/day
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Local Etiquette</h3>
              <p className="opacity-90 font-body mb-2">
                Portuguese appreciate politeness. Learn basic phrases like "Obrigado" (thank you).
              </p>
              <p className="opacity-90 font-body text-sm">
                "Bom dia" (Good morning)<br/>
                "Por favor" (Please)<br/>
                "Desculpe" (Excuse me)
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Hidden Gems</h3>
              <p className="opacity-90 font-body mb-2">
                Visit Praia da Batata for fewer crowds and explore the old slave market (now a museum).
              </p>
              <p className="opacity-90 font-body text-sm">
                Municipal Market: Fresh fish & local produce<br/>
                Lagos Cultural Center: Free exhibitions
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Shopping & Markets</h3>
              <p className="opacity-90 font-body mb-2">
                Lagos Market (Saturdays): Fresh produce, crafts, and local specialties in Avenida da Descoberta.
              </p>
              <p className="opacity-90 font-body text-sm">
                Rua 25 de Abril: Main shopping street<br/>
                Handmade ceramics: Authentic souvenirs<br/>
                Local honey & regional wines
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Money & Practical</h3>
              <p className="opacity-90 font-body mb-2">
                Euro currency. Cards widely accepted. Emergency: 112. Tourist Police: 282 762 930.
              </p>
              <p className="opacity-90 font-body text-sm">
                Tipping: 10% in restaurants<br/>
                ATMs: Widely available<br/>
                Pharmacy: "Farmácia" - green cross sign
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <h3 className="text-xl font-semibold mb-6 text-center">Essential Portuguese Phrases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="opacity-90"><strong>Hello:</strong> Olá (oh-LAH)</p>
                <p className="opacity-90"><strong>Goodbye:</strong> Tchau (chow)</p>
                <p className="opacity-90"><strong>Please:</strong> Por favor (por fah-VOR)</p>
                <p className="opacity-90"><strong>Thank you:</strong> Obrigado/a (oh-bree-GAH-doh)</p>
              </div>
              <div className="space-y-2">
                <p className="opacity-90"><strong>Excuse me:</strong> Com licença (kom lee-SEN-sah)</p>
                <p className="opacity-90"><strong>Do you speak English?:</strong> Fala inglês? (FAH-lah in-GLESH)</p>
                <p className="opacity-90"><strong>How much?:</strong> Quanto custa? (KWAN-toh KOOS-tah)</p>
                <p className="opacity-90"><strong>Where is...?:</strong> Onde é...? (ON-deh eh)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}