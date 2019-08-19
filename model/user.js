const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
