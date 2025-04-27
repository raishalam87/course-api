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

// Corrected Route Path (ye pehle galat tha)
app.use("/api/courses", require("./routes/courseRoutes"));

// Base API check
app.get("/", (req, res) => {
  res.send("🔥 API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
