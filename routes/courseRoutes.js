const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // middleware import

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// 👇 protected routes
router.post("/", protect, createCourse);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

// 👇 public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

module.exports = router;