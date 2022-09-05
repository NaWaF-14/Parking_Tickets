const express = require("express");
const router = express.Router();
const addUser = require("../Controllers/userController");

router.route("/").post(addUser);

module.exports = router;
