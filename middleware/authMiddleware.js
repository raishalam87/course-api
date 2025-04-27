// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Set userId for later use
    req.role = decoded.role;      // You can also use this to authorize admin/teacher
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

module.exports = protect;
