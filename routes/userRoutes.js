const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
} = require("../controllers/userController");

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.delete("/me", protect, deleteMyAccount);

module.exports = router;
