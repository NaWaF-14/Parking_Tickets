const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passComplexity = require("joi-password-complexity");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const validate = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("User Name"),
    email: Joi.string().email().required().label("Email"),
    password: passComplexity.required().label("Password"),
  });
  return schema.validate(data);
};

const User = mongoose.model("User", userSchema);
module.exports = { User, validate };
