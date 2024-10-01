// module
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const db = new pg.Pool({
  connectionString: process.env.SUPABASE_URL,
});

const PORT = process.env.PORT || 3000;

// Connect to database
db.connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the API Root Route!!!" });
});

// Get all users (READ)
app.get("/users", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM users`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
