const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.CNSTRING);

app.get("/");

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
