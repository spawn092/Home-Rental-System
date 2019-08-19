const mongoose = require("mongoose");

const apartmentSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nameOfHouse: { type: String, required: true },
  rent: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true }
});

module.exports = mongoose.model("Apartment", apartmentSchema);
