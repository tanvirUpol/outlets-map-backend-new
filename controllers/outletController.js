const Outlet = require("../models/OutletModel");
const mongoose = require("mongoose");

// get all
const getOutlets = async (req, res) => {
  console.log(req.user);
  if(req.user.is_zonal === false){
    const outlets = await Outlet.find();
    res.status(200).json(outlets);
  }else if(req.user.is_zonal === true){ 
    console.log(req.user);
    const outlets = await Outlet.find({outlet_code:{ $in: req.user.outlets}});
    console.log(outlets);
    res.status(200).json(outlets);
  }
};

// get single Outlet
const getOutlet = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("not a valid id");
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
