import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Navigation, Phone, Clock, Utensils, Waves, Building } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface MapLocation {
  id: string;
  name: string;
  category: 'attraction' | 'restaurant' | 'beach';
  position: { lat: number; lng: number };
  rating?: number;
  description: string;
  phone?: string;
  estimatedTime?: string;
  priceRange?: string;
  walkTime?: string;
}

interface InteractiveMapProps {
  attractions: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    rating: number;
    coordinates: string;
    estimatedTime: string;
  }>;
  restaurants: Array<{
    id: string;
    name: string;
    cuisine: string;
    description?: string;
    rating: number;
    phone: string;
    priceRange: string;
  }>;
  beaches: Array<{
    id: string;
    name: string;
    type: string;
    description: string;
    rating: number;
    walkTime: string;
  }>;
}

export default function InteractiveMap({ attractions, restaurants, beaches }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  
  // Lagos coordinates - center of the map
  const lagosCenter: LatLngExpression = [37.1028, -8.6742];

  // Fix for default markers in production
  useEffect(() => {
    // Fix Leaflet's default icon path issues
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);
  
  // Convert data to map locations with proper coordinates
  const mapLocations: MapLocation[] = [
    // Attractions
    ...attractions.map(attraction => {
      const [latStr, lngStr] = attraction.coordinates.split(', ');
      return {
        id: `attraction-${attraction.id}`,
        name: attraction.name,
        category: 'attraction' as const,
        position: { lat: parseFloat(latStr), lng: parseFloat(lngStr) },
        rating: attraction.rating,
        description: attraction.description,
        estimatedTime: attraction.estimatedTime,
      };
    }),
    // Restaurants (using approximate Lagos coordinates for demo)
    ...restaurants.map((restaurant, index) => ({
      id: `restaurant-${restaurant.id}`,
      name: restaurant.name,
      category: 'restaurant' as const,
      position: { 
        lat: 37.1028 + (index * 0.002) - 0.004, 
        lng: -8.6742 + (index * 0.003) - 0.006 
      },
      rating: restaurant.rating,
      description: `${restaurant.cuisine} cuisine - ${restaurant.priceRange}`,
      phone: restaurant.phone,
      priceRange: restaurant.priceRange,
    })),
    // Beaches (using approximate coastal coordinates) - keep all beaches with unique IDs
    ...beaches.map((beach, index) => ({
      id: `beach-${beach.id}`,
      name: beach.name,
      category: 'beach' as const,
      position: { 
        lat: 37.1028 - 0.003 + (index * 0.002), 
        lng: -8.6742 - 0.005 + (index * 0.003) 
      },
      rating: beach.rating,
      description: beach.description,
      walkTime: beach.walkTime,
    })),
  ];

  // Create custom icons for different categories
  const createIcon = (category: string) => {
    const color = getCategoryColor(category);
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="12" y="16" text-anchor="middle" fill="white" font-size="8" font-weight="bold">
        ${category === 'attraction' ? 'A' : category === 'restaurant' ? 'R' : 'B'}
      </text>
    </svg>`;
    
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  const handleDirections = (location: MapLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.position.lat},${location.position.lng}`;
    window.open(url, '_blank');
  };

  const handlePhoneCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'attraction':
        return <Building className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'beach':
        return <Waves className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'attraction':
        return '#1E40AF'; // Blue
      case 'restaurant':
        return '#DC2626'; // Red  
      case 'beach':
        return '#059669'; // Green
      default:
        return '#6B7280'; // Gray
    }
  };

  return (
    <div className="space-y-4" data-testid="interactive-map">
      {/* Interactive Leaflet Map */}
      <div className="h-96 w-full rounded-lg overflow-hidden border">
        <MapContainer
          center={lagosCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="leaflet-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {mapLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.position.lat, location.position.lng]}
              icon={createIcon(location.category)}
              eventHandlers={{
                click: () => setSelectedLocation(location),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-60">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {location.category}
                    </Badge>
                    {location.rating && (
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs font-medium">{location.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-semibold mb-2">{location.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {location.description}
                  </p>

                  <div className="flex gap-1 mb-3 flex-wrap">
                    {location.estimatedTime && (
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {location.estimatedTime}
                      </Badge>
                    )}
                    {location.walkTime && (
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {location.walkTime}
                      </Badge>
                    )}
                    {location.priceRange && (
                      <Badge variant="secondary" className="text-xs">
                        {location.priceRange}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="text-xs px-3 py-1 h-auto"
                      onClick={() => handleDirections(location)}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Directions
                    </Button>
                    {location.phone && (
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="text-xs px-3 py-1 h-auto"
                        onClick={() => handlePhoneCall(location.phone!)}
                        data-testid={`button-call-${location.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <Card className="border-primary">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: getCategoryColor(selectedLocation.category) }}
              ></div>
              <Badge variant="outline" className="text-xs">
                {selectedLocation.category}
              </Badge>
              {selectedLocation.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{selectedLocation.rating}</span>
                </div>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedLocation(null)}
                className="ml-auto h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{selectedLocation.name}</h3>
            <p className="text-muted-foreground mb-4">
              {selectedLocation.description}
            </p>

            <div className="flex gap-2 mb-4 flex-wrap">
              {selectedLocation.estimatedTime && (
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {selectedLocation.estimatedTime}
                </Badge>
              )}
              {selectedLocation.walkTime && (
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {selectedLocation.walkTime}
                </Badge>
              )}
              {selectedLocation.priceRange && (
                <Badge variant="secondary">
                  {selectedLocation.priceRange}
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => handleDirections(selectedLocation)}
                data-testid={`button-directions-${selectedLocation.id}`}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
              {selectedLocation.phone && (
                <Button 
                  variant="outline"
                  onClick={() => handlePhoneCall(selectedLocation.phone!)}
                  data-testid={`button-call-${selectedLocation.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}