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
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Activity ID is required' });
      }
      
      const activityId = parseInt(id as string);
      const activity = await storage.getActivity(activityId);
      
      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }
      
      res.json(activity);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in activity detail API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}