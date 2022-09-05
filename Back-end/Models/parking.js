const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  parkingLocation: {
    type: String,
    required: true,
  },
  parkingNumber: {
    type: Number,
    required: true,
  },
});

const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking;
