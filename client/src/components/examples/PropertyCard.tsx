import PropertyCard from '../PropertyCard';
import duplexImage from '@assets/generated_images/Duplex_apartment_with_pool_Lagos_56a790d6.png';
import studioImage from '@assets/generated_images/Cozy_studio_apartment_interior_e7f5551b.png';

export default function PropertyCardExample() {
  // todo: remove mock functionality
  const mockProperty = {
    id: 'duplex-apartment',
    title: 'Luxury Duplex Apartment',
    type: 'Duplex',
    description: 'Spacious duplex apartment with private pool, garage, and stunning ocean views. Perfect for families and groups seeking comfort and luxury.',
    price: 180,
    rating: 4.9,
    reviewCount: 127,
    guests: 6,
    amenities: ['Wi-Fi', 'Pool', 'Garage', 'Air Conditioning', 'Kitchen', 'Balcony'],
    images: [duplexImage, studioImage],
    location: 'Lagos Centro',
    featured: true
  };

  return (
    <div className="max-w-sm">
      <PropertyCard {...mockProperty} />
    </div>
  );
}