const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    parkingLocation: {
      type: Schema.Types.ObjectId,
      ref: "Parking",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
