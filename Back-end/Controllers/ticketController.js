const Ticket = require("../Models/ticket");
const User = require("../Models/user");

const allUserTickets = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const result = await Ticket.find({ user: user._id });
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};
