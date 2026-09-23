const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: { type: String, required: true, trim: true },
    rarity: { type: Number, min: 1, max: 5 },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

materialSchema.index({ gameId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Material", materialSchema);
