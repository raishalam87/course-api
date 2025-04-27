const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number },
  type: { type: String, enum: ["free", "paid"], default: "free" },
  rating: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

courseSchema.pre("save", function (next) {
  if (this.type === "free") {
    this.finalPrice = 0;
  } else {
    this.finalPrice = this.originalPrice - (this.originalPrice * this.discount / 100);
  }
  next();
});

module.exports = mongoose.model("Course", courseSchema);