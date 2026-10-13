import { Pool } from "pg";
import {drizzle} from "drizzle-orm/node-postgres"
process.loadEnvFile();
export const pool=new Pool({
   connectionString:process.env.URL,
});

// {رابط pool with drizzle}
export const db = drizzle({
    client:pool
})