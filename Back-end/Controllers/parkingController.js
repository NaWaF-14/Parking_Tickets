const Parking = require("../Models/parking");

const addParking = async (req, res) => {
  try {
    await Parking.create({
      city: req.body.city,
      parkingLocation: req.body.parkingLocation,
      parkingNumber: req.body.parkingNumber,
    });
    res.send("Parking is Added!");
  } catch (error) {
    console.log(error.message);
  }
};
const allParking = async (req, res) => {
  try {
    const result = await Parking.find({});
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

const specificParking = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Parking.findById(id);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};
