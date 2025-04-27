const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protect = require("../middleware/authMiddleware");

const {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
} = require("../controllers/userController");

// Multer Storage configuration for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only image files are allowed!');
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Routes
router.get("/me", protect, getMyProfile);  // Fetch user profile
router.put("/me", protect, upload.single('avatar'), updateMyProfile);  // Update user profile with image
router.delete("/me", protect, deleteMyAccount);  // Delete user account

module.exports = router;
