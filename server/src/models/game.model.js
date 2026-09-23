const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    coverImage: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
