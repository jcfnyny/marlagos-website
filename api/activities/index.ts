import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../lib/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
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
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in activities API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}