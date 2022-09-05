const Parking = require("../Models/parking");

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

const updateParking = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Parking.findByIdAndUpdate(id);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};
