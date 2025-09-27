import { db } from "./db";
import { properties, activities } from "@shared/schema";

export async function seedDatabase() {
  // Insert sample properties - Updated with real Airbnb listing information
  const sampleProperties = [
    {
      title: "Casa de Lagos - Apartment w/ Rooftop Pool & Garage",
      type: "Duplex",
      description: "Located in Lagos historical center, and only five minutes away from the beach, this fully-equipped three bedroom duplex apartment, with rooftop pool and private garage, offers all you need for your stay in Lagos. Part of a two-apartment building finished in 2023, this apartment is complemented by a terrace coated with hand-made terracotta tiles that offers a nice sea view over Meia Praia.",
      price: "95",
      currency: "€",
      rating: "5.0",
      reviewCount: 28,
      guests: 6,
      amenities: ["Nearby Beaches", "Kitchen", "Wi-Fi", "Free parking on premises", "Private pool", "AC", "Private patio or balcony", "Crib", "High chair", "Garage"],
      images: ["https://a0.muscache.com/im/pictures/miso/Hosting-1318317326273524427/original/1d6f5ac9-2d0e-4203-b8be-9be48d87c351.jpeg"],
      location: "Lagos, Portugal",
      featured: true,
      coordinates: "37.1028,-8.6742"
    },
    {
      title: "Casa de Lagos - Cozy Studio in the city center",
      type: "Studio",
      description: "Located in Lagos historical center, and only five minutes walk to the beach, this fully-equipped studio offers all you need for your stay in Lagos. Part of a two-apartment building finished in 2023, this studio is complemented by a small interior terrace coated with hand-made terracotta tiles.",
      price: "65",
      currency: "€",
      rating: "5.0",
      reviewCount: 16,
      guests: 2,
      amenities: ["Nearby Beaches", "Kitchen", "Wi-Fi", "Free street parking", "AC", "Bathtub", "Private patio or balcony"],
      images: ["https://a0.muscache.com/im/pictures/miso/Hosting-1318153174392800650/original/ec6968d1-7a45-4589-a8c5-87f63f7712e6.jpeg"],
      location: "Lagos, Portugal",
      featured: true,
      coordinates: "37.1025,-8.6700"
    }
  ];

  // Insert sample activities
  const sampleActivities = [
    {
      title: "Sea Kayaking Adventure",
      category: "Water Sports",
      description: "Explore the stunning coastline and hidden sea caves of Ponta da Piedade. Perfect for adventure seekers looking to discover Lagos from the water.",
      duration: "3 hours",
      price: "45",
      currency: "€",
      rating: "4.8",
      reviewCount: 89,
      maxParticipants: 12,
      image: "/assets/generated_images/Sea_kayaking_Lagos_Portugal_f0637eb8.png",
      location: "Ponta da Piedade",
      difficulty: "Moderate",
      coordinates: "37.0833,-8.6667"
    },
    {
      title: "Historic Lagos Walking Tour",
      category: "Cultural",
      description: "Discover the rich history and culture of Lagos with our expert local guides. Visit ancient walls, churches, and traditional markets.",
      duration: "2.5 hours",
      price: "25",
      currency: "€",
      rating: "4.9",
      reviewCount: 156,
      maxParticipants: 15,
      image: "/assets/generated_images/Lagos_historic_town_center_d4804067.png",
      location: "Lagos Historic Center",
      difficulty: "Easy",
      coordinates: "37.1025,-8.6700"
    },
    {
      title: "Benagil Cave Boat Tour",
      category: "Water Sports",
      description: "Visit the famous Benagil Cave and other hidden grottos along the Algarve coast. Includes swimming stops and snorkeling equipment.",
      duration: "4 hours",
      price: "65",
      currency: "€",
      rating: "4.7",
      reviewCount: 203,
      maxParticipants: 20,
      image: "/assets/generated_images/Sea_kayaking_Lagos_Portugal_f0637eb8.png",
      location: "Lagos Marina",
      difficulty: "Easy",
      coordinates: "37.1028,-8.6742"
    },
    {
      title: "Cliff Top Hiking Experience",
      category: "Adventure",
      description: "Scenic hiking along dramatic coastal cliffs with breathtaking ocean views. Perfect for nature lovers and photography enthusiasts.",
      duration: "5 hours",
      price: "35",
      currency: "€",
      rating: "4.6",
      reviewCount: 124,
      maxParticipants: 8,
      image: "/assets/generated_images/Lagos_historic_town_center_d4804067.png",
      location: "Sagres Peninsula",
      difficulty: "Challenging",
      coordinates: "37.0000,-8.9333"
    },
    {
      title: "Sunset Photography Workshop",
      category: "Creative",
      description: "Learn to capture Lagos stunning landscapes during golden hour. Professional photographer guides you to the best viewpoints.",
      duration: "3 hours",
      price: "55",
      currency: "€",
      rating: "4.9",
      reviewCount: 67,
      maxParticipants: 6,
      image: "/assets/generated_images/Sea_kayaking_Lagos_Portugal_f0637eb8.png",
      location: "Ponta da Piedade",
      difficulty: "Easy",
      coordinates: "37.0833,-8.6667"
    },
    {
      title: "Portuguese Cooking Experience",
      category: "Cultural",
      description: "Learn to prepare traditional Portuguese dishes using fresh, local ingredients. Includes market visit and wine tasting.",
      duration: "4 hours",
      price: "75",
      currency: "€",
      rating: "4.8",
      reviewCount: 98,
      maxParticipants: 10,
      image: "/assets/generated_images/Lagos_historic_town_center_d4804067.png",
      location: "Lagos Market & Kitchen",
      difficulty: "Easy",
      coordinates: "37.1025,-8.6700"
    }
  ];

  try {
    // Check if data already exists
    const existingProperties = await db.select().from(properties).limit(1);
    const existingActivities = await db.select().from(activities).limit(1);

    if (existingProperties.length === 0) {
      console.log("Seeding properties...");
      await db.insert(properties).values(sampleProperties);
      console.log("Properties seeded successfully!");
    } else {
      console.log("Properties already seeded, skipping...");
    }

    if (existingActivities.length === 0) {
      console.log("Seeding activities...");
      await db.insert(activities).values(sampleActivities);
      console.log("Activities seeded successfully!");
    } else {
      console.log("Activities already seeded, skipping...");
    }

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}