import type { InsertActivity } from "./schema.js";

// Source of truth for the activities shown on the site. Production deploys
// sync this list into the database (scripts/sync-activities.ts), matching
// rows by title. Ratings and review counts are never set from here: existing
// rows keep theirs, new rows start at 0 and display as "New".
// To remove an activity, delete it here: the row stays in the database for
// existing bookings but is no longer listed (see listedActivityTitles).
// Images live in client/public/images/activities.
// website/provider are not stored in the database; the activities page
// reads them from this file by title.
export type CatalogActivity = Omit<InsertActivity, "rating" | "reviewCount"> & {
  website?: string;
  provider?: string;
};

export const activityCatalog: CatalogActivity[] = [
  {
    title: "Sea Kayaking Adventure",
    category: "Water Sports",
    description: "Launch from Praia da Batata and paddle with a certified guide to the arches, grottos and sea stacks of Ponta da Piedade, slipping into caves you can only reach from the water. No experience needed; single and double kayaks provided.",
    duration: "2.5 hours",
    price: "45.00",
    maxParticipants: 12,
    image: "/images/activities/sea-kayaking.jpg",
    location: "Praia da Batata, Lagos",
    difficulty: "Moderate",
    coordinates: "37.0990,-8.6697"
  },
  {
    title: "Historic Lagos Walking Tour",
    category: "Cultural",
    description: "Walk through 2,000 years of Lagos history with a local guide: the old city walls, the gilded Igreja de Santo António, the ruins of the Governor's Castle and the reputed site of Europe's first slave market, now a museum.",
    duration: "2 hours",
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
    duration: "2.5 hours",
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
    description: "Hike the wild clifftops of the Sagres peninsula on the Rota Vicentina's Fishermen's Trail, passing Cabo de São Vicente, the south-westernmost point of mainland Europe. Guided hikes start in Sagres, about 40 minutes' drive from Lagos.",
    duration: "5 hours",
    price: "35.00",
    maxParticipants: 8,
    image: "/images/activities/cliffs-sunset.jpg",
    location: "Sagres",
    difficulty: "Challenging",
    coordinates: "37.0000,-8.9333"
  },
  {
    title: "Portuguese Cooking Experience",
    category: "Food & Wine",
    description: "Tour the Lagos Municipal Market with a local chef, then learn to cook a classic Algarve seafood cataplana. Finish by sitting down to the meal you made with a glass of regional wine.",
    duration: "3.5 hours",
    price: "75.00",
    maxParticipants: 8,
    image: "/images/activities/old-town.jpg",
    location: "Lagos Market & Kitchen",
    difficulty: "Easy",
    coordinates: "37.1025,-8.6700"
  },
  {
    title: "Ponta da Piedade Grotto Boat Trip",
    category: "Water Sports",
    description: "Leave Lagos Marina for a close-up tour of the grottos, arches and sea stacks of Ponta da Piedade, using small boats that slip inside caves the bigger tour boats can't reach. The most popular way to see Lagos's famous coastline.",
    duration: "1 hour 15 min",
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
    description: "Speed offshore from Lagos Marina with a marine-biologist guide to look for the common and bottlenose dolphins that feed along the Algarve coast. Sightings are frequent, but as with all wild animals they are never guaranteed.",
    duration: "1.5 hours",
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
    description: "Sail out of Lagos Marina on a traditional Portuguese sailing boat and watch the sun go down over Ponta da Piedade, drink in hand. A relaxed way to end the day on the water.",
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
    description: "Learn to surf with certified instructors, usually on Meia Praia's long, gently shelving beach; schools pick the best beginner spot for the day's conditions. Soft-top board and wetsuit included.",
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
    description: "Paddle from Praia Dona Ana to the grottos of Ponta da Piedade, ideally on calm morning water. A short lesson on the beach first, so beginners are welcome.",
    duration: "2 hours",
    price: "35.00",
    maxParticipants: 10,
    image: "/images/activities/sea-kayaking.jpg",
    location: "Praia Dona Ana",
    difficulty: "Easy",
    coordinates: "37.0906,-8.6688"
  },
  {
    title: "Seven Hanging Valleys Trail Hike",
    category: "Adventure",
    description: "Guided hike on one of Europe's most celebrated coastal trails, about 6 km from Praia da Marinha to Vale Centeanes past sea arches, hidden beaches and the Alfanzina lighthouse. The trail is near Carvoeiro, about 40 minutes' drive from Lagos.",
    duration: "3 hours",
    price: "45.00",
    maxParticipants: 12,
    image: "/images/activities/coastline.jpg",
    location: "Praia da Marinha, Lagoa",
    difficulty: "Moderate",
    coordinates: "37.0900,-8.4120"
  },
  {
    title: "Sand City Sculpture Park",
    category: "Family",
    description: "Wander among giant sculptures carved entirely from sand at Sand City in Lagoa, where artists from around the world create new themed works each season. A hit with all ages. Open from April to mid-November, about half an hour's drive from Lagos.",
    duration: "2 hours",
    price: "15.00",
    maxParticipants: 20,
    image: "/images/activities/beach.jpg",
    location: "Sand City, Lagoa",
    difficulty: "Easy",
    coordinates: "37.1330,-8.4430"
  }
];

// Only catalog activities are listed on the site. Rows dropped from the
// catalog stay in the database (bookings may reference them) but are hidden.
export const listedActivityTitles = activityCatalog.map((activity) => activity.title);

const activityLinks = new Map(
  activityCatalog.map((activity) => [activity.title, { website: activity.website, provider: activity.provider }])
);

// Website and provider for an activity row from the database, matched by title
export function getActivityLink(title: string) {
  return activityLinks.get(title) ?? {};
}
