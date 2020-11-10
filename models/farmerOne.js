const mongoose = require("mongoose");

// Create a schema for farmer one.
const farmerOneSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  nin: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
  horticulture: {
    type: String,
    default: "off",
  },
  poultry: {
    type: String,
    default: "off",
  },
  diary: {
    type: String,
    default: "off",
  },
  ID: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: String,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
  since: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
});

// Export a model to create documents.
module.exports = mongoose.model("farmerone", farmerOneSchema);
