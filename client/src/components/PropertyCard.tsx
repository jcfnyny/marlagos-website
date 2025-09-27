import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Wifi, Car, Waves, MapPin } from "lucide-react";
import { useLocation } from "wouter";

interface PropertyCardProps {
  id: string;
  title: string;
  type: string;
  description: string;
  price: number;
  currency?: string;
  rating: number;
  reviewCount: number;
  guests: number;
  amenities: string[];
  images: string[];
  location: string;
  featured?: boolean;
  onBookNow?: () => void;
}

const amenityIcons: { [key: string]: any } = {
  'Wi-Fi': Wifi,
  'Garage': Car,
  'Pool': Waves,
  'Air Conditioning': Waves,
  'Kitchen': Waves,
  'Balcony': Waves,
};

export default function PropertyCard({
  id,
  title,
  type,
  description,
  price,
  currency = "€",
  rating,
  reviewCount,
  guests,
  amenities,
  images,
  location,
  featured = false,
  onBookNow
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [, setLocation] = useLocation();

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      // Open Airbnb listing in new tab for real booking
      window.open(`https://www.airbnb.com/rooms/${id}`, '_blank');
    }
  };

  const handleViewDetails = () => {
    // Navigate to guide page for detailed property information
    setLocation('/guide');
  };

  return (
    <Card className={`overflow-hidden hover-elevate transition-all duration-300 ${
      featured ? 'ring-2 ring-primary' : ''
    }`}>
      {featured && (
        <div className="bg-primary text-white px-3 py-1 text-sm font-medium">
          Featured Property
        </div>
      )}
      
      {/* Image Gallery */}
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="w-full h-48 sm:h-56 object-cover"
          data-testid={`img-property-${id}`}
        />
        
        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                data-testid={`button-image-${id}-${index}`}
              />
            ))}
          </div>
        )}

        {/* Property Type Badge */}
        <Badge 
          className="absolute top-3 left-3 bg-background/90 text-foreground"
          data-testid={`badge-type-${id}`}
        >
          {type}
        </Badge>
      </div>

      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold mb-1" data-testid={`text-title-${id}`}>
              {title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span data-testid={`text-location-${id}`}>{location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center mb-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium" data-testid={`text-rating-${id}`}>
                {rating}
              </span>
            </div>
            <p className="text-sm text-muted-foreground" data-testid={`text-reviews-${id}`}>
              {reviewCount} reviews
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 font-body" data-testid={`text-description-${id}`}>
          {description}
        </p>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {guests} guests
            </Badge>
            {amenities.slice(0, 3).map((amenity) => {
              const Icon = amenityIcons[amenity] || Waves;
              return (
                <Badge 
                  key={amenity} 
                  variant="outline" 
                  className="text-xs"
                  data-testid={`badge-amenity-${id}-${amenity.toLowerCase()}`}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {amenity}
                </Badge>
              );
            })}
            {amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing and Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold" data-testid={`text-price-${id}`}>
              {currency}{price}
            </span>
            <span className="text-muted-foreground"> / night</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleViewDetails}
              data-testid={`button-details-${id}`}
            >
              Details
            </Button>
            <Button 
              size="sm"
              onClick={handleBookNow}
              data-testid={`button-book-${id}`}
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}