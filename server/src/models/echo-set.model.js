const mongoose = require("mongoose");

const echoSetSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    twoPieceBonus: { type: String, default: "" },
    fivePieceBonus: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

echoSetSchema.index({ gameId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("EchoSet", echoSetSchema);
