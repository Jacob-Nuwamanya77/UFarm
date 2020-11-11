const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Create a schema for farmer one.
const urbanFarmerSchema = mongoose.Schema({
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
  phonenumber: {
    type: Array,
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
  username: {
    type: String,
    required: true,
    unique: true,
  },
  registrationdate: {
    type: String,
    required: true,
  },
});

// Plugin passport.
urbanFarmerSchema.plugin(passportLocalMongoose);

// Export a model to create documents.
module.exports = mongoose.model("UrbanFarmer", urbanFarmerSchema);
