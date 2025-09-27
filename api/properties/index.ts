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
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in properties API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}