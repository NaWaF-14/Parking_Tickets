const express = require("express");
const router = express.Router();
const {
  purchaseTicket,
  userTickets,
  updateTicket,
} = require("../Controllers/ticketController");

router.route("/:userID/:parkingID").post(purchaseTicket);

router.route("/:id").get(userTickets).put(updateTicket);

module.exports = router;
