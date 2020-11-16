const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// Import the model.
const User = require("../models/Users");

// ROUTES
router.get("/", (req, res) => {
  res.render("home");
});

// Authenticate login.
router.post("/", passport.authenticate("local"), (req, res) => {
  req.session.user = req.user;
  let cred = req.user.role;
  if (cred == "farmerone") {
    res.redirect("/fo");
  } else if (cred == "urbanfarmer") {
    res.redirect("/uf");
  }
});

// Creating new user.
router.post("/signup", async (req, res) => {
  try {
    let users = User(req.body);
    await User.register(users, req.body.password, (err) => {
      if (err) {
        res.status(400).send("Something went wrong with registration.");
      } else {
        res.redirect("/");
      }
    });
  } catch (err) {
    console.log({ message: err });
  }
});

module.exports = router;
