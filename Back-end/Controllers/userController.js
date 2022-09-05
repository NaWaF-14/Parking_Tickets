const User = require("../Models/user");

const addUser = async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.send("User has been added!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = addUser;
