import PropertyCard from "@/components/PropertyCard";
import PropertyCalendar from "@/components/PropertyCalendar";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";

export default function Properties() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price-low");
  const [, setLocation] = useLocation();

  // Fetch all properties from the database
  const { data: allProperties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const response = await fetch("/api/properties");
      return response.json();
    }
  });

  // Filter and sort properties
  const properties = useMemo(() => {
    let filtered = [...allProperties];
    
    // Apply filters
    if (selectedFilter !== "all") {
      if (selectedFilter === "pool") {
        filtered = filtered.filter(p => p.amenities.some(amenity => 
          amenity.toLowerCase().includes('pool')
        ));
      } else if (selectedFilter === "garage") {
        filtered = filtered.filter(p => p.amenities.some(amenity => 
          amenity.toLowerCase().includes('garage') || amenity.toLowerCase().includes('parking')
        ));
      } else if (selectedFilter === "2+ guests") {
        filtered = filtered.filter(p => p.guests >= 2);
      } else if (selectedFilter === "ocean view") {
        filtered = filtered.filter(p => 
          p.description.toLowerCase().includes('view') ||
          p.description.toLowerCase().includes('ocean') ||
          p.description.toLowerCase().includes('sea')
        );
      }
    }

    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortBy === "guests") {
      filtered.sort((a, b) => b.guests - a.guests);
    }

    return filtered;
  }, [allProperties, selectedFilter, sortBy]);

  const handleFilterChange = (value: string) => {
    setSortBy(value);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title="Our Premium Properties"
        subtitle="Discover luxury accommodations in the heart of Lagos"
        height="medium"
        showCTA={false}
      />

      {/* Properties Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Available Properties</h1>
                <p className="text-muted-foreground" data-testid="text-property-count">
                  You're viewing all {properties.length} available properties in Lagos
                </p>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Sort by:</span>
                </div>
                <Select onValueChange={handleFilterChange} data-testid="select-sort">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Price (Low to High)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="guests">Most Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge 
                variant={selectedFilter === "all" ? "default" : "outline"} 
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => handleFilterSelect("all")}
                data-testid="badge-filter-all"
              >
                All Properties
              </Badge>
              <Badge 
                variant={selectedFilter === "2+ guests" ? "default" : "outline"} 
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleFilterSelect("2+ guests")}
                data-testid="badge-filter-guests"
              >
                <Users className="h-3 w-3 mr-1" />
                2+ Guests
              </Badge>
              <Badge 
                variant={selectedFilter === "pool" ? "default" : "outline"} 
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleFilterSelect("pool")}
                data-testid="badge-filter-pool"
              >
                Pool
              </Badge>
              <Badge 
                variant={selectedFilter === "garage" ? "default" : "outline"} 
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleFilterSelect("garage")}
                data-testid="badge-filter-garage"
              >
                Garage
              </Badge>
              <Badge 
                variant={selectedFilter === "ocean view" ? "default" : "outline"} 
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleFilterSelect("ocean view")}
                data-testid="badge-filter-ocean"
              >
                Ocean View
              </Badge>
            </div>
          </div>

          {/* Properties with Calendars */}
          <div className="space-y-12">
            {isLoading ? (
              // Loading skeletons
              Array(2).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="bg-muted h-64 rounded-lg"></div>
                      <div className="space-y-2">
                        <div className="bg-muted h-4 rounded w-3/4"></div>
                        <div className="bg-muted h-4 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="bg-muted h-96 rounded-lg"></div>
                  </div>
                </div>
              ))
            ) : (
              properties.map((property) => (
                <div key={property.id} className="border-b pb-12 last:border-b-0" data-testid={`property-section-${property.id}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Property Card */}
                    <div>
                      <PropertyCard 
                        {...property} 
                        id={property.id.toString()} 
                        price={Number(property.price)}
                        rating={Number(property.rating)}
                        reviewCount={property.reviewCount || 0}
                        currency={property.currency || "€"}
                      />
                    </div>
                    
                    {/* Property Calendar */}
                    <div>
                      <PropertyCalendar 
                        propertyId={property.id}
                        title={`${property.title} - Availability`}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Show all properties message since we only have 2 */}
          {properties.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-muted-foreground text-lg font-body">
                You're viewing all {properties.length} available properties in Lagos
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                More properties coming soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 font-body">
            Our local experts are here to help you find the perfect property for your Lagos vacation.
          </p>
          <Button 
            size="lg"
            onClick={() => {
              // Navigate to guide page for help using SPA routing
              setLocation('/guide');
            }}
            data-testid="button-contact-help"
          >
            Get Personalized Recommendations
          </Button>
        </div>
      </section>
    </>
  );
}