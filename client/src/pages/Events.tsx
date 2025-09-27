import { useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Music, 
  Utensils, 
  Star,
  Users,
  Anchor,
  Waves,
  Heart,
  Sunrise
} from "lucide-react";

// Import the hero image (using existing one for now)
import eventsHeroImage from "@assets/generated_images/Lagos_historic_town_center_d4804067.png";

interface Event {
  id: string;
  name: string;
  date: string;
  type: 'festival' | 'holiday' | 'cultural' | 'religious' | 'sports' | 'seasonal';
  description: string;
  location: string;
  duration?: string;
  price?: string;
  highlight?: boolean;
}

export default function Events() {
  // Get current date and calculate the 7-month period (current + next 6)
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [, setLocation] = useLocation();

  // Generate event data for Lagos, Portugal
  const generateEventsForMonth = (month: number, year: number): Event[] => {
    const events: Event[] = [];
    
    // January Events
    if (month === 0) {
      events.push(
        {
          id: 'new-year',
          name: 'New Year Celebration',
          date: 'January 1',
          type: 'holiday',
          description: 'Welcome the new year with spectacular fireworks over Lagos Marina and special celebrations throughout the historic center.',
          location: 'Lagos Marina & Historic Center',
          highlight: true
        },
        {
          id: 'kings-day',
          name: 'Dia de Reis (Three Kings Day)',
          date: 'January 6',
          type: 'religious',
          description: 'Traditional Portuguese holiday celebrating the Three Wise Men with special church services and traditional sweet bread.',
          location: 'Igreja de Santo António',
          duration: 'Full Day'
        }
      );
    }
    
    // February Events
    if (month === 1) {
      events.push(
        {
          id: 'carnival',
          name: 'Lagos Carnival',
          date: 'February (varies)',
          type: 'festival',
          description: 'Colorful carnival celebrations with parades, music, and traditional Portuguese festivities throughout the town center.',
          location: 'Historic Center',
          duration: '3 days',
          highlight: true
        },
        {
          id: 'almond-blossom',
          name: 'Almond Blossom Season',
          date: 'February - March',
          type: 'seasonal',
          description: 'The countryside around Lagos blooms with beautiful almond blossoms, creating stunning landscapes perfect for photography.',
          location: 'Algarve Countryside',
          duration: '4-6 weeks'
        }
      );
    }
    
    // March Events
    if (month === 2) {
      events.push(
        {
          id: 'spring-equinox',
          name: 'Spring Arrival',
          date: 'March 20',
          type: 'seasonal',
          description: 'Perfect weather begins as spring arrives, ideal for outdoor activities and exploring the coastline.',
          location: 'Throughout Lagos',
          duration: 'Season begins'
        },
        {
          id: 'easter-prep',
          name: 'Easter Preparations',
          date: 'March (varies)',
          type: 'religious',
          description: 'Traditional Easter preparations begin with special church services and local bakeries preparing Easter delicacies.',
          location: 'Various Churches',
          duration: 'Holy Week'
        }
      );
    }
    
    // April Events
    if (month === 3) {
      events.push(
        {
          id: 'easter',
          name: 'Easter Celebrations',
          date: 'April (varies)',
          type: 'religious',
          description: 'Traditional Portuguese Easter celebrations with processions, special masses, and family gatherings.',
          location: 'Historic Churches',
          duration: 'Easter Week',
          highlight: true
        },
        {
          id: 'freedom-day',
          name: 'Freedom Day',
          date: 'April 25',
          type: 'holiday',
          description: 'Portuguese national holiday commemorating the 1974 Carnation Revolution with local ceremonies and cultural events.',
          location: 'Town Square',
          duration: 'Full Day'
        },
        {
          id: 'spring-flowers',
          name: 'Spring Wildflower Season',
          date: 'April - May',
          type: 'seasonal',
          description: 'The cliffs and countryside burst with colorful wildflowers, making it perfect for hiking and nature photography.',
          location: 'Ponta da Piedade & Surroundings',
          duration: '6 weeks'
        }
      );
    }
    
    // May Events
    if (month === 4) {
      events.push(
        {
          id: 'labor-day',
          name: 'Labor Day',
          date: 'May 1',
          type: 'holiday',
          description: 'National holiday with local festivities and the beginning of peak tourism season in Lagos.',
          location: 'Throughout Lagos',
          duration: 'Full Day'
        },
        {
          id: 'portugal-day',
          name: 'Portugal Day',
          date: 'May 10',
          type: 'holiday',
          description: 'National holiday celebrating Portuguese culture with local events, traditional music, and cultural exhibitions.',
          location: 'Cultural Center',
          duration: 'Full Day',
          highlight: true
        },
        {
          id: 'beach-season',
          name: 'Beach Season Opens',
          date: 'May - October',
          type: 'seasonal',
          description: 'Perfect beach weather begins with warm temperatures and calm seas ideal for swimming and water sports.',
          location: 'All Lagos Beaches',
          duration: '6 months'
        }
      );
    }
    
    // June Events
    if (month === 5) {
      events.push(
        {
          id: 'popular-saints',
          name: 'Santos Populares',
          date: 'June 12-24',
          type: 'festival',
          description: 'Traditional Portuguese festival honoring popular saints with street parties, grilled sardines, and folk music.',
          location: 'Old Town Streets',
          duration: '2 weeks',
          highlight: true
        },
        {
          id: 'corpus-christi',
          name: 'Corpus Christi',
          date: 'June (varies)',
          type: 'religious',
          description: 'Religious procession with flower carpets decorating the streets and traditional ceremonies.',
          location: 'Historic Center',
          duration: 'Full Day'
        },
        {
          id: 'summer-solstice',
          name: 'Summer Solstice',
          date: 'June 21',
          type: 'seasonal',
          description: 'Longest day of the year celebrated with sunset viewing at Ponta da Piedade cliffs.',
          location: 'Ponta da Piedade',
          duration: 'Evening'
        }
      );
    }
    
    // July Events
    if (month === 6) {
      events.push(
        {
          id: 'festival-da-juventude',
          name: 'Festival da Juventude',
          date: 'July (varies)',
          type: 'festival',
          description: 'Annual youth festival featuring contemporary music, art exhibitions, and cultural performances.',
          location: 'Cultural Center & Marina',
          duration: '3 days',
          price: 'Free - €25',
          highlight: true
        },
        {
          id: 'summer-concerts',
          name: 'Summer Concert Series',
          date: 'July - August',
          type: 'cultural',
          description: 'Outdoor concerts featuring local and international artists in beautiful historic venues.',
          location: 'Various Venues',
          duration: '2 months',
          price: 'Free - €40'
        }
      );
    }
    
    // August Events
    if (month === 7) {
      events.push(
        {
          id: 'assumption',
          name: 'Assumption of Mary',
          date: 'August 15',
          type: 'religious',
          description: 'Important religious holiday with special masses and traditional processions through the old town.',
          location: 'Igreja de Santa Maria',
          duration: 'Full Day'
        },
        {
          id: 'medieval-fair',
          name: 'Medieval Fair',
          date: 'August (varies)',
          type: 'festival',
          description: 'Historic recreation with medieval costumes, traditional crafts, and period entertainment in the old town.',
          location: 'Historic Center',
          duration: '4 days',
          price: 'Free Entry',
          highlight: true
        },
        {
          id: 'peak-summer',
          name: 'Peak Summer Season',
          date: 'August',
          type: 'seasonal',
          description: 'Warmest month with perfect conditions for all beach activities and water sports.',
          location: 'All Beaches',
          duration: 'Full Month'
        }
      );
    }
    
    // September Events
    if (month === 8) {
      events.push(
        {
          id: 'harvest-season',
          name: 'Harvest Festival',
          date: 'September (varies)',
          type: 'festival',
          description: 'Celebration of local harvest with wine tasting, traditional foods, and folk music performances.',
          location: 'Surrounding Vineyards',
          duration: 'Weekend',
          price: '€15 - €30'
        },
        {
          id: 'autumn-equinox',
          name: 'Autumn Begins',
          date: 'September 22',
          type: 'seasonal',
          description: 'Still warm and sunny but with fewer crowds, perfect for exploring Lagos at a relaxed pace.',
          location: 'Throughout Lagos',
          duration: 'Season begins'
        }
      );
    }
    
    // October Events
    if (month === 9) {
      events.push(
        {
          id: 'republic-day',
          name: 'Republic Day',
          date: 'October 5',
          type: 'holiday',
          description: 'Portuguese national holiday commemorating the establishment of the Republic with local ceremonies.',
          location: 'Town Hall',
          duration: 'Full Day'
        },
        {
          id: 'all-saints',
          name: 'All Saints Day',
          date: 'October 31 - November 1',
          type: 'religious',
          description: 'Traditional Portuguese holiday for honoring deceased family members with cemetery visits and prayers.',
          location: 'Local Cemetery & Churches',
          duration: '2 days'
        }
      );
    }
    
    // November Events
    if (month === 10) {
      events.push(
        {
          id: 'independence-day',
          name: 'Independence Day',
          date: 'November 1',
          type: 'holiday',
          description: 'Portuguese national holiday with local celebrations and cultural events.',
          location: 'Historic Center',
          duration: 'Full Day'
        },
        {
          id: 'chestnut-festival',
          name: 'Chestnut Festival',
          date: 'November (varies)',
          type: 'festival',
          description: 'Traditional autumn festival celebrating roasted chestnuts with local vendors and seasonal treats.',
          location: 'Market Square',
          duration: 'Weekend',
          price: 'Free Entry'
        }
      );
    }
    
    // December Events
    if (month === 11) {
      events.push(
        {
          id: 'immaculate-conception',
          name: 'Immaculate Conception',
          date: 'December 8',
          type: 'religious',
          description: 'Important religious holiday with special church services and traditional celebrations.',
          location: 'All Churches',
          duration: 'Full Day'
        },
        {
          id: 'christmas-markets',
          name: 'Christmas Markets',
          date: 'December 15-24',
          type: 'festival',
          description: 'Traditional Christmas markets with local crafts, seasonal foods, and holiday decorations.',
          location: 'Historic Center',
          duration: '10 days',
          price: 'Free Entry',
          highlight: true
        },
        {
          id: 'christmas',
          name: 'Christmas Day',
          date: 'December 25',
          type: 'holiday',
          description: 'Traditional Portuguese Christmas with special midnight mass and family celebrations.',
          location: 'Throughout Lagos',
          duration: 'Full Day',
          highlight: true
        },
        {
          id: 'new-years-eve',
          name: 'New Year\'s Eve',
          date: 'December 31',
          type: 'holiday',
          description: 'End the year with fireworks over the marina and celebrations throughout the town.',
          location: 'Lagos Marina',
          duration: 'Evening',
          highlight: true
        }
      );
    }

    return events;
  };

  // Generate months and events dynamically
  const monthsWithEvents = useMemo(() => {
    const months = [];
    
    for (let i = 0; i < 7; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      const monthName = new Date(year, monthIndex, 1).toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
      
      const events = generateEventsForMonth(monthIndex, year);
      
      if (events.length > 0) {
        months.push({
          name: monthName,
          month: monthIndex,
          year: year,
          events: events
        });
      }
    }
    
    return months;
  }, [currentMonth, currentYear]);

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'festival': return <Music className="h-5 w-5" />;
      case 'holiday': return <Star className="h-5 w-5" />;
      case 'cultural': return <Users className="h-5 w-5" />;
      case 'religious': return <Heart className="h-5 w-5" />;
      case 'sports': return <Waves className="h-5 w-5" />;
      case 'seasonal': return <Sunrise className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const getEventTypeBadge = (type: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'outline' } = {
      'festival': 'default',
      'holiday': 'secondary',
      'cultural': 'outline',
      'religious': 'outline',
      'sports': 'default',
      'seasonal': 'secondary'
    };
    return variants[type] || 'outline';
  };

  return (
    <>
      <HeroSection
        title="Lagos Events & Festivals"
        subtitle="From traditional Portuguese festivals to seasonal celebrations, Lagos offers year-round cultural experiences that showcase the authentic spirit of the Algarve."
        backgroundImage={eventsHeroImage}
        height="medium"
      />

      <section id="events-content" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-events-title">
              What's Happening in Lagos
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-body" data-testid="text-events-description">
              Experience the vibrant culture of Lagos through its festivals, holidays, and seasonal celebrations. 
              From traditional Portuguese saints' festivals to modern cultural events, there's always something special happening in our historic coastal town.
            </p>
          </div>

          {/* Monthly Events */}
          <div className="space-y-12">
            {monthsWithEvents.map((month) => (
              <div key={`${month.month}-${month.year}`} className="space-y-6" data-testid={`month-section-${month.month}`}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2" data-testid={`text-month-${month.month}`}>
                    {month.name}
                  </h3>
                  <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {month.events.map((event) => (
                    <Card 
                      key={event.id} 
                      className={`hover-elevate transition-all duration-300 ${
                        event.highlight ? 'ring-2 ring-primary/20' : ''
                      }`}
                      data-testid={`card-event-${event.id}`}
                    >
                      {event.highlight && (
                        <div className="bg-primary text-white px-3 py-1 text-sm font-medium">
                          Featured Event
                        </div>
                      )}
                      
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getEventTypeIcon(event.type)}
                            <Badge 
                              variant={getEventTypeBadge(event.type)} 
                              className="text-xs"
                              data-testid={`badge-type-${event.id}`}
                            >
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <h4 className="text-lg font-semibold mb-2" data-testid={`text-name-${event.id}`}>
                          {event.name}
                        </h4>

                        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span data-testid={`text-date-${event.id}`}>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span data-testid={`text-location-${event.id}`}>{event.location}</span>
                          </div>
                          {event.duration && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span data-testid={`text-duration-${event.id}`}>{event.duration}</span>
                            </div>
                          )}
                          {event.price && (
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              <span data-testid={`text-price-${event.id}`}>{event.price}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-muted-foreground mb-4 font-body" data-testid={`text-description-${event.id}`}>
                          {event.description}
                        </p>

                        <Button 
                          variant="outline" 
                          className="w-full"
                          data-testid={`button-learn-more-${event.id}`}
                          onClick={() => {
                            // Navigate to guide page for more Lagos information
                            setLocation('/guide');
                          }}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Events Calendar Info */}
          <div className="mt-16 bg-muted/30 rounded-lg p-8">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4" data-testid="text-calendar-title">
                Plan Your Visit Around Lagos Events
              </h3>
              <p className="text-muted-foreground mb-6 font-body" data-testid="text-calendar-description">
                Lagos comes alive throughout the year with authentic Portuguese celebrations. Whether you're interested in religious traditions, 
                cultural festivals, or seasonal beauty, timing your visit with local events will give you deeper insight into Portuguese culture 
                and create unforgettable memories.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Music className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">Festivals</h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Traditional celebrations with music, food, and local culture
                  </p>
                </div>
                <div className="space-y-2">
                  <Heart className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">Religious Events</h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Sacred processions and ceremonies in historic churches
                  </p>
                </div>
                <div className="space-y-2">
                  <Sunrise className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">Seasonal Highlights</h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Natural beauty and perfect weather for outdoor activities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}