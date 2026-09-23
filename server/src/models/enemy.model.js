const mongoose = require("mongoose");

const enemySchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: { type: String, required: true, trim: true },
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: "Region" },
    drops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

enemySchema.index({ gameId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Enemy", enemySchema);
