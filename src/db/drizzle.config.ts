import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.SUPABASE_DB_URL ||
  'postgresql://postgres:9934886605dilD@db.sdwohzszgondniptbktd.supabase.co:5432/postgres';

const sqlHost = process.env.SQL_HOST;
const sqlDbName = process.env.SQL_DB_NAME;
const user = process.env.SQL_ADMIN_USER;
const password = process.env.SQL_ADMIN_PASSWORD;

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  schemaFilter: ['public'],
  dbCredentials:
    sqlHost && sqlDbName && user && password
      ? {
          host: sqlHost,
          user: user,
          password: password,
          database: sqlDbName,
          ssl: sqlHost.includes('supabase.co') ? { rejectUnauthorized: false } : false,
        }
      : {
          url: databaseUrl,
          ssl: { rejectUnauthorized: false },
        },
  verbose: true,
});
