const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
// constroller functions
const {
  getCatWiseOutlet,
  uploadCatWiseData,
  
} = require("../controllers/catWiseController");

// requireAuth for all routes
router.use(requireAuth);



// get single outlet
router.get("/:id", getCatWiseOutlet);

// upload 
router.post("/", uploadCatWiseData);

module.exports = router;
