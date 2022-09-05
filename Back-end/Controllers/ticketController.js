const Ticket = require("../Models/ticket");
const User = require("../Models/user");

// when the user purchase a ticket
const purchaseTicket = async (req, res) => {
  try {
    const userID = req.params.userID;
    const parkingID = req.params.parkingID;
    await Ticket.create({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      price: req.body.price,
      user: userID,
      parkingLocation: parkingID,
    });
    res.send("User has purchased a ticket!!");
  } catch (error) {
    console.log(error.message);
  }
};

// display all the user tickets
const userTickets = async (req, res) => {
  try {
    const id = req.params.id; // ID of the user
    const user = await User.findById(id);
    const result = await Ticket.find({ user: user._id });
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

// here when the user want to change the schedule
const updateTicket = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Ticket.findByIdAndUpdate(id, req.body);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { purchaseTicket, userTickets, updateTicket };
