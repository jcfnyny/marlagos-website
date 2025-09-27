import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Star } from "lucide-react";
import { useLocation } from "wouter";

interface ActivityCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  price: number;
  currency?: string;
  rating: number;
  reviewCount: number;
  maxParticipants: number;
  image: string;
  location: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  onBookNow?: () => void;
}

const difficultyColors = {
  'Easy': 'bg-success text-white',
  'Moderate': 'bg-yellow-500 text-white',
  'Challenging': 'bg-red-500 text-white'
};

export default function ActivityCard({
  id,
  title,
  category,
  description,
  duration,
  price,
  currency = "€",
  rating,
  reviewCount,
  maxParticipants,
  image,
  location,
  difficulty,
  onBookNow
}: ActivityCardProps) {
  const [, setLocation] = useLocation();

  const handleBookActivity = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      // Navigate to guide page for booking assistance
      setLocation('/guide');
    }
  };

  const handleLearnMore = () => {
    // Navigate to guide page for detailed activity information
    setLocation('/guide');
  };

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          data-testid={`img-activity-${id}`}
        />
        
        {/* Category Badge */}
        <Badge 
          className="absolute top-3 left-3 bg-primary text-white"
          data-testid={`badge-category-${id}`}
        >
          {category}
        </Badge>

        {/* Difficulty Badge */}
        {difficulty && (
          <Badge 
            className={`absolute top-3 right-3 ${difficultyColors[difficulty]}`}
            data-testid={`badge-difficulty-${id}`}
          >
            {difficulty}
          </Badge>
        )}
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

        {/* Activity Details */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Users className="h-3 w-3 mr-1" />
            Max {maxParticipants}
          </Badge>
        </div>

        {/* Pricing and Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-xl font-bold" data-testid={`text-price-${id}`}>
              {currency}{price}
            </span>
            <span className="text-muted-foreground"> / person</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLearnMore}
              data-testid={`button-learn-more-${id}`}
            >
              Learn More
            </Button>
            <Button 
              size="sm"
              onClick={handleBookActivity}
              data-testid={`button-book-activity-${id}`}
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}