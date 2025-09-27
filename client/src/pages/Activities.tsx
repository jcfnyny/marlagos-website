import ActivityCard from "@/components/ActivityCard";
import BookingModal from "@/components/BookingModal";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Waves, Mountain, Camera, Calendar } from "lucide-react";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

// Import images
import kayakingImage from "@assets/generated_images/Sea_kayaking_Lagos_Portugal_f0637eb8.png";
import historyImage from "@assets/generated_images/Lagos_historic_town_center_d4804067.png";

export default function Activities() {
  // Fetch activities from API
  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/activities"],
    queryFn: async () => {
      const response = await fetch("/api/activities");
      return response.json();
    }
  });

  const categories = ['All', 'Water Sports', 'Cultural', 'Adventure', 'Creative'];
  const difficulties = ['All', 'Easy', 'Moderate', 'Challenging'];

  // State for filtering
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  // State for booking modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  // Filter and sort activities based on current filters
  const filteredAndSortedActivities = useMemo(() => {
    let filtered = activities.filter((activity: any) => {
      const categoryMatch = selectedCategory === 'All' || activity.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === 'All' || activity.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });

    // Sort the filtered results
    return filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'duration':
          return parseFloat(a.duration) - parseFloat(b.duration);
        default:
          return parseFloat(b.rating) - parseFloat(a.rating);
      }
    });
  }, [activities, selectedCategory, selectedDifficulty, sortBy]);

  const handleFilterChange = (type: string, value: string) => {
    console.log(`${type} filter changed:`, value);
    
    switch (type) {
      case 'category':
        setSelectedCategory(value);
        // When "All" is selected for category, reset other filters too
        if (value === 'All') {
          setSelectedDifficulty('All');
          setSortBy('rating');
        }
        break;
      case 'difficulty':
        setSelectedDifficulty(value);
        break;
      case 'sort':
        setSortBy(value);
        break;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Water Sports': return <Waves className="h-4 w-4" />;
      case 'Adventure': return <Mountain className="h-4 w-4" />;
      case 'Creative': return <Camera className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const handleBookActivity = (activity: any) => {
    setSelectedActivity({
      id: activity.id,
      title: activity.title,
      price: activity.price.toString(),
      location: activity.location,
      maxParticipants: activity.maxParticipants
    });
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedActivity(null);
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title="Lagos Adventures"
        subtitle="Unforgettable experiences in Portugal's coastal paradise"
        height="medium"
        showCTA={false}
      />

      {/* Activities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Available Activities</h1>
                <p className="text-muted-foreground" data-testid="text-activity-count">
                  {filteredAndSortedActivities.length} experiences available
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                
                <Select value={selectedCategory} onValueChange={(value) => handleFilterChange('category', value)} data-testid="select-category">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={(value) => handleFilterChange('difficulty', value)} data-testid="select-difficulty">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => handleFilterChange('sort', value)} data-testid="select-sort">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="duration">Shortest Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleFilterChange('category', category)}
                  data-testid={`badge-category-${category.toLowerCase().replace(' ', '-')}`}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-1">{category}</span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAndSortedActivities.map((activity: any) => (
              <ActivityCard 
                key={activity.id} 
                {...activity} 
                onBookNow={() => handleBookActivity(activity)}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => console.log('Load more activities')}
              data-testid="button-load-more"
            >
              Show More Activities
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Information */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Easy Booking Process</h2>
          <p className="text-xl text-muted-foreground mb-8 font-body">
            Book your Lagos adventure in just a few clicks. All activities include professional guides and necessary equipment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Activity</h3>
              <p className="text-muted-foreground text-sm font-body">
                Browse and select from our curated list of experiences
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Pick Date & Time</h3>
              <p className="text-muted-foreground text-sm font-body">
                Select your preferred date and check real-time availability
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground text-sm font-body">
                Complete your booking with instant confirmation
              </p>
            </div>
          </div>

          <Button 
            size="lg"
            onClick={() => console.log('Contact for custom activities')}
            data-testid="button-custom-activities"
          >
            Need a Custom Experience?
          </Button>
        </div>
      </section>

      {/* Safety Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Safety & Guidelines</h2>
            <p className="text-xl text-muted-foreground font-body">
              Your safety is our priority. All activities follow strict safety protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Professional Guides</h3>
              <p className="text-muted-foreground text-sm font-body">
                All activities led by certified local experts
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Safety Equipment</h3>
              <p className="text-muted-foreground text-sm font-body">
                Quality gear provided for all activities
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Weather Monitoring</h3>
              <p className="text-muted-foreground text-sm font-body">
                Activities adjusted based on conditions
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Insurance Covered</h3>
              <p className="text-muted-foreground text-sm font-body">
                All participants covered by activity insurance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        type="activity"
        item={selectedActivity}
      />
    </>
  );
}