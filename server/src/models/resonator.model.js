const mongoose = require("mongoose");

const resonatorSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    rarity: { type: Number, required: true, enum: [4, 5] },
    element: { type: String, required: true, trim: true },
    weaponType: { type: String, required: true, trim: true },
    roles: [{ type: String, trim: true }],
    region: { type: mongoose.Schema.Types.ObjectId, ref: "Region" },
    faction: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    releaseDate: { type: Date },
  },
  { timestamps: true }
);

resonatorSchema.index({ gameId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Resonator", resonatorSchema);
