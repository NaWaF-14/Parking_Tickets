const express = require("express");
const router = express.Router();
const {
  addParking,
  allParking,
  specificParking,
} = require("../Controllers/parkingController");

router.route("/").post(addParking).get(allParking);

router.route("/:id").get(specificParking);

module.exports = router;
