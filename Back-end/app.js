const express = require("express");
const connection = require("./db");
const app = express();
const cors = require("cors");
require("dotenv").config();

const User = require("./Routers/userRoute");
const Ticket = require("./Routers/ticketRoute");
const Parking = require("./Routers/parkingRoute");

app.use(express.json());
app.use(cors());

connection();

app.use("/user", User);
app.use("/ticket", Ticket);
app.use("/parking", Parking);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
