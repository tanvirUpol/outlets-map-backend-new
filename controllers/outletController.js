const Outlet = require("../models/OutletModel");
const mongoose = require("mongoose");

// get all
const getOutlets = async (req, res) => {
  const outlets = await Outlet.find();
  res.status(200).json(outlets);
};

// get single Outlet
const getOutlet = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Outlet" });
  }

  const outlet = await Outlet.findById(id);

  if (!outlet) {
    return res.status(404).json({ error: "No such Outlet" });
  }

  res.status(200).json(outlet);
};

// create outlet

const uploadOutlets = async (req, res) => {
  try {
    // Delete all existing documents
    await Outlet.deleteMany();

    // Extract the bulk data from the request body
    const bulkData = req.body;

    // Insert the new bulk data
    await Outlet.insertMany(bulkData);

    res.status(200).json({ message: 'Bulk data uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Failed to upload bulk data.' });
  }
};

module.exports = {
  getOutlet,
  uploadOutlets,
  getOutlets,
};
