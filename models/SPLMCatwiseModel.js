const mongoose = require('mongoose');

const splmCatWiseSchema = new mongoose.Schema({
  outlet_code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  zonal: {
    type: String,
    required: true
  },
  master_category: {
    type: String,
    required: true
  },
  cat_1: {
    type: String,
    required: true
  },
  cat_3: {
    type: String,
    required: true
  },
  sales_this: {
    type: Number,
    required: true
  },
  sales_last: {
    type: Number,
    required: true
  },
  ff_this: {
    type: Number,
    required: true
  },
  ff_last: {
    type: Number,
    required: true
  },
  bs_this: {
    type: Number,
    required: true
  },
  bs_last: {
    type: Number,
    required: true
  },
  pos_gpv_this: {
    type: Number,
    required: true
  },
  pos_gpv_last: {
    type: Number,
    required: true
  },
  format_sales_gr: {
    type: Number,
    required: true
  },
  format_ff_gr: {
    type: Number,
    required: true
  },
  format_bs_gr: {
    type: Number,
    required: true
  },
  format_pos_gpv_gr: {
    type: Number,
    required: true
  },
});

const SPLMCatWise = mongoose.model('SPLMCatWise', splmCatWiseSchema);

module.exports = SPLMCatWise;
