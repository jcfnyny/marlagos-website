import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PropertyCalendar from "@/components/PropertyCalendar";
import BookingModal from "@/components/BookingModal";
import { 
  Star, 
  Users, 
  MapPin, 
  Wifi, 
  Car, 
  Waves, 
  ArrowLeft, 
  ExternalLink,
  Calendar,
  Phone,
  Mail
} from "lucide-react";
import { Property } from "@shared/schema";
import { useLocation } from "wouter";

const amenityIcons: { [key: string]: any } = {
  'Wi-Fi': Wifi,
  'Garage': Car,
  'Pool': Waves,
  'Air Conditioning': Waves,
  'Kitchen': Waves,
  'Balcony': Waves,
};

export default function PropertyDetails() {
  const [, params] = useRoute("/properties/:id");
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingModal, setBookingModal] = useState(false);
  
  const propertyId = params?.id ? parseInt(params.id) : null;

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    queryFn: async () => {
      if (!propertyId) throw new Error('Property ID is required');
      const response = await fetch(`/api/properties/${propertyId}`);
      if (!response.ok) throw new Error('Property not found');
      return response.json();
    },
    enabled: !!propertyId
  });

  const handleBack = () => {
    setLocation('/properties');
  };

  const handleBookNow = () => {
    if (property) {
      setBookingModal(true);
    }
  };

  const handleContact = () => {
    // Open contact modal or navigate to contact
    setLocation('/contact');
  };

  const handleAirbnbLink = () => {
    if (propertyId) {
      window.open(`https://www.airbnb.com/rooms/${propertyId}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  {property.rating} ({property.reviewCount || 0} reviews)
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAirbnbLink}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Airbnb
              </Button>
              <Button onClick={handleBookNow}>
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  
                  {/* Image Indicators */}
                  {property.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Image Thumbnails */}
                {property.images.length > 1 && (
                  <div className="p-4 grid grid-cols-5 gap-2">
                    {property.images.slice(0, 5).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property.title} - Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>About This Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <Badge variant="outline" className="text-sm">
                    {property.type}
                  </Badge>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{property.guests} guests</span>
                  </div>
                </div>
                
                <Separator />
                
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
                
                <Separator />
                
                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => {
                      const Icon = amenityIcons[amenity] || Waves;
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking & Calendar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {property.currency || '€'}{property.price}
                    <span className="text-base font-normal text-muted-foreground"> / night</span>
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    {property.rating}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleBookNow} className="w-full" size="lg">
                  Check Availability
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  You'll be redirected to Airbnb to complete your booking
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleContact}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Host
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleAirbnbLink}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Availability Calendar - Full Width */}
        <div className="mt-8">
          <PropertyCalendar 
            propertyId={property.id}
            title={`${property.title} - Live Availability from Airbnb`}
          />
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModal && property && (
        <BookingModal
          isOpen={bookingModal}
          onClose={() => setBookingModal(false)}
          type="property"
          item={{
            id: property.id,
            title: property.title,
            price: property.price,
            location: property.location,
            guests: property.guests,
            images: property.images
          }}
        />
      )}
    </div>
  );
}