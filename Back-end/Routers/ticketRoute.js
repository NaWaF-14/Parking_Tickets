const express = require("express");
const router = express.Router();
const {
  purchaseTicket,
  userTickets,
  updateTicket,
  deleteTicket,
} = require("../Controllers/ticketController");

router.route("/:userID/:parkingID").post(purchaseTicket);

router.route("/:id").get(userTickets).put(updateTicket);

router.route("/delete/:id").put(deleteTicket);

module.exports = router;
