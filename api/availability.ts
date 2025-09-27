import type { VercelRequest, VercelResponse } from '@vercel/node';
import { icalService } from '../server/icalService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const { propertyId, startDate, endDate } = req.query;
      
      if (!propertyId) {
        return res.status(400).json({ error: 'Property ID is required' });
      }
      
      const id = parseInt(propertyId as string);
      
      // Parse dates
      const start = startDate ? new Date(startDate as string) : new Date();
      const end = endDate ? new Date(endDate as string) : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days from now
      
      // Get availability from iCal service
      const availability = await icalService.getPropertyAvailability(id, start, end);
      
      res.json(availability);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching property availability:', error);
    res.status(500).json({ error: 'Failed to fetch property availability' });
  }
}