const mongoose = require("mongoose");

const weaponSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    weaponType: { type: String, required: true, trim: true },
    rarity: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    baseAtk: { type: Number, min: 0 },
    subStat: { type: String, default: "" },
    passive: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

weaponSchema.index({ gameId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Weapon", weaponSchema);
