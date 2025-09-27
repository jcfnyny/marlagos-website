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
} from "../shared/schema";
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
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  
  // Availability methods
  getAvailability(resourceType: string, resourceId: number): Promise<Availability[]>;
  createAvailability(availability: InsertAvailability): Promise<Availability>;
}

class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0];
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    try {
      return await db.select().from(properties).orderBy(desc(properties.createdAt));
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  }

  async getProperty(id: number): Promise<Property | undefined> {
    try {
      const result = await db.select().from(properties).where(eq(properties.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching property:', error);
      return undefined;
    }
  }

  async getFeaturedProperties(): Promise<Property[]> {
    try {
      return await db.select().from(properties)
        .where(eq(properties.featured, true))
        .orderBy(desc(properties.createdAt));
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      return [];
    }
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const result = await db.insert(properties).values(property).returning();
    return result[0];
  }

  async searchProperties(query?: string, type?: string, minPrice?: number, maxPrice?: number): Promise<Property[]> {
    try {
      let conditions = [];

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
        conditions.push(gte(properties.price, minPrice.toString()));
      }

      if (maxPrice !== undefined) {
        conditions.push(lte(properties.price, maxPrice.toString()));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      return await db.select().from(properties)
        .where(whereClause)
        .orderBy(desc(properties.createdAt));
    } catch (error) {
      console.error('Error searching properties:', error);
      return [];
    }
  }

  // Activity methods
  async getActivities(): Promise<Activity[]> {
    try {
      return await db.select().from(activities).orderBy(desc(activities.createdAt));
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    try {
      const result = await db.select().from(activities).where(eq(activities.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching activity:', error);
      return undefined;
    }
  }

  async getActivitiesByCategory(category: string): Promise<Activity[]> {
    try {
      return await db.select().from(activities)
        .where(eq(activities.category, category))
        .orderBy(desc(activities.createdAt));
    } catch (error) {
      console.error('Error fetching activities by category:', error);
      return [];
    }
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const result = await db.insert(activities).values(activity).returning();
    return result[0];
  }

  async searchActivities(query?: string, category?: string, difficulty?: string): Promise<Activity[]> {
    try {
      let conditions = [];

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

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      return await db.select().from(activities)
        .where(whereClause)
        .orderBy(desc(activities.createdAt));
    } catch (error) {
      console.error('Error searching activities:', error);
      return [];
    }
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    try {
      return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    try {
      const result = await db.select().from(bookings).where(eq(bookings.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching booking:', error);
      return undefined;
    }
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(booking).returning();
    return result[0];
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    try {
      const result = await db.update(bookings)
        .set({ status, updatedAt: new Date() })
        .where(eq(bookings.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating booking status:', error);
      return undefined;
    }
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    try {
      return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(contact).returning();
    return result[0];
  }

  // Newsletter methods
  async createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const result = await db.insert(newsletters).values(newsletter).returning();
    return result[0];
  }

  // Availability methods
  async getAvailability(resourceType: string, resourceId: number): Promise<Availability[]> {
    try {
      return await db.select().from(availability)
        .where(
          and(
            eq(availability.resourceType, resourceType),
            eq(availability.resourceId, resourceId)
          )
        )
        .orderBy(availability.date);
    } catch (error) {
      console.error('Error fetching availability:', error);
      return [];
    }
  }

  async createAvailability(availabilityData: InsertAvailability): Promise<Availability> {
    const result = await db.insert(availability).values(availabilityData).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();