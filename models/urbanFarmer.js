const mongoose = require("mongoose");

// Create a schema for farmer one.
const urbanFarmerSchema = mongoose.Schema({
  name: String,
  dob: String,
  gender: String,
  phonenumber: [{ type: String }],
  nin: String,
  ward: String,
  activities: [{ type: String }],
  username: {
    type: String,
    unique: true,
  },
  registrationdate: String,
  LC: String,
  areaAO: String,
  areaFO: String,
});

// Export a model to create documents.
module.exports = mongoose.model("UrbanFarmer", urbanFarmerSchema);
