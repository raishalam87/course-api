const User = require("../models/User");

// @desc    Get logged in user's profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching profile", details: err.message });
  }
};

// @desc    Update profile (name, avatar)
exports.updateMyProfile = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      avatar: req.body.avatar,
    };

    const user = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error updating profile", details: err.message });
  }
};

// @desc    Delete account
exports.deleteMyAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting account", details: err.message });
  }
};
