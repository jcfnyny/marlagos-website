import ICAL from 'ical';
import { storage } from './storage';
import { type InsertAvailability } from '@shared/schema';

// Airbnb iCal URLs for our properties
const PROPERTY_ICAL_URLS = {
  3: 'https://www.airbnb.com/calendar/ical/1318317326273524427.ics?s=5df5b9a1fd350814648a3de02588b3f6', // Casa de Lagos - Apartment w/ Rooftop Pool & Garage
  4: 'https://www.airbnb.com/calendar/ical/1318153174392800650.ics?s=1d6b5bb6df4c6989e617b7eb3972220c'  // Casa de Lagos - Cozy Studio in the city center
};

export interface CalendarEvent {
  start: Date;
  end: Date;
  summary: string;
  uid?: string;
  status: 'blocked' | 'booked';
}

export class ICalService {
  async fetchICalData(url: string): Promise<string> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Marlagos-Calendar-Sync/1.0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch iCal data: ${response.statusText}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Error fetching iCal data:', error);
      throw error;
    }
  }

  parseICalData(icalData: string): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    
    try {
      const parsed = ICAL.parseICS(icalData);
      
      for (const k in parsed) {
        const event = parsed[k];
        
        if (event.type === 'VEVENT') {
          // Skip events without proper dates
          if (!event.start || !event.end) continue;
          
          const startDate = new Date(event.start);
          const endDate = new Date(event.end);
          
          // Determine status based on summary
          const summary = event.summary || 'Blocked';
          const status = summary.toLowerCase().includes('airbnb') || 
                        summary.toLowerCase().includes('blocked') || 
                        summary.toLowerCase().includes('reserved') ? 'blocked' : 'booked';
          
          events.push({
            start: startDate,
            end: endDate,
            summary,
            uid: event.uid,
            status
          });
        }
      }
    } catch (error) {
      console.error('Error parsing iCal data:', error);
      throw new Error('Failed to parse iCal data');
    }
    
    return events;
  }

  async syncPropertyAvailability(propertyId: number): Promise<void> {
    const icalUrl = PROPERTY_ICAL_URLS[propertyId as keyof typeof PROPERTY_ICAL_URLS];
    
    if (!icalUrl) {
      console.warn(`No iCal URL configured for property ${propertyId}`);
      return;
    }

    try {
      console.log(`Syncing availability for property ${propertyId}...`);
      
      // Fetch and parse iCal data
      const icalData = await this.fetchICalData(icalUrl);
      const events = this.parseICalData(icalData);
      
      // Clear existing availability for this property
      await storage.clearPropertyAvailability(propertyId);
      
      // Convert events to availability records
      const availabilityRecords: InsertAvailability[] = events.map(event => ({
        propertyId,
        startDate: event.start,
        endDate: event.end,
        status: event.status,
        source: 'airbnb',
        externalBookingId: event.uid,
        summary: event.summary
      }));
      
      // Insert new availability records
      if (availabilityRecords.length > 0) {
        await storage.updatePropertyAvailability(propertyId, availabilityRecords);
        console.log(`Synced ${availabilityRecords.length} availability records for property ${propertyId}`);
      } else {
        console.log(`No availability records found for property ${propertyId}`);
      }
      
    } catch (error) {
      console.error(`Error syncing availability for property ${propertyId}:`, error);
      throw error;
    }
  }

  async syncAllPropertiesAvailability(): Promise<void> {
    const propertyIds = Object.keys(PROPERTY_ICAL_URLS).map(Number);
    
    console.log('Starting availability sync for all properties...');
    
    const syncPromises = propertyIds.map(propertyId => 
      this.syncPropertyAvailability(propertyId).catch(error => {
        console.error(`Failed to sync property ${propertyId}:`, error);
        return null;
      })
    );
    
    await Promise.allSettled(syncPromises);
    console.log('Availability sync completed for all properties');
  }

  async checkAvailability(propertyId: number, startDate: Date, endDate: Date): Promise<boolean> {
    return await storage.isPropertyAvailable(propertyId, startDate, endDate);
  }

  async getPropertyAvailability(propertyId: number, startDate: Date, endDate: Date) {
    return await storage.getPropertyAvailability(propertyId, startDate, endDate);
  }
}

export const icalService = new ICalService();