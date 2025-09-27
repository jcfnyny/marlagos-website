import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Anchor, Crown, Ship, Building2, Clock, Columns3, Plane } from "lucide-react";
import historyImage from "@assets/generated_images/Lagos_historic_town_center_d4804067.png";

// Historical era images
import carthaginianImage from "@assets/stock_images/ancient_carthaginian_029eac59.jpg";
import romanImage from "@assets/stock_images/roman_ruins_ancient__4be39f44.jpg";
import moorishImage from "@assets/stock_images/moorish_islamic_arch_2035ea70.jpg";
import discoveryImage from "@assets/stock_images/portuguese_caravel_s_d3c63bb9.jpg";
import slaveTradeImage from "@assets/stock_images/historic_portuguese__8c4e4880.jpg";
import earthquakeImage from "@assets/stock_images/portuguese_baroque_c_521e7a59.jpg";
import tourismImage from "@assets/stock_images/algarve_portugal_bea_1093f018.jpg";

export default function History() {
  const historicalPeriods = [
    {
      period: "Carthaginian Era",
      years: "6th Century BC - 146 BC",
      icon: <Building2 className="h-6 w-6" />,
      title: "Carthaginian Lacóbriga",
      description: "Founded by Carthaginian traders around the 6th century BC as Lacóbriga, meaning 'white fort' in the Celtic language. The Carthaginians established this Atlantic outpost as part of their extensive Mediterranean trade network, seeking access to precious metals, salt, and Atlantic fishing grounds. They built the first permanent harbor structures and established trade connections with Celtic tribes. The strategic location provided a crucial link between their North African territories and northern European markets, making it a vital commercial hub in their maritime empire.",
      significance: "Maritime Trade Foundation",
      image: carthaginianImage,
      imageAlt: "Ancient Carthaginian ruins and architecture"
    },
    {
      period: "Roman Period",
      years: "146 BC - 450 AD",
      icon: <Columns3 className="h-6 w-6" />,
      title: "Roman Lacóbriga",
      description: "Under Roman rule, Lacóbriga flourished as an important coastal settlement in the province of Lusitania. Romans developed the port facilities, constructed roads connecting to major Roman cities, and established garum (fish sauce) production centers. Archaeological evidence shows Roman villas, mosaics, and bath complexes. The Romans introduced viticulture and advanced fishing techniques. After the 5th century, the region transitioned through Visigothic rule before eventual Moorish conquest.",
      significance: "Infrastructure & Trade Development",
      image: romanImage,
      imageAlt: "Roman ruins with ancient columns"
    },
    {
      period: "Moorish Rule",
      years: "711 - 1249 AD",
      icon: <Crown className="h-6 w-6" />,
      title: "Islamic Influence",
      description: "Under Moorish control, Lagos became an important Atlantic port with significant cultural and architectural transformation. The Islamic period introduced distinctive building styles, urban planning concepts, and decorative arts that profoundly influenced Portuguese architecture. Elements like whitewashed buildings, geometric patterns, and courtyard designs became integral to the region's character. The Moors also advanced local agriculture, crafts, and trade networks, establishing Lagos as a key coastal settlement. Their legacy remains visible today in the old town's layout, architectural details, and cultural traditions.",
      significance: "Cultural Foundation",
      image: moorishImage,
      imageAlt: "Moorish Islamic architecture with whitewashed buildings"
    },
    {
      period: "Age of Discovery",
      years: "1415 - 1580 AD",
      icon: <Ship className="h-6 w-6" />,
      title: "Prince Henry the Navigator Era",
      description: "Prince Henry the Navigator (1394-1460) established his school of navigation in Lagos around 1420. From here, Portuguese caravels departed to explore Africa's west coast, revolutionizing maritime technology and mapping unknown seas. The first expeditions to round Cape Bojador (1434) and reach Guinea were planned in Lagos.",
      significance: "Global Exploration Hub",
      image: discoveryImage,
      imageAlt: "Portuguese caravel ship from the Age of Discovery"
    },
    {
      period: "Slave Trade Era",
      years: "1444 - 1820 AD",
      icon: <Anchor className="h-6 w-6" />,
      title: "European Slave Market",
      description: "Lagos housed the first European slave market. A dark chapter now commemorated with educational exhibits.",
      significance: "Historical Reflection",
      image: slaveTradeImage,
      imageAlt: "Historic Portuguese coastal fort"
    },
    {
      period: "Post-Earthquake Era",
      years: "1755 - 1960s",
      icon: <Clock className="h-6 w-6" />,
      title: "Reconstruction & Recovery",
      description: "After the devastating 1755 earthquake destroyed much of Lagos, the city underwent extensive reconstruction. New buildings were constructed with improved earthquake-resistant techniques, and the harbor was rebuilt. During this period, Lagos remained primarily a fishing and agricultural community, preserving its traditional Portuguese character while slowly recovering its economic importance.",
      significance: "Architectural Renewal",
      image: earthquakeImage,
      imageAlt: "Portuguese baroque church architecture"
    },
    {
      period: "Tourism Era", 
      years: "1960s - Present",
      icon: <Plane className="h-6 w-6" />,
      title: "Algarve Tourism Boom",
      description: "The late 1960s marked a transformational period when the Portuguese government began promoting the Algarve as an international tourist destination. Lagos became one of the region's premier resorts, attracting visitors with its stunning beaches, historic charm, and year-round climate. Infrastructure development included hotels, restaurants, golf courses, and improved transportation links. Today, Lagos successfully balances its rich historical heritage with modern tourism, becoming one of Europe's most sought-after coastal destinations.",
      significance: "Economic Transformation",
      image: tourismImage,
      imageAlt: "Algarve Portugal beaches and coastal tourism"
    }
  ];

  const historicalSites = [
    {
      name: "Roman Archaeological Remains",
      period: "Roman Era (146 BC - 450 AD)",
      type: "Archaeological Site",
      description: "Scattered throughout Lagos are remnants of Roman Lacóbriga including villa foundations, mosaic fragments, and ancient port structures. Key discoveries near Batata Beach and town center provide insight into daily Roman life during the peak of Roman occupation.",
      significance: "Evidence of Lagos' Roman heritage"
    },
    {
      name: "Forte da Ponta da Bandeira",
      period: "17th Century",
      type: "Military Architecture",
      description: "Built in 1640s to defend Lagos harbor from pirate attacks. Now houses maritime museum with artifacts from the Age of Discovery.",
      significance: "Best preserved fortress in Lagos"
    },
    {
      name: "Igreja de Santo António",
      period: "18th Century", 
      type: "Religious Architecture",
      description: "Baroque church rebuilt after 1755 earthquake. Famous for elaborate gilded wood carvings and azulejo tile work.",
      significance: "Finest example of baroque art in Lagos"
    },
    {
      name: "Mercado de Escravos",
      period: "15th Century",
      type: "Historical Memorial",
      description: "Site of Europe's first slave market (1444). Now serves as a museum and memorial to educate about this historical period.",
      significance: "Important historical education site"
    },
    {
      name: "City Walls",
      period: "16th Century",
      type: "Defensive Structure", 
      description: "Remnants of fortifications that once protected the city. Sections still visible throughout the old town area.",
      significance: "Archaeological heritage preservation"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title="History of Lagos"
        subtitle="Discover 2,000 years of maritime heritage and cultural legacy"
        height="medium"
        showCTA={false}
        backgroundImage={historyImage}
      />

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Historical Timeline</h2>
            <p className="text-xl text-muted-foreground font-body">
              Journey through the ages and discover how Lagos became one of Portugal's most significant historical ports.
            </p>
          </div>

          <div className="space-y-16">
            {historicalPeriods.map((period, index) => (
              <div key={period.period} className="relative">
                <Card className="hover-elevate">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Text Content - Always on Left */}
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                            {period.icon}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" data-testid={`badge-period-${index}`}>
                              {period.years}
                            </Badge>
                            <Badge variant="outline">{period.significance}</Badge>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4" data-testid={`text-title-${index}`}>
                          {period.title}
                        </h3>
                        
                        <p className="text-muted-foreground font-body leading-relaxed">
                          {period.description}
                        </p>
                      </div>
                      
                      {/* Image - Always on Right */}
                      <div className="relative overflow-hidden lg:h-auto h-64">
                        <img 
                          src={period.image} 
                          alt={period.imageAlt}
                          className="w-full h-full object-cover"
                          data-testid={`img-era-${index}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prince Henry the Navigator Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Prince Henry the Navigator</h2>
            <p className="text-xl mb-8 opacity-90 font-body">
              The visionary prince who revolutionized exploration and made Lagos the launching point for the Age of Discovery
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">The Navigator's Legacy</h3>
              <div className="space-y-4 font-body opacity-90">
                <p>
                  Prince Henry (Infante Dom Henrique, 1394-1460) established his school of navigation in Lagos around 1420, 
                  transforming this coastal town into Europe's most important center for maritime exploration and innovation.
                </p>
                <p>
                  Under his patronage, Lagos became the birthplace of revolutionary maritime technologies including improved 
                  caravel designs, advanced navigation instruments, and detailed cartographic methods that would enable 
                  Portuguese explorers to navigate previously unknown waters.
                </p>
                <p>
                  From Lagos harbor, expeditions departed that would reshape world history: Gil Eanes' breakthrough past 
                  Cape Bojador (1434), the discovery of the Azores, and the systematic exploration of Africa's Atlantic coast.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-primary-foreground text-foreground">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <Ship className="h-5 w-5 mr-2 text-primary" />
                    Major Expeditions from Lagos
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cape Bojador passage</span>
                      <Badge variant="outline">1434</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Cape Blanc reached</span>
                      <Badge variant="outline">1441</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>First African slaves arrive</span>
                      <Badge variant="outline">1444</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Cape Verde discovered</span>
                      <Badge variant="outline">1444</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary-foreground text-foreground">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <Crown className="h-5 w-5 mr-2 text-primary" />
                    Innovations in Lagos
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Caravel Design:</strong> Perfected the light, fast sailing ships ideal for exploration</p>
                    <p><strong>Navigation School:</strong> Trained captains in astronomy, cartography, and seamanship</p>
                    <p><strong>Map Making:</strong> Created increasingly accurate charts of African coastline</p>
                    <p><strong>Trade Routes:</strong> Established profitable gold and slave trading networks</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Sites Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Historical Sites to Visit</h2>
            <p className="text-xl text-muted-foreground font-body">
              Explore Lagos' most significant historical landmarks and learn about their cultural importance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {historicalSites.map((site, index) => (
              <Card key={site.name} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1" data-testid={`text-site-${index}`}>
                        {site.name}
                      </h3>
                      <div className="flex gap-2">
                        <Badge variant="outline">{site.period}</Badge>
                        <Badge variant="secondary">{site.type}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 font-body">
                    {site.description}
                  </p>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {site.significance}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Open Daily
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Legacy Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cultural Legacy</h2>
            <p className="text-xl text-muted-foreground font-body">
              How Lagos' rich history continues to influence the city today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Ship className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Maritime Heritage</h3>
              <p className="text-muted-foreground font-body text-sm">
                Traditional fishing methods and boat building crafts preserved by local artisans.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Architecture</h3>
              <p className="text-muted-foreground font-body text-sm">
                Moorish, Roman, and Portuguese influences visible in traditional buildings throughout the city.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cultural Traditions</h3>
              <p className="text-muted-foreground font-body text-sm">
                Festivals, cuisine, and local customs that have been passed down through generations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Anchor className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Historical Education</h3>
              <p className="text-muted-foreground font-body text-sm">
                Museums and cultural sites that preserve and share Lagos' complex history with visitors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Experience History Firsthand</h2>
          <p className="text-xl mb-8 opacity-90 font-body">
            Join our guided historical tours and walk in the footsteps of explorers, traders, and the generations who shaped Lagos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="secondary" className="bg-primary-foreground text-primary px-4 py-2">
              Historical Walking Tours Available
            </Badge>
            <Badge variant="secondary" className="bg-primary-foreground text-primary px-4 py-2">
              Museum Tickets Included
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}