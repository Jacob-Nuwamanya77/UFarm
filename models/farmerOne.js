const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
  phonenumber: {
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
  username: {
    type: String,
    required: true,
    unique: true,
  },
  registrationdate: {
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

// Plugin passport.
farmerOneSchema.plugin(passportLocalMongoose);

// Export a model to create documents.
module.exports = mongoose.model("FarmerOne", farmerOneSchema);
