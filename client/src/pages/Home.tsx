import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/HeroSection";
import PropertyCard from "@/components/PropertyCard";
import ActivityCard from "@/components/ActivityCard";
import BookingModal from "@/components/BookingModal";
import ContactModal from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star, Users } from "lucide-react";
import { Property, Activity } from "@shared/schema";

// Import images
import lagosHero from "@assets/generated_images/Lagos_Portugal_coastal_hero_view_35b5bef9.png";

export default function Home() {
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    type: "property" | "activity";
    item: any;
  }>({
    isOpen: false,
    type: "property",
    item: null
  });
  const [contactModal, setContactModal] = useState(false);

  // Fetch featured properties
  const { data: properties = [], isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const response = await fetch("/api/properties?featured=true");
      return response.json();
    }
  });

  // Fetch activities (limit to 2 for homepage)
  const { data: allActivities = [], isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
    queryFn: async () => {
      const response = await fetch("/api/activities");
      return response.json();
    }
  });

  const activities = allActivities.slice(0, 2);

  const handleExploreAll = () => {
    window.location.href = '/properties';
  };

  const handleViewAllActivities = () => {
    window.location.href = '/activities';
  };

  const handleBookProperty = (property: Property) => {
    setBookingModal({
      isOpen: true,
      type: "property",
      item: {
        id: property.id,
        title: property.title,
        price: property.price,
        location: property.location,
        guests: property.guests,
        images: property.images
      }
    });
  };

  const handleBookActivity = (activity: Activity) => {
    setBookingModal({
      isOpen: true,
      type: "activity",
      item: {
        id: activity.id,
        title: activity.title,
        price: activity.price,
        location: activity.location,
        maxParticipants: activity.maxParticipants,
        image: activity.image
      }
    });
  };

  const handleContact = () => {
    setContactModal(true);
  };

  if (propertiesLoading || activitiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title="Discover Lagos, Portugal"
        subtitle="Your Gateway to Portugal's Most Beautiful Coastal Paradise"
        backgroundImage={lagosHero}
      />

      {/* Featured Properties Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Premium Vacation Rentals
            </h2>
            <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
              Experience luxury and comfort in our carefully selected properties, 
              each offering unique amenities and stunning locations throughout Lagos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                id={property.id.toString()}
                title={property.title}
                type={property.type}
                description={property.description}
                price={parseFloat(property.price)}
                rating={parseFloat(property.rating)}
                reviewCount={property.reviewCount || 0}
                guests={property.guests}
                amenities={property.amenities}
                images={property.images}
                location={property.location}
                featured={property.featured || false}
                onBookNow={() => handleBookProperty(property)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleExploreAll}
              data-testid="button-explore-all-properties"
            >
              Explore All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Unforgettable Experiences
            </h2>
            <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
              From thrilling water sports to cultural discoveries, Lagos offers 
              endless adventures for every type of traveler.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {activities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                id={activity.id.toString()}
                title={activity.title}
                category={activity.category}
                description={activity.description}
                duration={activity.duration}
                price={parseFloat(activity.price)}
                rating={parseFloat(activity.rating)}
                reviewCount={activity.reviewCount || 0}
                maxParticipants={activity.maxParticipants}
                image={activity.image}
                location={activity.location}
                difficulty={activity.difficulty as 'Easy' | 'Moderate' | 'Challenging'}
                onBookNow={() => handleBookActivity(activity)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleViewAllActivities}
              data-testid="button-view-all-activities"
            >
              View All Activities
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Lagos Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Lagos?
            </h2>
            <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
              Discover what makes Lagos one of Portugal's most beloved destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Prime Location</h3>
                <p className="text-muted-foreground font-body">
                  Perfectly positioned on Portugal's stunning Algarve coast with 
                  easy access to beaches, cliffs, and cultural sites.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Year-Round Beauty</h3>
                <p className="text-muted-foreground font-body">
                  With over 300 days of sunshine annually, Lagos offers perfect 
                  weather for outdoor adventures in every season.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Authentic Experience</h3>
                <p className="text-muted-foreground font-body">
                  Rich maritime history, traditional cuisine, and warm Portuguese 
                  hospitality create unforgettable memories.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Experience Lagos?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-body">
            Start planning your perfect Portuguese getaway today. Our team is here 
            to help you create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={handleExploreAll}
              data-testid="button-cta-book"
            >
              Book Your Stay
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleContact}
              data-testid="button-cta-contact"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
        type={bookingModal.type}
        item={bookingModal.item}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModal}
        onClose={() => setContactModal(false)}
      />
    </>
  );
}