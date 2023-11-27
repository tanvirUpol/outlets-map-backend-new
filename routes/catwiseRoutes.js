const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
// constroller functions
const {
  getCatWiseOutlet,
  uploadCatWiseData,
  getAllCatWiseOutlet,
  getSelectedFieldsForAllOutlet
  
} = require("../controllers/catWiseController");


router.get("/all", getSelectedFieldsForAllOutlet);


// requireAuth for all routes
router.use(requireAuth);

// get single outlet

// get single outlet
router.get("/:id", getCatWiseOutlet);

// upload 
router.post("/", uploadCatWiseData);

module.exports = router;
