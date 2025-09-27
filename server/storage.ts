import { 
  users, 
  properties,
  activities,
  bookings,
  contacts,
  newsletters,
  availability,
  type User, 
  type InsertUser,
  type Property,
  type InsertProperty,
  type Activity,
  type InsertActivity,
  type Booking,
  type InsertBooking,
  type Contact,
  type InsertContact,
  type Newsletter,
  type InsertNewsletter,
  type Availability,
  type InsertAvailability
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, ilike, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property methods
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getFeaturedProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  searchProperties(query?: string, type?: string, minPrice?: number, maxPrice?: number): Promise<Property[]>;
  
  // Activity methods
  getActivities(): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  getActivitiesByCategory(category: string): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  searchActivities(query?: string, category?: string, difficulty?: string): Promise<Activity[]>;
  
  // Booking methods
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Contact methods
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Newsletter methods
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  unsubscribeNewsletter(email: string): Promise<boolean>;
  
  // Availability methods
  getPropertyAvailability(propertyId: number, startDate: Date, endDate: Date): Promise<Availability[]>;
  isPropertyAvailable(propertyId: number, startDate: Date, endDate: Date): Promise<boolean>;
  updatePropertyAvailability(propertyId: number, availability: InsertAvailability[]): Promise<void>;
  clearPropertyAvailability(propertyId: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    return await db.select().from(properties).orderBy(desc(properties.featured), desc(properties.rating));
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.featured, true));
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db
      .insert(properties)
      .values(property)
      .returning();
    return newProperty;
  }

  async searchProperties(query?: string, type?: string, minPrice?: number, maxPrice?: number): Promise<Property[]> {
    const conditions = [];
    
    if (query) {
      conditions.push(
        or(
          ilike(properties.title, `%${query}%`),
          ilike(properties.description, `%${query}%`),
          ilike(properties.location, `%${query}%`)
        )
      );
    }
    
    if (type) {
      conditions.push(eq(properties.type, type));
    }
    
    if (minPrice !== undefined) {
      conditions.push(eq(properties.price, minPrice.toString()));
    }
    
    if (maxPrice !== undefined) {
      conditions.push(eq(properties.price, maxPrice.toString()));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(properties).where(and(...conditions)).orderBy(desc(properties.featured), desc(properties.rating));
    }
    
    return await db.select().from(properties).orderBy(desc(properties.featured), desc(properties.rating));
  }

  // Activity methods
  async getActivities(): Promise<Activity[]> {
    return await db.select().from(activities).orderBy(desc(activities.rating));
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    const [activity] = await db.select().from(activities).where(eq(activities.id, id));
    return activity || undefined;
  }

  async getActivitiesByCategory(category: string): Promise<Activity[]> {
    return await db.select().from(activities).where(eq(activities.category, category));
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [newActivity] = await db
      .insert(activities)
      .values(activity)
      .returning();
    return newActivity;
  }

  async searchActivities(query?: string, category?: string, difficulty?: string): Promise<Activity[]> {
    const conditions = [];
    
    if (query) {
      conditions.push(
        or(
          ilike(activities.title, `%${query}%`),
          ilike(activities.description, `%${query}%`),
          ilike(activities.location, `%${query}%`)
        )
      );
    }
    
    if (category) {
      conditions.push(eq(activities.category, category));
    }
    
    if (difficulty) {
      conditions.push(eq(activities.difficulty, difficulty));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(activities).where(and(...conditions)).orderBy(desc(activities.rating));
    }
    
    return await db.select().from(activities).orderBy(desc(activities.rating));
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db
      .insert(bookings)
      .values(booking)
      .returning();
    return newBooking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [updatedBooking] = await db
      .update(bookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return updatedBooking || undefined;
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db
      .insert(contacts)
      .values(contact)
      .returning();
    return newContact;
  }

  // Newsletter methods
  async subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const [newSubscription] = await db
      .insert(newsletters)
      .values(newsletter)
      .onConflictDoNothing()
      .returning();
    return newSubscription;
  }

  async unsubscribeNewsletter(email: string): Promise<boolean> {
    const result = await db
      .update(newsletters)
      .set({ status: "unsubscribed", updatedAt: new Date() })
      .where(eq(newsletters.email, email));
    return (result.rowCount ?? 0) > 0;
  }

  // Availability methods
  async getPropertyAvailability(propertyId: number, startDate: Date, endDate: Date): Promise<Availability[]> {
    return await db
      .select()
      .from(availability)
      .where(
        and(
          eq(availability.propertyId, propertyId),
          or(
            and(gte(availability.startDate, startDate), lte(availability.startDate, endDate)),
            and(gte(availability.endDate, startDate), lte(availability.endDate, endDate)),
            and(lte(availability.startDate, startDate), gte(availability.endDate, endDate))
          )
        )
      )
      .orderBy(availability.startDate);
  }

  async isPropertyAvailable(propertyId: number, startDate: Date, endDate: Date): Promise<boolean> {
    const blockedDates = await this.getPropertyAvailability(propertyId, startDate, endDate);
    return blockedDates.length === 0;
  }

  async updatePropertyAvailability(propertyId: number, availabilityData: InsertAvailability[]): Promise<void> {
    if (availabilityData.length === 0) return;
    
    await db.insert(availability).values(availabilityData).onConflictDoNothing();
  }

  async clearPropertyAvailability(propertyId: number): Promise<void> {
    await db.delete(availability).where(eq(availability.propertyId, propertyId));
  }
}

export const storage = new DatabaseStorage();
