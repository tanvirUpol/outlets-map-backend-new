const CatWise = require("../models/CatWiseModel");
const mongoose = require("mongoose");
// hello


// get single Outlet
const getCatWiseOutlet = async (req, res) => {
  const { id } = req.params;
  const outlet = await CatWise.find({ outlet_code: id });
  console.log(outlet[0].format);
  const format = outlet[0].format.toLowerCase();
  let benchmarkOutlet;
  if(format === "express store"){
    benchmarkOutlet = await CatWise.find({ outlet_code: "F122" });
  }else if(format === "mega store"){
    benchmarkOutlet = await CatWise.find({ outlet_code: "D062" });
  }else if(format === "super store"){
    benchmarkOutlet = await CatWise.find({ outlet_code: "D051" });
  }else if(format === "convenience store"){
    benchmarkOutlet = await CatWise.find({ outlet_code: "D062" });
  }

  // console.log(benchmarkOutlet[0]);

  if (!outlet) {
    return res.status(404).json({ error: "No such Outlet" });
  }

  res.status(200).json({outlet, benchmarkOutlet});
  // res.status(200).json(outlet);
};

// create catwise outlet data
const uploadCatWiseData = async (req, res) => {
  try {
    // Delete all existing documents
    await CatWise.deleteMany();

    // Extract the bulk data from the request body
    const bulkData = req.body;
    // Insert the new bulk data
    await CatWise.insertMany(bulkData);

    res.status(200).json({ message: "Bulk data uploaded successfully." });
  } catch (error) {
    // console log tge error if found any
    console.error(error);
    res.status(404).json({ message: "Failed to upload bulk data." });
  }
};

module.exports = {
  getCatWiseOutlet,
  uploadCatWiseData,
};
