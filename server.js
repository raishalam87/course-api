const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route Paths
app.use("/api/courses", require("./routes/courseRoutes")); // Courses related routes
app.use("/api/users", require("./routes/userRoutes"));     // User profile routes

// Base API check
app.get("/", (req, res) => {
  res.send("🔥 API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
