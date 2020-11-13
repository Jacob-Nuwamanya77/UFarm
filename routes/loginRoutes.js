const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// Import the model.
const PublicUser = require("../models/publicUsers");

// ROUTES
router.get("/", (req, res) => {
  res.render("home");
});

// Authenticate login.
router.post("/", passport.authenticate("local"), (req, res) => {
  req.session.user = req.user;
  res.redirect("/orderform");
});

// Creating new user.
router.post("/signup", async (req, res) => {
  try {
    let users = PublicUser(req.body);
    await PublicUser.register(users, req.body.password, (err) => {
      if (err) {
        res.status(400).send("Something went wrong with registration.");
      } else {
        res.redirect("/login");
      }
    });
  } catch (err) {
    console.log({ message: err });
  }
});

module.exports = router;
