const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: String,
  phonenumber: String,
  quantity: String,
  total: String,
  payment: String,
  delivery: String,
  date: String,
  LC: String,
  areaAO: String,
  areaFO: String,
  UF: String,
  status: String,
});

module.exports = mongoose.model("orders", orderSchema);
