const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

regionSchema.index({ gameId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Region", regionSchema);
