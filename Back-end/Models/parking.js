const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
  parkingLocation: {
    type: String,
    required: true,
  },
  parkingNumber: {
    type: Number,
    required: true,
  },
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking;
