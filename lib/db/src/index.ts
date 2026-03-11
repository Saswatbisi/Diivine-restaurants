// Database connection placeholder
// In production, this would connect to PostgreSQL via drizzle-orm
// For now, we export a mock db object for type-checking purposes

import { drizzle } from 'drizzle-orm/node-postgres';

const databaseUrl = process.env.DATABASE_URL;

export const db = drizzle(databaseUrl || 'postgresql://localhost:5432/diivine');

export * from './schema';
