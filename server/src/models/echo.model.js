const mongoose = require("mongoose");

const echoSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    rarity: { type: Number, required: true, enum: [2, 3, 4, 5] },
    cost: { type: Number, required: true, min: 1, max: 4 },
    class: { type: String, default: "" },
    sonataSetId: { type: mongoose.Schema.Types.ObjectId, ref: "EchoSet" },
    mainStats: [{ type: String, trim: true }],
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

echoSchema.index({ gameId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Echo", echoSchema);
