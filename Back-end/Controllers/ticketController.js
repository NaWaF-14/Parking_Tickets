const Ticket = require("../Models/ticket");
const Parking = require("../Models/parking");
const { User } = require("../Models/user");

// when the user purchase a ticket
const purchaseTicket = async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    const parking = await Parking.findById(req.params.parkingID);
    await Ticket.create({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      price: req.body.price,
      user: user,
      parkingLocation: parking,
    });
    if (parking.parkingNumber >= 1) {
      parking.parkingNumber = parking.parkingNumber - 1;
      await Parking.findByIdAndUpdate(parking._id, {
        parkingNumber: parking.parkingNumber,
      });
      res.send("User has purchased a ticket!!");
    } else {
      res.send("There is no more parking here.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// display all the user tickets
const userTickets = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const result = await Ticket.find({
      user: user._id,
      isDeleted: false,
    }).populate(["user", "parkingLocation"]);
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

const deleteTicket = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Ticket.findByIdAndUpdate(id, { isDeleted: true });
    const parking = await Parking.findById(result.parkingLocation);
    parking.parkingNumber = parking.parkingNumber + 1;
    await Parking.findByIdAndUpdate(parking._id, {
      parkingNumber: parking.parkingNumber,
    });
    res.send("Ticket is deleted and parking number is increased!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { purchaseTicket, userTickets, updateTicket, deleteTicket };
