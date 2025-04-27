const Course = require("../models/Course");

// Create a course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course({ ...req.body, createdBy: req.userId });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: "Error creating course", details: err.message });
  }
};

// Get all courses (with filter)
exports.getAllCourses = async (req, res) => {
  try {
    const { type, search, minRating } = req.query;
    let query = {};

    if (type) query.type = type;
    if (search) query.title = { $regex: search, $options: "i" };
    if (minRating) query.rating = { $gte: Number(minRating) };

    const courses = await Course.find(query);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Error fetching courses", details: err.message });
  }
};

// Get single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Error fetching course", details: err.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Error updating course", details: err.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting course", details: err.message });
  }
};
