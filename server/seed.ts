import { db } from "./db";
import { properties, activities } from "@shared/schema";
import { activityCatalog } from "@shared/activityCatalog";

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

  // Activities come from the shared catalog (also synced to production on deploy)
  const sampleActivities = activityCatalog.map((activity) => ({ ...activity, rating: "0.0", reviewCount: 0 }));

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