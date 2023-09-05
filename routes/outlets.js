const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
// constroller functions
const {
  getOutlets,
  uploadOutlets,
  getOutlet,
} = require("../controllers/outletController");

// requireAuth for all routes
router.use(requireAuth);

// get  all products
router.get("/", getOutlets);

// get single product
router.get("/:id", getOutlet);

// upload products
router.post("/", uploadOutlets);

module.exports = router;
