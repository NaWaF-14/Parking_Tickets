const express = require("express");
const router = express.Router();
const addUser = require("../Controllers/userController");
const login = require("../Controllers/userAuthController");

router.route("/register").post(addUser);
router.route("/login").post(login);

module.exports = router;
