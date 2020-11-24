const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  ward: String,
  category: String,
  quantity: String,
  price: String,
  uom: String,
  type: String,
  phone: String,
  payment: [{ type: String }],
  delivery: [{ type: String }],
  location: String,
  filename: String,
  status: String,
  LC: String,
  areaAO: String,
  areaFO: String,
});

// Export the model to interact with the database.
module.exports = mongoose.model("Products", productSchema);
