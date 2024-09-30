// Import necessary modules
const express = require("express");
const cors = require("cors"); // Middleware for enabling CORS
require("dotenv").config(); // Load environment variables
// Import Supabase client
const { createClient } = require("@supabase/supabase-js");

// Create express app
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

// ROUTES

// Get all users (READ)
app.get("/users", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching users:", error.message); // Improved logging
    res.status(500).json({ error: error.message });
  }
});

// Add a new user (CREATE)
app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, password }]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error("Error adding user:", error.message); // Improved logging
    res.status(500).json({ error: error.message });
  }
});

// Update a user (UPDATE)
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const { data, error } = await supabase
      .from("users")
      .update({ email })
      .match({ user_id: id });
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error updating user:", error.message); // Improved logging
    res.status(500).json({ error: error.message });
  }
});

// Delete a user (DELETE)
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("users")
      .delete()
      .match({ user_id: id });
    if (error) throw error;
    res.status(200).json({ message: "User deleted successfully", data });
  } catch (error) {
    console.error("Error deleting user:", error.message); // Improved logging
    res.status(500).json({ error: error.message });
  }
});

// Log environment variables for debugging (REMOVE before production)
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey.substring(0, 8) + "..."); // Partially hide key for security

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
