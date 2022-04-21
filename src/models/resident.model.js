const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    flat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "flat",
      required: true,
    },
    img: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("resident", residentSchema);
