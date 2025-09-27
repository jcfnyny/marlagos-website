import ActivityCard from '../ActivityCard';
import kayakingImage from '@assets/generated_images/Sea_kayaking_Lagos_Portugal_f0637eb8.png';

export default function ActivityCardExample() {
  // todo: remove mock functionality
  const mockActivity = {
    id: 'sea-kayaking',
    title: 'Sea Kayaking Adventure',
    category: 'Water Sports',
    description: 'Explore the stunning coastline and hidden sea caves of Ponta da Piedade. Perfect for adventure seekers looking to discover Lagos from the water.',
    duration: '3 hours',
    price: 45,
    rating: 4.8,
    reviewCount: 89,
    maxParticipants: 12,
    image: kayakingImage,
    location: 'Ponta da Piedade',
    difficulty: 'Moderate' as const
  };

  return (
    <div className="max-w-sm">
      <ActivityCard {...mockActivity} />
    </div>
  );
}