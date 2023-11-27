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



// get all Outlet
const getAllCatWiseOutlet = async (req, res) => {
  
  const outlets = await CatWise.find().lean();
  

  res.status(200).json(outlets);
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


// get selected fields for all Outlet using aggregation
const getSelectedFieldsForAllOutlet = async (req, res) => {
  try {
    // Use the aggregation framework to project and calculate fields
    const outlets = await CatWise.aggregate([
      {
        $group: {
          _id: "$outlet_code", // Group by outlet_code
          totalSales: { $sum: "$sales_this" }, // Calculate the total sales for each outlet_code
          data: { $push: "$$ROOT" }, // Preserve the original documents in an array for later use
        },
      },
      {
        $unwind: "$data", // Unwind the array of original documents
      },
      {
        $project: {
          outlet_code: "$data.outlet_code",
          format: "$data.format",
          cat_3: "$data.cat_3",
          gp_percent: {
            $multiply: [
              {
                $cond: {
                  if: { $eq: ["$data.sales_this", 0] },
                  then: 0,
                  else: { $divide: ["$data.pos_gpv_this", "$data.sales_this"] },
                },
              },
              100,
            ],
          },
          sales_contribution: {
            $cond: {
              if: { $eq: ["$totalSales", 0] }, // Check if totalSales is zero
              then: 0, // Set sales_contribution to 0 if totalSales is zero
              else: { $divide: ["$data.sales_this", "$totalSales"] },
            },
          },
        },
      }
    ]);

    // Send the aggregated data as a JSON response with a 200 status code
    res.status(200).json(outlets);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getCatWiseOutlet,
  uploadCatWiseData,
  getAllCatWiseOutlet,
  getSelectedFieldsForAllOutlet
};
