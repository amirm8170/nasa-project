const mongoose = require("mongoose");
const { Schema } = mongoose;

const launchSchema = new Schema({
  flightNumber: { type: Number, default: 100 },
  mission: { type: String },
  launchDate: { type: Date, required: true },
  rocket: { type: String, required: true },
  target: { type: String, required: true },
  customers: [{ type: String, required: true }],
  upcoming: { type: Boolean, default: true },
  success: { type: Boolean, default: true },
});

module.exports = mongoose.model("launches", launchSchema);
