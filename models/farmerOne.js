const mongoose = require("mongoose");

// Create a schema for farmer one.
const farmerOneSchema = mongoose.Schema({
  name: String,
  dob: String,
  gender: String,
  phonenumber: [{ type: String }],
  nin: String,
  LC: String,
  activities: [{ type: String }],
  username: {
    type: String,
    unique: true,
  },
  registrationdate: String,
  residence: String,
  since: String,
  directions: String,
  status: String,
  areaAO: String,
});

// Export a model to create documents.
module.exports = mongoose.model("FarmerOne", farmerOneSchema);
