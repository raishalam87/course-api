const User = require("../models/User"); // User model import

// Get user profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching profile", details: err.message });
  }
};

// Update user profile (including image upload)
exports.updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If an image is uploaded, save the image URL to the user's profile
    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;  // Store image path in DB
    }

    // Update other fields like name
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Save the updated user
    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Error updating profile", details: err.message });
  }
};

// Delete user account
exports.deleteMyAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting account", details: err.message });
  }
};
