import express from "express";
import cors from "cors";

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to Swap Travel Stories API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
