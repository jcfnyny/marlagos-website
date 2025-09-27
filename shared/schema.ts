import { sql } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  varchar, 
  integer, 
  decimal, 
  boolean, 
  timestamp, 
  serial 
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Properties table
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // Duplex, Studio, etc.
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("€"),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").default(0),
  guests: integer("guests").notNull(),
  amenities: text("amenities").array().notNull(),
  images: text("images").array().notNull(),
  location: text("location").notNull(),
  featured: boolean("featured").default(false),
  coordinates: text("coordinates"), // lat,lng format
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Activities table
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // Water Sports, Cultural, Adventure, etc.
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("€"),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").default(0),
  maxParticipants: integer("max_participants").notNull(),
  image: text("image").notNull(),
  location: text("location").notNull(),
  difficulty: text("difficulty"), // Easy, Moderate, Challenging
  coordinates: text("coordinates"), // lat,lng format
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Bookings table (for both properties and activities)
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'property' or 'activity'
  propertyId: integer("property_id").references(() => properties.id),
  activityId: integer("activity_id").references(() => activities.id),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestPhone: text("guest_phone"),
  checkIn: timestamp("check_in"), // For properties
  checkOut: timestamp("check_out"), // For properties
  activityDate: timestamp("activity_date"), // For activities
  participants: integer("participants").default(1),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("€"),
  status: text("status").default("pending"), // pending, confirmed, cancelled
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Contact inquiries table
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  type: text("type").default("general"), // general, booking, support
  status: text("status").default("new"), // new, responded, closed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Newsletter subscriptions table
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  status: text("status").default("active"), // active, unsubscribed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Availability table for tracking blocked dates from Airbnb calendars
export const availability = pgTable("availability", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: text("status").notNull(), // blocked, available, booked
  source: text("source").default("airbnb"), // airbnb, manual
  externalBookingId: text("external_booking_id"), // Airbnb booking ID if available
  summary: text("summary"), // Event summary from iCal
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relations
export const propertiesRelations = relations(properties, ({ many }) => ({
  bookings: many(bookings),
  availability: many(availability)
}));

export const activitiesRelations = relations(activities, ({ many }) => ({
  bookings: many(bookings)
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  property: one(properties, {
    fields: [bookings.propertyId],
    references: [properties.id]
  }),
  activity: one(activities, {
    fields: [bookings.activityId],
    references: [activities.id]
  })
}));

export const availabilityRelations = relations(availability, ({ one }) => ({
  property: one(properties, {
    fields: [availability.propertyId],
    references: [properties.id]
  })
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Insert schemas
export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
}).extend({
  checkIn: z.string().optional().transform((val) => val ? new Date(val) : undefined),
  checkOut: z.string().optional().transform((val) => val ? new Date(val) : undefined),
  activityDate: z.string().optional().transform((val) => val ? new Date(val) : undefined)
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true
});

export const insertAvailabilitySchema = createInsertSchema(availability).omit({
  id: true,
  createdAt: true,
  updatedAt: true
}).extend({
  startDate: z.string().transform((val) => new Date(val)),
  endDate: z.string().transform((val) => new Date(val))
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;

export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
