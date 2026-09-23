const mongoose = require("mongoose");

const resonatorSkillSchema = new mongoose.Schema(
  {
    resonatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resonator",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["basic", "skill", "liberation", "forte", "intro", "outro"],
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: "" },
  },
  { timestamps: true }
);

resonatorSkillSchema.index({ resonatorId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("ResonatorSkill", resonatorSkillSchema);
