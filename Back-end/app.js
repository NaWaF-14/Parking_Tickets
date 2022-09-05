const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");
const {
  addParking,
  allParking,
  specificParking,
} = require("./Controllers/parkingController");
const addUser = require("./Controllers/userController");

mongoose.connect(process.env.CNSTRING);

app.get("/parking", allParking);

app.get("/parking/:id", specificParking);

app.post("/parking", addParking);

app.post("/user", addUser);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
