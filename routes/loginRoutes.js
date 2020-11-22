const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// Import the model.
const User = require("../models/Users");

// ROUTES
router.get("/", (req, res) => {
  res.render("login");
});

// Authenticate login.
router.post("/", passport.authenticate("local"), (req, res) => {
  req.session.user = req.user;
  let cred = req.user.role;
  if (cred == "farmerone") {
    res.redirect("/fo");
  } else if (cred == "urbanfarmer") {
    res.redirect("/uf");
  } else if (cred == "agricofficer") {
    res.redirect("/ao");
  }
});

module.exports = router;
