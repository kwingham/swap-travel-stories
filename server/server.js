// module
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const PORT = "8080";
const app = express();

app.use(cors());
// reades incomming JSON from the client
app.use(express.json());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.SUPABASE_URL,
});

app.get("/", (req, res) => {
  try {
    res
      .status(200)
      .send({ message: "Youre looking at my root route, how roude!" });
  } catch (error) {
    res.json(`${error.name}: ${error.message}`);
  }
});

// Get all users (READ)
app.get("/users", async (req, res) => {
  try {
    const result = await db.query(`select * from users`);
    const data = await result.rows;
    // if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching users:", error.message); // Improved logging
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
