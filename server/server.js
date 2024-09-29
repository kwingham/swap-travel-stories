// Import necessary modules
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const { createClient } = require("@supabase/supabase-js");

// Create Express app
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Get Supabase URL and Key from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Initialize Supabase Client
const supabase = createClient(supabaseUrl, supabaseKey);

// Base route to confirm server is working
app.get("/", (req, res) => {
  res.send("Welcome to Swap Travel Stories API!");
});

// Route to test connection to Supabase
app.get("/test-supabase", async (req, res) => {
  try {
    // Replace 'users' with any table you have in Supabase
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional SUPABASE_URI for any PostgreSQL client connections

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
