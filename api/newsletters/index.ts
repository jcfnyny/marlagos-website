import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../lib/storage.js';
import { z } from 'zod';
import { insertNewsletterSchema } from '../../shared/schema.js';

const newsletterSchema = insertNewsletterSchema.extend({
  email: z.string().trim().toLowerCase().email()
});

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
    if (req.method === 'POST') {
      const validatedData = newsletterSchema.parse(req.body);
      const newsletter = await storage.createNewsletter(validatedData);
      // Already-subscribed emails succeed too, without revealing who is on the list
      res.status(newsletter ? 201 : 200).json({ subscribed: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Please enter a valid email address' });
      return;
    }
    console.error('Error in newsletter API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}