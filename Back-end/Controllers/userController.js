const { User, validate } = require("../Models/user");
const bcrypt = require("bcrypt");

// const add = async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error)
//       return res.status(400).send({ message: error.details[0].message });

//     const user = await User.findOne({ email: req.body.email });
//     if (user)
//       return res
//         .status(409)
//         .send({ message: "User with given email already Exist!" });

//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashPassword = await bcrypt.hash(req.body.password, salt);

//     await new User({ ...req.body, password: hashPassword }).save();
//     res.status(201).send({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// };

const addUser = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });
    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error!" });
  }
};
module.exports = addUser;
