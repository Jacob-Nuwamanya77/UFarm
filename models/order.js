const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: String,
  phonenumber: String,
  quantity: String,
  total: String,
  payment: [{ type: String }],
  delivery: [{ type: String }],
  date: String,
  LC: String,
  areaAO: String,
  areaFO: String,
  UF: String,
  status: String,
});

module.exports = mongoose.model("orders", orderSchema);
