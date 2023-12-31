const SPLMCatWise = require("../models/SPLMCatwiseModel");
const mongoose = require("mongoose");



// get single Outlet
const getCatWiseOutlet = async (req, res) => {
  const { id } = req.params;

  const outlet = await SPLMCatWise.find({ outlet_code: id });

  if (!outlet) {
    return res.status(404).json({ error: "No such Outlet" });
  }

  res.status(200).json(outlet);
};

// create SPLMCatWise outlet data
const uploadCatWiseData = async (req, res) => {
  try {
    // Delete all existing documents
    await SPLMCatWise.deleteMany();

    // console.log(req.body);

    // Extract the bulk data from the request body
    const bulkData = req.body;
    // Insert the new bulk data
    await SPLMCatWise.insertMany(bulkData);

    res.status(200).json({ message: "Bulk data uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to upload bulk data." });
  }
};

module.exports = {
  getCatWiseOutlet,
  uploadCatWiseData,
};
