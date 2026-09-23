const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
  pathname: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true, min: 0 },
  uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Upload", uploadSchema);
