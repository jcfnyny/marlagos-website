import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "../shared/schema";

neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create a connection pool with serverless-optimized settings
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 1, // Limit connections for serverless
});

export const db = drizzle({ client: pool, schema });

// Helper to ensure connections are properly closed in serverless environment
export const closeConnection = async () => {
  try {
    await pool.end();
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
};