const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["Owner", "Tenant"] },
    block: { type: String, required: true },
    number: { type: String, required: true },
    residents: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("flat", flatSchema);
