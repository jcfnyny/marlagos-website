import type { InsertActivity } from "./schema.js";

// Source of truth for the activities shown on the site. Production deploys
// sync this list into the database (scripts/sync-activities.ts), matching
// rows by title. Ratings and review counts are never set from here: existing
// rows keep theirs, new rows start at 0 and display as "New".
// Images live in client/public/images/activities.
export type CatalogActivity = Omit<InsertActivity, "rating" | "reviewCount">;

export const activityCatalog: CatalogActivity[] = [
  {
    title: "Sea Kayaking Adventure",
    category: "Water Sports",
    description: "Paddle past the arches, grottos and sea stacks of Ponta da Piedade with a certified guide, slipping into caves you can only reach from the water. No experience needed; single and double kayaks provided.",
    duration: "3 hours",
    price: "45.00",
    maxParticipants: 12,
    image: "/images/activities/sea-kayaking.jpg",
    location: "Ponta da Piedade",
    difficulty: "Moderate",
    coordinates: "37.0833,-8.6667"
  },
  {
    title: "Historic Lagos Walking Tour",
    category: "Cultural",
    description: "Walk through 2,000 years of Lagos history with a local guide: the old city walls, the gilded Igreja de Santo António, the Governor's Castle and the site of Europe's first slave market, now a museum.",
    duration: "2.5 hours",
    price: "25.00",
    maxParticipants: 15,
    image: "/images/activities/old-town-street.jpg",
    location: "Lagos Historic Center",
    difficulty: "Easy",
    coordinates: "37.1025,-8.6700"
  },
  {
    title: "Benagil Cave Boat Tour",
    category: "Water Sports",
    description: "Cruise east from Lagos Marina along the Algarve's golden cliffs to the famous Benagil sea cave, entering by boat when sea conditions allow. Landing or swimming inside the cave is not permitted, so the cave is seen from the water.",
    duration: "4 hours",
    price: "65.00",
    maxParticipants: 20,
    image: "/images/activities/coastline.jpg",
    location: "Lagos Marina",
    difficulty: "Easy",
    coordinates: "37.1028,-8.6742"
  },
  {
    title: "Cliff Top Hiking Experience",
    category: "Adventure",
    description: "Hike the wild clifftops of the Sagres peninsula along sections of the Rota Vicentina, ending at Cabo de São Vicente, the south-westernmost point of mainland Europe. Return transfer from Lagos included.",
    duration: "5 hours",
    price: "35.00",
    maxParticipants: 8,
    image: "/images/activities/cliffs-sunset.jpg",
    location: "Sagres Peninsula",
    difficulty: "Challenging",
    coordinates: "37.0000,-8.9333"
  },
  {
    title: "Sunset Photography Workshop",
    category: "Creative",
    description: "Learn to capture the Algarve's golden hour with a professional photographer, moving between the best viewpoints around Ponta da Piedade as the light changes. All camera levels welcome, phones included.",
    duration: "3 hours",
    price: "55.00",
    maxParticipants: 6,
    image: "/images/activities/beach.jpg",
    location: "Ponta da Piedade",
    difficulty: "Easy",
    coordinates: "37.0833,-8.6667"
  },
  {
    title: "Portuguese Cooking Experience",
    category: "Food & Wine",
    description: "Shop for fresh fish and produce at the Lagos municipal market, then cook classic Portuguese and Algarve dishes with a local chef. Finish with the meal you made, paired with regional wines.",
    duration: "4 hours",
    price: "75.00",
    maxParticipants: 10,
    image: "/images/activities/old-town.jpg",
    location: "Lagos Market & Kitchen",
    difficulty: "Easy",
    coordinates: "37.1025,-8.6700"
  },
  {
    title: "Ponta da Piedade Grotto Boat Trip",
    category: "Water Sports",
    description: "Tour the grottos, arches and sea stacks of Ponta da Piedade in a small local boat, slipping into caves the bigger tour boats can't reach. The most popular way to see Lagos's famous coastline.",
    duration: "1 hour",
    price: "25.00",
    maxParticipants: 8,
    image: "/images/activities/rock-arches.jpg",
    location: "Ponta da Piedade",
    difficulty: "Easy",
    coordinates: "37.0806,-8.6697"
  },
  {
    title: "Dolphin Watching Cruise",
    category: "Wildlife",
    description: "Head offshore from Lagos Marina with a marine-biologist guide to look for the common and bottlenose dolphins that feed along the Algarve coast. Sightings are frequent, but as with all wild animals they are never guaranteed.",
    duration: "2 hours",
    price: "50.00",
    maxParticipants: 12,
    image: "/images/activities/open-sea.jpg",
    location: "Lagos Marina",
    difficulty: "Easy",
    coordinates: "37.1083,-8.6750"
  },
  {
    title: "Sunset Sailing Cruise",
    category: "Water Sports",
    description: "Sail out of Lagos Marina on a classic sailing yacht and watch the sun go down over Ponta da Piedade, drink in hand. A relaxed way to end the day on the water.",
    duration: "2 hours",
    price: "45.00",
    maxParticipants: 10,
    image: "/images/activities/sailing.jpg",
    location: "Lagos Marina",
    difficulty: "Easy",
    coordinates: "37.1083,-8.6750"
  },
  {
    title: "Beginner Surf Lesson",
    category: "Water Sports",
    description: "Meia Praia's long, gently shelving beach is one of the best places in the Algarve to learn to surf. Certified instructors, soft-top board and wetsuit included.",
    duration: "2.5 hours",
    price: "40.00",
    maxParticipants: 8,
    image: "/images/activities/beach.jpg",
    location: "Meia Praia",
    difficulty: "Easy",
    coordinates: "37.1120,-8.6560"
  },
  {
    title: "Stand-Up Paddleboard Tour",
    category: "Water Sports",
    description: "Paddle from Praia do Camilo to the grottos of Ponta da Piedade on calm morning water. A short lesson on the beach first, so beginners are welcome.",
    duration: "2 hours",
    price: "35.00",
    maxParticipants: 10,
    image: "/images/activities/sea-kayaking.jpg",
    location: "Praia do Camilo",
    difficulty: "Easy",
    coordinates: "37.0880,-8.6690"
  },
  {
    title: "Seven Hanging Valleys Trail Hike",
    category: "Adventure",
    description: "Guided hike on one of Europe's most celebrated coastal trails, from Praia da Marinha to Vale Centeanes past sea arches, hidden beaches and the Alfanzina lighthouse. Return transfer from Lagos included.",
    duration: "5 hours",
    price: "45.00",
    maxParticipants: 12,
    image: "/images/activities/coastline.jpg",
    location: "Praia da Marinha, Lagoa",
    difficulty: "Moderate",
    coordinates: "37.0900,-8.4120"
  }
];
