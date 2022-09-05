const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./Routers/userRoute");
const Ticket = require("./Routers/ticketRoute");
const Parking = require("./Routers/parkingRoute");

app.use(express.json());
require("dotenv").config();

mongoose.connect(process.env.CNSTRING);

app.use("/user", User);
app.use("/ticket", Ticket);
app.use("/parking", Parking);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
