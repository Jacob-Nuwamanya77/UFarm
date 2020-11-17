const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Create schema for the general public.
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  role: String,
});

// Plugin passport.
userSchema.plugin(passportLocalMongoose);

// Export the model that will be created from the schema.
module.exports = mongoose.model("User", userSchema);
