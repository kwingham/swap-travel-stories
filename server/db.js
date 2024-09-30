import pg from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a new pool instance for PostgreSQL
const db = new pg.Pool({
  connectionString: process.env.SUPABASE_URL,
});

// Export the database pool for use in other files
export default db;
