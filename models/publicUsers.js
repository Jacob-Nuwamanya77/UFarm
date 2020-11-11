const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Create schema for the general public.
const publicUserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Array,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});
// Plugin passport.
publicUserSchema.plugin(passportLocalMongoose);

// Export the model that will be created from the schema.
module.exports = mongoose.model("PublicUser", publicUserSchema);
