const multer = require("multer");
const path = require("path");

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Use the original file name with a timestamp to avoid name collisions
    cb(null, Date.now() + path.extname(file.originalname)); // Ensuring unique filenames
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage });

// Export the upload middleware for use in other files
module.exports = upload;
