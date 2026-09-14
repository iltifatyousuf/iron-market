import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Provide a dummy fallback string during build time to prevent neon() from crashing
const connectionString = process.env.DATABASE_URL || 'postgres://dummy:dummy@dummy.neon.tech/dummy';
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
