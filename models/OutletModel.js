const mongoose = require('mongoose');

const outletSchema = new mongoose.Schema({
  outlet_code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  // assortment: {
  //   type: Number,
  //   required: true
  // },
  // available: {
  //   type: Number,
  //   required: true
  // },
  // availability_percent: {
  //   type: Number,
  //   required: true
  // },
  format: {
    type: String,
    required: true
  },
  zonal: {
    type: String,
    required: true
  },
  sales_contribution: {
    type: Number,
    required: true
  },
  this_net_profit: {
    type: Number,
    required: true
  },
  profitable: {
    type: String,
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
  gpv_this: {
    type: Number,
    required: true
  },
  gpv_last: {
    type: Number,
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
  month: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  }
});

const Outlet = mongoose.model('Outlet', outletSchema);

module.exports = Outlet;
