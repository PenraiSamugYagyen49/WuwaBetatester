const mongoose = require("mongoose");

const resonatorBuildSchema = new mongoose.Schema(
  {
    resonatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resonator",
      required: true,
      unique: true,
    },
    recommendedWeapons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Weapon" }],
    recommendedEchoSets: [{ type: mongoose.Schema.Types.ObjectId, ref: "EchoSet" }],
    mainEcho: { type: mongoose.Schema.Types.ObjectId, ref: "Echo" },
    mainStats: [{ type: String, trim: true }],
    subStats: [{ type: String, trim: true }],
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resonator" }],
    rotation: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResonatorBuild", resonatorBuildSchema);
