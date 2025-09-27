import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { icalService } from "./icalService";
import { 
  insertPropertySchema, 
  insertActivitySchema, 
  insertBookingSchema, 
  insertContactSchema, 
  insertNewsletterSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const { search, type, featured } = req.query;
      
      if (featured === 'true') {
        const properties = await storage.getFeaturedProperties();
        res.json(properties);
      } else if (search || type) {
        const properties = await storage.searchProperties(
          search as string, 
          type as string
        );
        res.json(properties);
      } else {
        const properties = await storage.getProperties();
        res.json(properties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      res.json(property);
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  });


  app.post("/api/properties", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      console.error('Error creating property:', error);
      res.status(400).json({ error: 'Invalid property data' });
    }
  });

  // Activities routes
  app.get("/api/activities", async (req, res) => {
    try {
      const { search, category, difficulty } = req.query;
      
      if (search || category || difficulty) {
        const activities = await storage.searchActivities(
          search as string, 
          category as string, 
          difficulty as string
        );
        res.json(activities);
      } else {
        const activities = await storage.getActivities();
        res.json(activities);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  });

  app.get("/api/activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const activity = await storage.getActivity(id);
      
      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }
      
      res.json(activity);
    } catch (error) {
      console.error('Error fetching activity:', error);
      res.status(500).json({ error: 'Failed to fetch activity' });
    }
  });

  app.get("/api/activities/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const activities = await storage.getActivitiesByCategory(category);
      res.json(activities);
    } catch (error) {
      console.error('Error fetching activities by category:', error);
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validatedData);
      res.status(201).json(activity);
    } catch (error) {
      console.error('Error creating activity:', error);
      res.status(400).json({ error: 'Invalid activity data' });
    }
  });

  // Bookings routes
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      
      res.json(booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({ error: 'Failed to fetch booking' });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(400).json({ error: 'Invalid booking data' });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }
      
      const booking = await storage.updateBookingStatus(id, status);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      
      res.json(booking);
    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ error: 'Failed to update booking status' });
    }
  });

  // Contact routes
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(400).json({ error: 'Invalid contact data' });
    }
  });

  // Newsletter routes
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeNewsletter(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(400).json({ error: 'Invalid email or already subscribed' });
    }
  });

  app.post("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      
      const success = await storage.unsubscribeNewsletter(email);
      
      if (!success) {
        return res.status(404).json({ error: 'Email not found in subscription list' });
      }
      
      res.json({ message: 'Successfully unsubscribed' });
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      res.status(500).json({ error: 'Failed to unsubscribe' });
    }
  });

  // Availability routes
  app.get("/api/properties/:id/availability", async (req, res) => {
    try {
      const propertyId = parseInt(req.params.id);
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
      }
      
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
      
      const availability = await icalService.getPropertyAvailability(propertyId, start, end);
      res.json(availability);
    } catch (error) {
      console.error('Error fetching availability:', error);
      res.status(500).json({ error: 'Failed to fetch availability' });
    }
  });

  app.get("/api/properties/:id/check-availability", async (req, res) => {
    try {
      const propertyId = parseInt(req.params.id);
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
      }
      
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
      
      const isAvailable = await icalService.checkAvailability(propertyId, start, end);
      res.json({ available: isAvailable });
    } catch (error) {
      console.error('Error checking availability:', error);
      res.status(500).json({ error: 'Failed to check availability' });
    }
  });

  app.post("/api/availability/sync", async (req, res) => {
    try {
      const { propertyId } = req.body;
      
      if (propertyId) {
        await icalService.syncPropertyAvailability(propertyId);
        res.json({ message: `Availability synced for property ${propertyId}` });
      } else {
        await icalService.syncAllPropertiesAvailability();
        res.json({ message: 'Availability synced for all properties' });
      }
    } catch (error) {
      console.error('Error syncing availability:', error);
      res.status(500).json({ error: 'Failed to sync availability' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
